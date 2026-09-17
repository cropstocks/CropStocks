import { SentinelHubProvider } from './src/services/sentinelHubProvider.js';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config({ path: './.env' });

async function run() {
  const provider = new SentinelHubProvider();
  const history = await provider.searchLatest(28.7041, 77.1025, "user1");
  const b64 = history[history.length-1].truecolor_url.split(',')[1];
  fs.writeFileSync('test.png', Buffer.from(b64, 'base64'));
  console.log("Saved test.png");
}
run();
