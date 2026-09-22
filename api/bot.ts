import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).send("Method not allowed");
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    return res.status(503).send("Telegram bot token is not configured.");
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/getMe`);
    const data = await response.json() as {
      ok?: boolean;
      result?: { username?: string };
    };

    const username = data.result?.username;
    if (!response.ok || data.ok !== true || !username) {
      return res.status(502).send("Telegram bot is temporarily unavailable.");
    }

    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    return res.redirect(302, `https://t.me/${username}`);
  } catch (error) {
    console.error(error);
    return res.status(502).send("Telegram bot is temporarily unavailable.");
  }
}
