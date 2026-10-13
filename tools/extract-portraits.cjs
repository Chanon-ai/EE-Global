const fs=require('fs'),path=require('path'),{PNG}=require('pngjs');
global.document=new (require('jsdom').JSDOM)('').window.document;
const pdfjs=require('./node_modules/pdf-parse/lib/pdf.js/v1.10.100/build/pdf.js');
pdfjs.disableWorker=true;
(async()=>{
 const name=fs.readdirSync('Data/Global').find(f=>f.startsWith('(Update)')&&f.endsWith('2026.pdf'));
 const doc=await pdfjs.getDocument({data:fs.readFileSync(path.join('Data/Global',name)),disableFontFace:true,nativeImageDecoderSupport:'none'});
 const out='global-practice/dist/images';fs.mkdirSync(out,{recursive:true});
 const selected=new Set(JSON.parse(fs.readFileSync('global-practice/image-questions.json','utf8')).map(q=>path.basename(q.image,'.png')));
 for(const n of [32,33,34,35]){
  const page=await doc.getPage(n), op=await page.getOperatorList();
  let transform;
  for(let i=0;i<op.fnArray.length;i++){
   if(op.fnArray[i]===pdfjs.OPS.transform)transform=op.argsArray[i];
   if(op.fnArray[i]!==pdfjs.OPS.paintImageXObject)continue;
   const id=op.argsArray[i][0];if(!selected.has(id))continue;
   const obj=await new Promise(resolve=>page.objs.get(id,resolve));
   console.log(n,id,transform,obj.width,obj.height,obj.kind,obj.data?.length);
   if(!obj.data)continue;
   const png=new PNG({width:obj.width,height:obj.height});
   for(let p=0;p<obj.width*obj.height;p++){
    if(obj.kind===2){png.data[p*4]=obj.data[p*3];png.data[p*4+1]=obj.data[p*3+1];png.data[p*4+2]=obj.data[p*3+2];png.data[p*4+3]=255;}
    else if(obj.kind===3){for(let k=0;k<4;k++)png.data[p*4+k]=obj.data[p*4+k];}
    else {const bit=(obj.data[Math.floor(p/8)]>>(7-p%8))&1;png.data[p*4]=png.data[p*4+1]=png.data[p*4+2]=bit?255:0;png.data[p*4+3]=255;}
   }
   fs.writeFileSync(path.join(out,id+'.png'),PNG.sync.write(png));
  }
 }
 doc.destroy();
})();
