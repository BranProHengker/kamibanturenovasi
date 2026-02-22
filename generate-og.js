// This script generates a 1200x630 OpenGraph image using Puppeteer
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

(async () => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
          body {
            margin: 0;
            padding: 0;
            width: 1200px;
            height: 630px;
            font-family: 'Plus Jakarta Sans', sans-serif;
            background: #111111;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
          }
          
          /* Background Grid */
          .grid {
            position: absolute;
            inset: 0;
            background-size: 40px 40px;
            background-image: 
              linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
            z-index: 1;
          }
          
          /* Glow */
          .glow {
            position: absolute;
            width: 800px;
            height: 800px;
            background: radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 60%);
            top: -200px;
            right: -200px;
            z-index: 1;
          }

          .content {
            position: relative;
            z-index: 10;
            width: 100%;
            height: 100%;
            padding: 80px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .header {
            display: flex;
            align-items: center;
            gap: 20px;
          }

          .logo-box {
            width: 80px;
            height: 80px;
            border-radius: 20px;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .logo-text {
            contain: content;
          }

          .brand-name {
            font-size: 36px;
            font-weight: 800;
            color: #ffffff;
            letter-spacing: -1px;
          }

          .brand-gold {
            background: linear-gradient(135deg, #D4AF37 0%, #F3E5AB 50%, #B8860B 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .company {
            font-size: 16px;
            color: #888;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-top: 5px;
          }

          .main-text {
            max-width: 900px;
          }

          .title {
            font-size: 85px;
            font-weight: 800;
            color: white;
            line-height: 1.1;
            letter-spacing: -2px;
            margin: 0 0 30px 0;
          }

          .subtitle {
            font-size: 32px;
            color: #a0a0a0;
            line-height: 1.5;
            font-weight: 400;
            max-width: 750px;
            margin: 0;
          }

          .footer {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            border-top: 1px solid rgba(255,255,255,0.1);
            padding-top: 40px;
          }

          .tags {
            display: flex;
            gap: 15px;
          }

          .tag {
            padding: 12px 24px;
            border-radius: 100px;
            background: rgba(212,175,55,0.1);
            color: #D4AF37;
            font-size: 18px;
            font-weight: 600;
            border: 1px solid rgba(212,175,55,0.3);
          }

          .website {
            font-size: 24px;
            color: white;
            font-weight: 600;
            letter-spacing: 1px;
          }
        </style>
      </head>
      <body>
        <div class="grid"></div>
        <div class="glow"></div>
        <div class="content">
          <div class="header">
            <div class="logo-box">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <div class="logo-text">
              <div class="brand-name"><span class="brand-gold">KAMIBANTU</span>RENOVASI</div>
              <div class="company">PT. Denzen Arkatama Group</div>
            </div>
          </div>

          <div class="main-text">
            <h1 class="title">Wujudkan Rumah Impian Anda Bersama Ahlinya.</h1>
            <p class="subtitle">Jasa renovasi & bangun rumah premium. Harga transparan mulai dari ±4 Juta/meter. Bayar setelah jadi.</p>
          </div>

          <div class="footer">
            <div class="tags">
              <div class="tag">Bangun Baru</div>
              <div class="tag">Renovasi</div>
              <div class="tag">Desain Interior</div>
            </div>
            <div class="website">kamibanturenovasi.com</div>
          </div>
        </div>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch({
    headless: "new"
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  
  const destPath = path.join(__dirname, 'public', 'images', 'og-image.jpg');
  await page.screenshot({ path: destPath, quality: 100, type: 'jpeg' });
  
  console.log('OG Image successfully generated at:', destPath);
  await browser.close();
})();
