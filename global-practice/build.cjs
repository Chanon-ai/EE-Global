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
fs.mkdirSync(path.join(__dirname, 'dist', 'sources'), {recursive: true});
fs.writeFileSync(path.join(__dirname, 'dist', 'questions.js'), 'window.QUESTION_BANK = ' + JSON.stringify(bank, null, 2) + ';\n');
const escape = s => s.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
for (const file of [sourceName, 'Global EE Exam🏠🐶🌼.pdf']) {
  const text = fs.readFileSync(path.join(__dirname,'reference-text',file+'.txt'),'utf8');
  fs.writeFileSync(path.join(__dirname,'dist','sources',file+'.html'), `<!doctype html><html lang="th"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(file)}</title><style>body{max-width:850px;margin:40px auto;padding:0 20px;font-family:system-ui;line-height:1.8;color:#173e35;background:#f6f7f2}pre{white-space:pre-wrap;overflow-wrap:anywhere;font:inherit;background:white;padding:25px;border:1px solid #e0e6dd;border-radius:12px}h1{font-size:22px}p{font-size:14px}</style><a href="../index.html">← กลับเว็บฝึกข้อสอบ</a><h1>${escape(file)}</h1><p>ข้อความที่สกัดจาก PDF ต้นฉบับใน Data/Global เพื่อใช้อ่านประกอบ อาจมีคำหรือวรรณยุกต์ที่แยกบรรทัดจากการสกัด และไม่มีภาพ ตารางหรือสัญลักษณ์บางส่วน ข้อมูลเป็นไปตามเอกสารต้นฉบับและอาจมีข้อมูลเก่า อ่าน PDF ฉบับเต็มได้ในโฟลเดอร์ Data ของโปรเจกต์</p><pre>${escape(text)}</pre></html>`);
  const largeFile=path.join(__dirname,'dist','sources',file);
  if(fs.existsSync(largeFile))fs.unlinkSync(largeFile);
}
console.log('Built', bank.length, 'questions from Data/Global');
