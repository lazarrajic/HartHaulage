const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const assets = [
  {
    url: 'https://www.harthaulage.co.nz/uploads/2/8/4/3/28430819/published/hart-haulage-no-tag.png',
    name: 'logo.png',
  },
  {
    url: 'https://www.harthaulage.co.nz/uploads/2/8/4/3/28430819/img-9552_orig.jpeg',
    name: 'photo-01.jpeg',
  },
  {
    url: 'https://www.harthaulage.co.nz/uploads/2/8/4/3/28430819/img-3629_orig.jpeg',
    name: 'photo-02.jpeg',
  },
  {
    url: 'https://www.harthaulage.co.nz/uploads/2/8/4/3/28430819/img-3640_orig.jpg',
    name: 'photo-03.jpeg',
  },
  {
    url: 'https://www.harthaulage.co.nz/uploads/2/8/4/3/28430819/img-0044_orig.jpg',
    name: 'photo-04.jpeg',
  },
  {
    url: 'https://www.harthaulage.co.nz/uploads/2/8/4/3/28430819/img-0046_orig.jpg',
    name: 'photo-05.jpeg',
  },
  {
    url: 'https://www.harthaulage.co.nz/uploads/2/8/4/3/28430819/img-0049_orig.jpg',
    name: 'photo-06.jpeg',
  },
  {
    url: 'https://www.harthaulage.co.nz/uploads/2/8/4/3/28430819/img-4116_orig.jpeg',
    name: 'photo-07.jpeg',
  },
  {
    url: 'https://www.harthaulage.co.nz/uploads/2/8/4/3/28430819/img-1145_orig.jpeg',
    name: 'photo-08.jpeg',
  },
  {
    url: 'https://www.harthaulage.co.nz/uploads/2/8/4/3/28430819/img-8281_orig.jpg',
    name: 'photo-09.jpeg',
  },
  {
    url: 'https://www.harthaulage.co.nz/uploads/2/8/4/3/28430819/img-4793_orig.jpg',
    name: 'photo-10.jpeg',
  },
  {
    url: 'https://www.harthaulage.co.nz/uploads/2/8/4/3/28430819/img-0103_orig.jpg',
    name: 'photo-11.jpeg',
  },
  {
    url: 'https://www.harthaulage.co.nz/uploads/2/8/4/3/28430819/img-4053_orig.jpeg',
    name: 'photo-12.jpeg',
  },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const protocol = url.startsWith('https') ? https : http;

    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.harthaulage.co.nz/',
      },
    };

    const request = protocol.get(url, options, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`Status ${response.statusCode} for ${url}`));
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(dest);
        resolve(stats.size);
      });
    });

    request.on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });

    file.on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function main() {
  console.log(`Downloading ${assets.length} assets to ${outputDir}\n`);
  let success = 0, failed = 0;

  for (const asset of assets) {
    const dest = path.join(outputDir, asset.name);
    try {
      const size = await download(asset.url, dest);
      console.log(`✓ ${asset.name} (${(size / 1024).toFixed(0)} KB)`);
      success++;
    } catch (err) {
      console.error(`✗ ${asset.name}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone: ${success} succeeded, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main();
