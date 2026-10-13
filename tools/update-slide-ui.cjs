const fs=require('fs');const file='global-practice/dist/app.js';let s=fs.readFileSync(file,'utf8');
const edits=[
 ['เรียบเรียงจาก Data/Global','เรียบเรียงจากสไลด์ใน Data'],
 ['คำถามเรียบเรียงจาก PDF ในโฟลเดอร์ Data/Global','คำถามเรียบเรียงจาก PDF ใน Data/Global และภาพสรุปใน Data'],
 ['ภาพสรุป PNG ใน Data ยังไม่ได้ใช้สร้างคำถาม','เพิ่มหัวข้อจากภาพสรุปแร่หายากและขยะพลาสติก พร้อมลิงก์อ่านสไลด์ต้นฉบับหลังตอบ'],
 ["${[...new Set(BANK.map(q=>q.source))].map(s=>`<a href=\"sources/${encodeURIComponent(s)}.html\" target=\"_blank\" rel=\"noopener\">↗ ${esc(s)}</a>`).join('')}", "${[...new Map(BANK.map(q=>[q.source,q])).values()].map(q=>`<a href=\"${esc(sourceHref(q))}\" target=\"_blank\" rel=\"noopener\">↗ ${esc(q.source)}</a>`).join('')}"]
];for(const [a,b]of edits){if(!s.includes(a))throw new Error('Missing '+a);s=s.replace(a,b);}fs.writeFileSync(file,s);
