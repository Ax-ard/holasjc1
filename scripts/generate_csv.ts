import * as fs from 'fs';
import * as path from 'path';
import { ALL_EVENTS } from '../src/data/events';
import { generateEventsCsv } from '../src/utils/csvExport';

const csvContent = generateEventsCsv(ALL_EVENTS);
const publicDir = path.resolve(process.cwd(), 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const outputPath = path.join(publicDir, 'hola_survival_84_tinh_huong.csv');
fs.writeFileSync(outputPath, csvContent, 'utf-8');

console.log(`Successfully generated CSV with ${ALL_EVENTS.length} situations at: ${outputPath}`);
