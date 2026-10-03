import * as fs from 'fs';
import * as path from 'path';
import { createConnection } from 'typeorm';

// CSV 파싱 (세미콜론 구분, latin-1 인코딩)
function parseCSV(filePath: string): any[] {
  const content = fs.readFileSync(filePath, 'latin1');
  const lines = content.split('\n');
  const headers = lines[0].replace('\r', '').split(';');
  const rows: any[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].replace('\r', '');
    if (!line.trim()) continue;
    const values = line.split(';');
    const row: any = {};
    headers.forEach((h, idx) => {
      row[h.trim()] = (values[idx] || '').trim();
    });
    rows.push(row);
  }
  return rows;
}

// Rating(1~5) → longevity/sillage(1~10) 변환
function ratingToScore(rating: string): number {
  const num = parseFloat(rating.replace(',', '.'));
  if (isNaN(num)) return 5;
  // 1~5 범위를 1~10으로 변환
  return Math.min(10, Math.max(1, Math.round(num * 2)));
}

// 가격 랜덤 생성 (브랜드 티어 기반)
const luxuryBrands = ['chanel', 'dior', 'guerlain', 'hermes', 'tom ford', 'creed', 'xerjoff', 'amouage', 'roja dove'];
function generatePrice(brand: string): number {
  const b = brand.toLowerCase();
  if (luxuryBrands.some(lb => b.includes(lb))) {
    return Math.round((Math.random() * 200000 + 150000) / 1000) * 1000;
  }
  return Math.round((Math.random() * 100000 + 50000) / 1000) * 1000;
}

async function seed() {
  const connection = await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'perfume_db',
    synchronize: false,
  });

  const csvPath = process.argv[2] || './fra_cleaned.csv';
  const rows = parseCSV(csvPath);
  console.log(`총 ${rows.length}개 향수 데이터 처리 시작...`);

  let inserted = 0;
  let failed = 0;

  for (const row of rows) {
    const name = row['Perfume'];
    const brand = row['Brand'];
    if (!name || !brand) continue;

    try {
      // 향수 삽입
      const perfumeResult = await connection.query(
        `INSERT INTO perfumes (name, brand, price, description, longevity, sillage, image_url)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT DO NOTHING
         RETURNING id`,
        [
          name,
          brand,
          generatePrice(brand),
          `${brand}의 ${name}. ${row['Gender'] || ''} 향수. ${row['Year'] ? row['Year'] + '년 출시.' : ''}`.trim(),
          ratingToScore(row['Rating Value']),
          ratingToScore(row['Rating Value']),
          row['url'] || '',
        ]
      );

      if (!perfumeResult.length) continue;
      const perfumeId = perfumeResult[0].id;

      // 노트 삽입
      const noteTypes: { key: string; type: string }[] = [
        { key: 'Top', type: 'top' },
        { key: 'Middle', type: 'middle' },
        { key: 'Base', type: 'base' },
      ];

      for (const { key, type } of noteTypes) {
        const notesStr = row[key];
        if (!notesStr || notesStr === 'unknown') continue;
        const notes = notesStr.split(',').map((n: string) => n.trim()).filter(Boolean);
        const percentage = Math.floor(100 / notes.length);

        for (const note of notes) {
          await connection.query(
            `INSERT INTO notes (perfume_id, note_type, ingredient_name, percentage)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT DO NOTHING`,
            [perfumeId, type, note, percentage]
          );
        }
      }

      inserted++;
      if (inserted % 1000 === 0) {
        console.log(`${inserted}개 완료...`);
      }
    } catch (err: any) {
      failed++;
      if (failed < 5) console.error('오류:', err.message);
    }
  }

  console.log(`\n완료! 성공: ${inserted}개, 실패: ${failed}개`);
  await connection.close();
}

seed().catch(console.error);
