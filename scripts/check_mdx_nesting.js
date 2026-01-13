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
  if(t.startsWith('<li') || t.startsWith('<ul') || t.startsWith('<ol')) return true;
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
    if(cur.trim().startsWith('<')){
      const prev = i>0?lines[i-1]:'';
      // if prev is non-empty and not a safe prev line
      if(prev.trim()!=='' && !isSafePrevLine(prev)){
        console.log(`${f}:${i+1}`);
        console.log(`  prev: ${prev}`);
        console.log(`  cur : ${cur}`);
        console.log('---');
        total++;
      }
    }
  }
});
console.log(`Found ${total} potential issues in ${files.length} files.`);
