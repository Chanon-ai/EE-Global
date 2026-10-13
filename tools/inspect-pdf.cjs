const fs=require('fs');
const pdfjs=require('./node_modules/pdf-parse/lib/pdf.js/v1.10.100/build/pdf.js');
pdfjs.disableWorker=true;
(async()=>{
 const file='Data/Global/(Update) สิ่งที่ควรรู้ก่อนสอบ Global 2026.pdf';
 const doc=await pdfjs.getDocument(fs.readFileSync(file));
 for(let n=1;n<=doc.numPages;n++){
  const page=await doc.getPage(n), content=await page.getTextContent();
  const text=content.items.map(i=>i.str).join('');
  if(/Mandela|Washington|Newton|Freud|Jobs|Zuckerberg|Biden|Obama|Tesla|Wright/.test(text)){
   fs.writeFileSync('tools/page-'+n+'.txt',JSON.stringify(content.items,null,2));
   const op=await page.getOperatorList();
   console.log('PAGE',n,'SIZE',page.view,'IMAGES',op.fnArray.map((f,i)=>[f,op.argsArray[i]]).filter(([f])=>f===pdfjs.OPS.paintImageXObject||f===pdfjs.OPS.paintJpegXObject));
   console.log(text.slice(0,5000));
  }
 }
})();
