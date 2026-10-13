const fs=require('fs'),path=require('path'),assert=require('assert/strict'),{JSDOM}=require('jsdom');
const root=path.resolve('global-practice/dist');
function open(saved){
 const d=new JSDOM(fs.readFileSync(path.join(root,'index.html'),'utf8'),{url:'https://example.test',runScripts:'outside-only'});
 d.window.scrollTo=()=>{};d.window.confirm=()=>true;
 if(saved)d.window.localStorage.setItem('global-practice-session-v1',JSON.stringify(saved));
 for(const file of ['questions.js','core.js','app.js'])d.window.eval(fs.readFileSync(path.join(root,file),'utf8'));
 return d;
}
let d=open();const bank=JSON.parse(JSON.stringify(d.window.QUESTION_BANK));
assert.equal(bank.length,243);
assert.equal(d.window.document.querySelectorAll('.sources a').length,5);
for(const a of d.window.document.querySelectorAll('.sources a'))assert.ok(fs.existsSync(path.join(root,decodeURIComponent(a.getAttribute('href')))));
d.window.close();
const extra=bank.filter(q=>q.id.startsWith('slide'));
const qs=[...extra.filter(q=>!q.sourceAsset).slice(0,37),...extra.filter(q=>q.sourceAsset),...bank.filter(q=>q.image).slice(0,5)];
assert.equal(qs.length,50);
const snapshot={version:1,questions:qs,answers:Array(50).fill(null),index:0,startedAt:Date.now(),finishedAt:null};
d=open(snapshot);d.window.document.querySelector('[data-action="resume"]').click();
d.window.document.querySelector('[data-choice="0"]').click();assert.match(d.window.document.querySelector('.source-link').textContent,/หน้า 61/);
d.window.document.querySelector('[data-index="20"]').click();d.window.document.querySelector('[data-choice="0"]').click();assert.equal(d.window.document.querySelectorAll('.source-link').length,2);
d.window.document.querySelector('[data-index="37"]').click();d.window.document.querySelector('[data-choice="0"]').click();assert.match(d.window.document.querySelector('.source-link').getAttribute('href'),/slides\/rare-earths\.png/);
d.window.document.querySelector('[data-index="44"]').click();d.window.document.querySelector('[data-choice="0"]').click();assert.match(d.window.document.querySelector('.source-link').getAttribute('href'),/slides\/plastic-waste\.png/);
d.window.close();
const old={version:1,questions:bank.filter(q=>/^q\d+$/.test(q.id)).slice(0,50),answers:[0,...Array(49).fill(null)],index:0,startedAt:Date.now(),finishedAt:null};
d=open(old);d.window.document.querySelector('[data-action="resume"]').click();assert.ok(d.window.document.querySelector('.explanation'));assert.equal(d.window.document.querySelectorAll('.question-number').length,50);d.window.close();
console.log('PASS: 243-question bank, all five source links, PDF page citations, verification links, PNG references and pre-update session resume');
