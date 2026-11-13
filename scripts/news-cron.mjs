import { refreshNews } from "../src/lib/news.ts";

const EVERY_MS = 15 * 60 * 1000;

async function tick() {
  const pack = await refreshNews();
  console.log(`[news-cron] ${pack.updatedAt} itens=${pack.items.length} live=${pack.live}`);
}

await tick();
setInterval(() => {
  tick().catch((err) => console.error("[news-cron]", err));
}, EVERY_MS);
