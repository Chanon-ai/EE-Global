const fs = require('fs');
const path = require('path');
const sourceName = '(Update) สิ่งที่ควรรู้ก่อนสอบ Global 2026.pdf';
const rows = fs.readFileSync(path.join(__dirname, 'questions.txt'), 'utf8').trim().split(/\r?\n/);
const bank = rows.map((row, i) => {
  const [category, question, answer, ...rest] = row.split('|');
  return {id: 'q' + (i+1), category, question, options: [answer, ...rest.slice(0,3)], correct: 0, explanation: rest[3], source: category === 'ภูมิศาสตร์' ? 'Global EE Exam🏠🐶🌼.pdf' : sourceName};
});
const imageQuestions=JSON.parse(fs.readFileSync(path.join(__dirname,'image-questions.json'),'utf8'));
bank.push(...imageQuestions.map(q=>({id:q.id,category:'บุคคลและประวัติศาสตร์',question:'Who is the person shown in this picture?',options:[q.answer,...q.distractors],correct:0,explanation:q.explanation,source:sourceName,sourcePage:q.page,image:q.image})));
const currentSource='(Update) Current Global 2024-2026🐶🌼.pdf';
const slideSources={current:{source:currentSource},rare:{source:'เรื่องน่ารู้ แร่.png',sourceAsset:'slides/rare-earths.png'},plastic:{source:'สรุป เรื่อง ขยะพลาสติก.png',sourceAsset:'slides/plastic-waste.png'}};
Object.assign(slideSources,{
  nobel2025:{source:'สรุป รางวัลโนเบล 2025.png',sourceAsset:'slides/nobel-2025.png'},
  heritage2025:{source:'สรุป มรดกโลก ปี 2025.png',sourceAsset:'slides/heritage-2025.png'},
  goldfactors:{source:'สรุป เรื่องน่ารู้ ทองคำ.png',sourceAsset:'slides/gold-factors.png'},
  internet2025:{source:'เรื่องน่ารู้ เกี่ยวกับ อินเทอร์เน็ต.png',sourceAsset:'slides/internet-2025.png'},
  submarines2025:{source:'อัพเดทข่าว น่ารู้ เรื่องเรือดำน้ำนิวเคลียร์.png',sourceAsset:'slides/nuclear-submarines-2025.png'}
});
for(const [filename,prefix] of [['slide-questions.txt','slide'],['infographic-questions.txt','graphic']]){
const extraRows=fs.readFileSync(path.join(__dirname,filename),'utf8').trim().split(/\r?\n/);
bank.push(...extraRows.map((row,i)=>{
  const fields=row.split('|');
  const [category,question,answer,d1,d2,d3,explanation,key,page,verificationUrl]=fields;
  if(fields.length<8||!slideSources[key]||![category,question,answer,d1,d2,d3,explanation].every(Boolean))throw new Error('Invalid slide question at line '+(i+1));
  return {id:prefix+String(i+1).padStart(3,'0'),category,question,options:[answer,d1,d2,d3],correct:0,explanation,...slideSources[key],...(page?{sourcePage:Number(page)}:{}),...(verificationUrl?{verificationUrl}:{})};
}));
}
const examSource='Global EE Exam🏠🐶🌼.pdf';
const sourceMap=JSON.parse(fs.readFileSync(path.join(__dirname,'exam-source-map.json'),'utf8'));
for(const q of bank){if(sourceMap[q.id]){q.source=examSource;q.sourcePage=sourceMap[q.id];q.primary=true;}}
const examRows=fs.readFileSync(path.join(__dirname,'exam-questions.txt'),'utf8').trim().split(/\r?\n/);
bank.push(...examRows.map((row,i)=>{
  const [category,question,answer,d1,d2,d3,explanation,page,verificationUrl]=row.split('|');
  if(![category,question,answer,d1,d2,d3,explanation].every(Boolean)||!Number.isInteger(Number(page))||Number(page)<1||Number(page)>44)throw new Error('Invalid Global EE Exam question at line '+(i+1));
  return {id:'exam'+String(i+1).padStart(3,'0'),category,question,options:[answer,d1,d2,d3],correct:0,explanation,source:examSource,sourcePage:Number(page),primary:true,...(verificationUrl?{verificationUrl}:{})};
}));
fs.mkdirSync(path.join(__dirname, 'dist', 'sources'), {recursive: true});
fs.writeFileSync(path.join(__dirname, 'dist', 'questions.js'), 'window.QUESTION_BANK = ' + JSON.stringify(bank, null, 2) + ';\n');
const escape = s => s.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
for (const file of [sourceName, 'Global EE Exam🏠🐶🌼.pdf',currentSource]) {
  const text = fs.readFileSync(path.join(__dirname,'reference-text',file+'.txt'),'utf8');
  fs.writeFileSync(path.join(__dirname,'dist','sources',file+'.html'), `<!doctype html><html lang="th"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(file)}</title><style>body{max-width:850px;margin:40px auto;padding:0 20px;font-family:system-ui;line-height:1.8;color:#173e35;background:#f6f7f2}pre{white-space:pre-wrap;overflow-wrap:anywhere;font:inherit;background:white;padding:25px;border:1px solid #e0e6dd;border-radius:12px}h1{font-size:22px}p{font-size:14px}</style><a href="../index.html">← กลับเว็บฝึกข้อสอบ</a><h1>${escape(file)}</h1><p>ข้อความที่สกัดจาก PDF ต้นฉบับใน Data/Global เพื่อใช้อ่านประกอบ อาจมีคำหรือวรรณยุกต์ที่แยกบรรทัดจากการสกัด และไม่มีภาพ ตารางหรือสัญลักษณ์บางส่วน ข้อมูลเป็นไปตามเอกสารต้นฉบับและอาจมีข้อมูลเก่า อ่าน PDF ฉบับเต็มได้ในโฟลเดอร์ Data ของโปรเจกต์</p><pre>${escape(text)}</pre></html>`);
  const largeFile=path.join(__dirname,'dist','sources',file);
  if(fs.existsSync(largeFile))fs.unlinkSync(largeFile);
}
console.log('Built',bank.length,'questions;',bank.filter(q=>q.primary).length,'from Global EE Exam');
