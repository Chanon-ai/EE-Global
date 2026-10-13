const fs=require('fs'),pdf=require('./node_modules/pdf-parse');let number=0;const pages=[];
pdf(fs.readFileSync('Data/Global/Global EE Exam🏠🐶🌼.pdf'),{pagerender:async page=>{
 const content=await page.getTextContent();let lastY,text='';
 for(const item of content.items){if(lastY!==undefined&&lastY!==item.transform[5])text+='\n';text+=item.str;lastY=item.transform[5];}
 pages.push({page:++number,text});return text;
}}).then(()=>{fs.writeFileSync('tools/exam-pages.json',JSON.stringify(pages,null,2));for(const p of pages)console.log('PAGE',p.page,p.text.replace(/\s+/g,' ').slice(0,230));});
