const assert=require('assert/strict'),fs=require('fs'),vm=require('vm');
const core=require('./dist/core.js');
const context={window:{}};vm.runInNewContext(fs.readFileSync('./dist/questions.js','utf8'),context);
const bank=JSON.parse(JSON.stringify(context.window.QUESTION_BANK));
assert.ok(bank.length>50);assert.equal(new Set(bank.map(q=>q.id)).size,bank.length);assert.equal(new Set(bank.map(q=>q.question+'|'+(q.image||''))).size,bank.length);
for(const q of bank.filter(q=>q.image)){assert.ok(fs.existsSync('./dist/'+q.image));assert.ok(Number.isInteger(q.sourcePage));assert.ok(!q.image.toLowerCase().includes(q.options[q.correct].toLowerCase()));}
for(const q of bank){assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.match(q.explanation,/[ก-๙]/);assert.ok(q.options.every(o=>!/[ก-๙]/.test(o)));assert.ok(fs.existsSync('./dist/sources/'+q.source+'.html'));}
const orders=new Set();
for(let i=0;i<100;i++){
  const questions=core.createRound(bank);assert.equal(questions.length,50);assert.equal(new Set(questions.map(q=>q.id)).size,50);orders.add(questions.map(q=>q.id).join(','));
  assert.equal(questions.filter(q=>q.image).length,5);
  for(const q of questions){const original=bank.find(b=>b.id===q.id);assert.equal(q.options[q.correct],original.options[original.correct]);}
  const s={questions,answers:Array(50).fill(null)};assert.deepEqual(core.stats(s),{answered:0,correct:0});
  assert.equal(core.answer(s,0,4),false);assert.equal(core.answer(s,0,questions[0].correct),true);assert.equal(core.answer(s,0,(questions[0].correct+1)%4),false);
  for(let j=1;j<50;j++)core.answer(s,j,j%2===0?questions[j].correct:(questions[j].correct+1)%4);
  assert.deepEqual(core.stats(s),{answered:50,correct:25});
}assert.equal(orders.size,100);
console.log('PASS: question bank, 100 randomized rounds, shuffled answer mapping, answer locking and scores');
