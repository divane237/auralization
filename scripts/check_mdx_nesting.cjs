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
let total=0;
files.forEach(f=>{
  const txt = fs.readFileSync(f,'utf8');
  const lines = txt.split(/\r?\n/);
  for(let i=0;i<lines.length;i++){
    const cur = lines[i];
    const t = cur.trim();
    // only consider opening tags for block-level elements (not closing tags)
    if(t.startsWith('<') && !t.startsWith('</')){
      // capture tag name
      const m = t.match(/^<([a-zA-Z0-9_-]+)/);
      if(m){
        const tag = m[1].toLowerCase();
        const blockTags = new Set(['div','section','table','h1','h2','h3','h4','h5','h6','ul','ol','blockquote']);
        if(blockTags.has(tag)){
          const prev = i>0?lines[i-1]:'';
          if(prev.trim()!=='' && !isSafePrevLine(prev)){
            console.log(`${f}:${i+1}`);
            console.log(`  prev: ${prev}`);
            console.log(`  cur : ${cur}`);
            console.log('---');
            total++;
          }
        }
      }
    }
  }
});
console.log(`Found ${total} potential issues in ${files.length} files.`);
