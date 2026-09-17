import { SentinelHubProvider } from './server/src/services/sentinelHubProvider.js';
import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' });

async function run() {
  const provider = new SentinelHubProvider();
  try {
    const history = await provider.searchLatest(28.7041, 77.1025, "user1");
    console.log("Success! Got history of length:", history.length);
    console.log("Latest truecolor URL starts with:", history[history.length-1].truecolor_url.substring(0, 50));
  } catch (e) {
    console.error("Failed:", e);
  }
}
run();
