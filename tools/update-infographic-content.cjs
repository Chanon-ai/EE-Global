const fs=require('fs'),path=require('path');
const originals={
 'nobel-2025.png':'สรุป รางวัลโนเบล 2025.png',
 'heritage-2025.png':'สรุป มรดกโลก ปี 2025.png',
 'gold-factors.png':'สรุป เรื่องน่ารู้ ทองคำ.png',
 'internet-2025.png':'เรื่องน่ารู้ เกี่ยวกับ อินเทอร์เน็ต.png',
 'nuclear-submarines-2025.png':'อัพเดทข่าว น่ารู้ เรื่องเรือดำน้ำนิวเคลียร์.png'
};
for(const [name,original]of Object.entries(originals))fs.copyFileSync(path.join('Data','สรุปรวมเรื่องน่ารู้ในโลก',original),path.join('global-practice','dist','slides',name));
const app='global-practice/dist/app.js';let s=fs.readFileSync(app,'utf8');
const before='เพิ่มหัวข้อจากภาพสรุปแร่หายากและขยะพลาสติก พร้อมลิงก์อ่านสไลด์ต้นฉบับหลังตอบ';
if(!s.includes(before))throw new Error('Missing source description');
s=s.replace(before,'มีเนื้อหาเสริมจากภาพสรุปแร่ ขยะพลาสติก โนเบล 2025 มรดกโลก 2025 ปัจจัยราคาทองคำ เสรีภาพอินเทอร์เน็ต และเรือดำน้ำนิวเคลียร์ พร้อมลิงก์อ่านสไลด์ต้นฉบับหลังตอบ ข้อที่ถามอันดับหรือตัวเลขระบุปีหรืออ้างข้อมูลตามสไลด์');fs.writeFileSync(app,s);
const readme='global-practice/README.md';s=fs.readFileSync(readme,'utf8').replace('คลังรวม 243 ข้อ','คลังรวม 283 ข้อ');
s+='\n## เพิ่มเติมจากภาพสรุป\n\nเพิ่ม 40 ข้อใน `infographic-questions.txt`: โนเบล 2025 จำนวน 15 ข้อ มรดกโลก 2025 จำนวน 10 ข้อ ปัจจัยราคาทองคำ 6 ข้อ เสรีภาพอินเทอร์เน็ต 4 ข้อ และเรือดำน้ำนิวเคลียร์ 5 ข้อ รูปแบบข้อมูลเหมือน slide-questions.txt แต่ใช้ ID graphic001 เป็นต้นไปเพื่อรักษา ID ของคำถามเดิม\n\nภาพอ้างอิง 5 ภาพเก็บใน dist/slides และเปิดได้จากเฉลย คำถามด้านตัวเลขหรืออันดับอ้างปี 2025 หรือภาพต้นฉบับ ไม่ถือเป็นค่าปัจจุบัน จำนวนข้อจาก Global EE Exam ยังคง 25–40 ข้อต่อรอบ และภาพบุคคลยังคง 5 ข้อ\n';fs.writeFileSync(readme,s);
