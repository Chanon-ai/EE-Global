const fs=require('fs');const file='global-practice/dist/app.js';let s=fs.readFileSync(file,'utf8');
const edits=[
 ['ฝึกข้อสอบ Global ภาษาอังกฤษจากเอกสารของคุณ','ฝึกข้อสอบภาษาอังกฤษ เน้นไฟล์ Global EE Exam'],
 ['45 ข้อทั่วไป + 5 ข้อรูปภาพ','40 ข้อหลัก + 5 เสริม + 5 รูปภาพ'],
 ['สุ่ม 50 ข้อ รวมข้อรูปภาพ','40 ข้อจาก Global EE Exam'],
 ['สุ่มใหม่ได้ทุกครั้ง · ไม่มีเวลาจำกัด · ไม่ต้องสมัครสมาชิก','รอบใหม่เน้น Global EE Exam 80% · ไม่มีเวลาจำกัด'],
 ["session={version:1,questions:createRound(BANK)","session={version:1,mode:'ee-main-v1',questions:createRound(BANK)"],
 ['<span class="round-label">PRACTICE SESSION / 50 QUESTIONS</span>','<span class="round-label">${session.mode===\'ee-main-v1\'?\'GLOBAL EE EXAM · 40 MAIN + 5 EXTRA + 5 PICTURES\':\'PRACTICE SESSION / 50 QUESTIONS\'}</span>'],
 ['คำถามเรียบเรียงจาก PDF ใน Data/Global และภาพสรุปใน Data','ใช้ Global EE Exam เป็นไฟล์หลัก โดยมี ${BANK.filter(q=>q.primary).length} ข้อจากไฟล์นี้ในคลัง รอบใหม่สุ่ม 40 ข้อจากไฟล์หลัก + 5 ข้อเนื้อหาเสริม + 5 ข้อรูปภาพ คำถามเรียบเรียงจาก PDF ใน Data/Global และภาพสรุปใน Data'],
 ['เลือกเลขข้อเพื่อย้อนดูหรือข้ามไปข้ออื่นได้<br>','${session.mode!==\'ee-main-v1\'?\'รอบนี้เริ่มก่อนอัปเดต สัดส่วนเดิมยังคงไว้ เริ่มรอบใหม่เพื่อเน้น Global EE Exam<br>\':\'\'}เลือกเลขข้อเพื่อย้อนดูหรือข้ามไปข้ออื่นได้<br>']
];for(const [a,b]of edits){if(!s.includes(a))throw new Error('Missing '+a);s=s.replace(a,b);}fs.writeFileSync(file,s);
