const {JSDOM}=require('jsdom');
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const root=path.resolve('global-practice/dist');
function open(saved){
  const dom=new JSDOM(fs.readFileSync(path.join(root,'index.html'),'utf8'),{url:'https://example.test',runScripts:'outside-only',pretendToBeVisual:true});
  dom.window.scrollTo=()=>{};dom.window.confirm=()=>true;
  if(saved)for(const [k,v]of Object.entries(saved))dom.window.localStorage.setItem(k,v);
  for(const name of ['questions.js','core.js','app.js'])dom.window.eval(fs.readFileSync(path.join(root,name),'utf8'));
  return dom;
}
const click=(d,sel)=>{const b=d.window.document.querySelector(sel);assert.ok(b,sel);b.click();};
let d=open();click(d,'[data-action="start"]');assert.equal(d.window.document.querySelectorAll('.question-number').length,50);
click(d,'[data-choice="0"]');assert.ok(d.window.document.querySelector('.explanation'));assert.equal(d.window.document.querySelectorAll('.option:disabled').length,4);
click(d,'[data-action="next"]');click(d,'[data-action="home"]');assert.ok(d.window.document.querySelector('[data-action="resume"]'));
const stored={};for(let i=0;i<d.window.localStorage.length;i++){const k=d.window.localStorage.key(i);stored[k]=d.window.localStorage.getItem(k);}d.window.close();
d=open(stored);click(d,'[data-action="resume"]');assert.equal(d.window.document.querySelector('.question-number.current').textContent,'2');
click(d,'[data-index="0"]');assert.ok(d.window.document.querySelector('.explanation'));
for(let i=1;i<50;i++) {click(d,`[data-index="${i}"]`);const s=JSON.parse(d.window.localStorage.getItem('global-practice-session-v1'));click(d,`[data-choice="${i%2===0?s.questions[i].correct:(s.questions[i].correct+1)%4}"]`);}
click(d,'[data-action="finish"]');assert.equal(d.window.document.querySelectorAll('.review-card').length,Number(d.window.document.querySelector('[data-filter="wrong"]').textContent.match(/\d+/)[0]));
click(d,'[data-filter="all"]');assert.equal(d.window.document.querySelectorAll('.review-card').length,50);assert.equal(JSON.parse(d.window.localStorage.getItem('global-practice-history-v1')).length,1);
click(d,'[data-action="home"]');click(d,'[data-action="results"]');assert.equal(JSON.parse(d.window.localStorage.getItem('global-practice-history-v1')).length,1);
click(d,'[data-action="start"]');const fresh=JSON.parse(d.window.localStorage.getItem('global-practice-session-v1'));assert.ok(fresh.answers.every(a=>a===null));d.window.close();
// Verify graceful fallback when browser storage is unavailable.
d=new JSDOM(fs.readFileSync(path.join(root,'index.html'),'utf8'),{runScripts:'outside-only'});d.window.scrollTo=()=>{};d.window.confirm=()=>true;for(const name of ['questions.js','core.js','app.js'])d.window.eval(fs.readFileSync(path.join(root,name),'utf8'));assert.ok(d.window.document.querySelector('.storage-warning'));click(d,'[data-action="start"]');click(d,'[data-choice="0"]');assert.ok(d.window.document.querySelector('.explanation'));d.window.close();
console.log('PASS: UI answer feedback, navigation, reload/resume, completion, review filters, history, replay and unavailable-storage fallback');
