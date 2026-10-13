# EE Global

เว็บฝึกข้อสอบ Global พร้อมเฉลยและคำอธิบายภาษาไทย

## รันบนเครื่อง

ติดตั้ง Node.js แล้วรันจากโฟลเดอร์หลักของโปรเจกต์:

```sh
npm start
```

เปิด http://127.0.0.1:4173 ในเบราว์เซอร์ ไม่ต้องติดตั้ง dependencies เพื่อรันเว็บนี้
หรือเปิด `index.html` ที่โฟลเดอร์หลักได้โดยตรง

หลังแก้ข้อมูลคำถาม ให้รัน:

```sh
npm run build
npm test
```

## เปิดเว็บบน GitHub Pages

อัปโหลดไฟล์ที่แก้ไขไปยัง branch `main` ก่อน แล้วเลือกวิธีเผยแพร่วิธีใดวิธีหนึ่ง:

### เผยแพร่จาก branch

ไปที่ **Settings → Pages → Build and deployment** เลือก **Deploy from a branch**
เลือก branch **main** และโฟลเดอร์ **/(root)** แล้วกด **Save**
ไฟล์ `index.html` ที่โฟลเดอร์หลักจะพาไปยัง `global-practice/dist/index.html`
ไฟล์ `.nojekyll` ทำให้ GitHub Pages เสิร์ฟไฟล์ static โดยตรง

### เผยแพร่ผ่าน GitHub Actions

ไปที่ **Settings → Pages → Build and deployment → Source** เลือก **GitHub Actions**
จากนั้นไปที่ **Actions → Deploy Global Practice to GitHub Pages → Run workflow**
เลือก `main` แล้วรัน Workflow นี้จะ build และทดสอบ ก่อนเผยแพร่ `global-practice/dist`
ซึ่งมี `index.html` อยู่ที่ระดับบนสุด หลังจากนั้นการ push การแก้ไขเว็บเข้า `main`
จะเผยแพร่ให้อัตโนมัติ

เมื่อ deployment สำเร็จ เปิด https://Chanon-ai.github.io/EE-Global/
ตรวจ URL ที่ GitHub แสดงใน **Settings → Pages** หากเปลี่ยนชื่อบัญชีหรือ repository

รายละเอียดเนื้อหาและการใช้งานอยู่ใน [global-practice/README.md](global-practice/README.md)
