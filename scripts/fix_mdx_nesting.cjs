const fs = require('fs');
const path = require('path');

function walk(dir){
  let results=[];
  const list = fs.readdirSync(dir);
  list.forEach(file=>{
    const p = path.join(dir,file);
    const stat = fs.statSync(p);
    if(stat && stat.isDirectory()) results = results.concat(walk(p));
    else if(p.endsWith('.mdx')) results.push(p);
  });
  return results;
}

function isSafePrevLine(line){
  if(!line) return false;
  const t = line.trim();
  if(t==='') return false;
  if(t.startsWith('- ') || t.startsWith('* ') || t.match(/^\d+\.\s/)) return true;
  if(t.startsWith('#') || t.startsWith('>') || t.startsWith('```')) return true;
  if(t.startsWith('<')) return true;
  return false;
}

const root = path.join(__dirname, '..', 'content');
const files = walk(root);
let modifiedCount=0;

files.forEach(f=>{
  const txt = fs.readFileSync(f,'utf8');
  const lines = txt.split(/\r?\n/);
  let changed=false;
  for(let i=1;i<lines.length;i++){
    const cur = lines[i];
    const t = cur.trim();
    if(t.startsWith('<') && !t.startsWith('</')){
      const m = t.match(/^<([a-zA-Z0-9_-]+)/);
      if(m){
        const tag = m[1].toLowerCase();
        const blockTags = new Set(['div','section','table','h1','h2','h3','h4','h5','h6','ul','ol','blockquote']);
        if(blockTags.has(tag)){
          const prev = lines[i-1];
          if(prev.trim()!=='' && !isSafePrevLine(prev)){
            // insert blank line before cur if not already blank
            if(lines[i-1].trim()!=='' ){
              lines.splice(i,0,'');
              changed=true;
              i++; // skip inserted blank line
            }
          }
        }
      }
    }
  }
  if(changed){
    fs.writeFileSync(f, lines.join('\n'), 'utf8');
    console.log(`Patched ${f}`);
    modifiedCount++;
  }
});
console.log(`Modified ${modifiedCount} files.`);
