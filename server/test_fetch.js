import { SentinelHubProvider } from './src/services/sentinelHubProvider.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

async function run() {
  const provider = new SentinelHubProvider();
  try {
    const history = await provider.searchLatest(28.7041, 77.1025, "user1");
    console.log("Success! Got history of length:", history.length);
    console.log("Latest truecolor URL starts with:", history[history.length-1].truecolor_url.substring(0, 50));
    console.log("Latest truecolor URL length:", history[history.length-1].truecolor_url.length);
  } catch (e) {
    console.error("Failed:", e);
  }
}
run();
