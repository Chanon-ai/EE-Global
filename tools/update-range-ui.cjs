const fs=require('fs');const file='global-practice/dist/app.js';let s=fs.readFileSync(file,'utf8');
const edits=[
 ['รอบใหม่เน้น Global EE Exam 80% · ไม่มีเวลาจำกัด','สุ่ม Global EE Exam 25–40 ข้อต่อรอบ · ไม่มีเวลาจำกัด'],
 ['40 ข้อหลัก + 5 เสริม + 5 รูปภาพ','25–40 ข้อหลัก · รูปภาพ 5 ข้อ'],
 ['40 ข้อจาก Global EE Exam','สุ่ม 25–40 ข้อจาก Global EE Exam'],
 ['รอบใหม่สุ่ม 40 ข้อจากไฟล์หลัก + 5 ข้อเนื้อหาเสริม + 5 ข้อรูปภาพ','รอบใหม่สุ่มจำนวนข้อจากไฟล์หลักระหว่าง 25–40 ข้อ มีข้อรูปภาพ 5 ข้อ และใช้เนื้อหาเสริมเติมให้ครบ 50 ข้อ'],
 ["session.mode==='ee-main-v1'?'GLOBAL EE EXAM · 40 MAIN + 5 EXTRA + 5 PICTURES':'PRACTICE SESSION / 50 QUESTIONS'", "['ee-range-v1','ee-main-v1'].includes(session.mode)?`GLOBAL EE EXAM · ${session.questions.filter(item=>item.primary).length} MAIN + ${session.questions.filter(item=>!item.primary&&!item.image).length} EXTRA + ${session.questions.filter(item=>item.image).length} PICTURES`:'PRACTICE SESSION / 50 QUESTIONS'"],
 ["session.mode!=='ee-main-v1'?'รอบนี้เริ่มก่อนอัปเดต สัดส่วนเดิมยังคงไว้ เริ่มรอบใหม่เพื่อเน้น Global EE Exam<br>':''", "session.mode!=='ee-range-v1'?'รอบนี้เริ่มก่อนอัปเดต สัดส่วนเดิมยังคงไว้ เริ่มรอบใหม่เพื่อสุ่ม Global EE Exam 25–40 ข้อ<br>':''"],
 ["mode:'ee-main-v1'","mode:'ee-range-v1'"]
];for(const [a,b]of edits){if(!s.includes(a))throw new Error('Missing '+a);s=s.replace(a,b);}fs.writeFileSync(file,s);
