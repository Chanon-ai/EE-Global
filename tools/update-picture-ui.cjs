const fs=require('fs');
const file='global-practice/dist/app.js';let text=fs.readFileSync(file,'utf8');
const replacements=[
 ['${esc(q.question)}</h2><div class="option-list">','${esc(q.question)}</h2>${pictureHTML(q)}<div class="option-list">'],
 ['${esc(q.question)}</h3><p class="review-answer','${esc(q.question)}</h3>${pictureHTML(q,true)}<p class="review-answer'],
 ['5 หมวดความรู้ · สุ่มรวมทุกหมวด','5 หมวดความรู้ · รวมคำถามรูปภาพ'],
 ['สุ่มคำถามโดยไม่ซ้ำในรอบ','45 ข้อทั่วไป + 5 ข้อรูปภาพ'],
 ['สุ่ม 50 ข้อจากคลัง','สุ่ม 50 ข้อ รวมข้อรูปภาพ'],
 ['ภาพสรุปใน Data ยังไม่ได้ใช้สร้างคำถามในรุ่นนี้','มีคำถามระบุบุคคลจากภาพใน PDF หน้าที่ 32–35 โดยใช้ชื่อกำกับในเอกสารเป็นเฉลย ภาพสรุป PNG ใน Data ยังไม่ได้ใช้สร้างคำถาม'],
 ['ข้อที่ต้องดูภาพที่ขาดหาย','ข้อที่ต้องดูภาพที่ขาดหายหรือไม่มีชื่อกำกับ'],
 ["  const b=e.target.closest('button');if(!b||b.disabled)return;", "  const b=e.target.closest('button');if(!b||b.disabled)return;\n  if(b.dataset.picture){openPicture(b.dataset.picture);return;}"],
 ["  if(view!=='quiz'||e.ctrlKey", "  if(pictureDialog.open||view!=='quiz'||e.ctrlKey"]
];
for(const [a,b]of replacements){if(!text.includes(a))throw new Error('Missing replacement: '+a);text=text.replace(a,b);}
text=text.replace('renderHome();\n',`const pictureDialog=document.querySelector('#picture-dialog');
function openPicture(src){
  document.querySelector('#enlarged-picture').src=src;
  pictureDialog.showModal();
}
document.querySelector('#close-picture').addEventListener('click',()=>pictureDialog.close());
pictureDialog.addEventListener('click',e=>{if(e.target===pictureDialog){const r=pictureDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)pictureDialog.close();}});
app.addEventListener('error',e=>{if(e.target.tagName==='IMG'){const figure=e.target.closest('figure');if(figure){figure.querySelector('figcaption').textContent='โหลดภาพไม่สำเร็จ กรุณารีโหลดหน้าเว็บ หรือข้ามไปข้ออื่นก่อน';}}},true);
renderHome();
`);
fs.writeFileSync(file,text);
