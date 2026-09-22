import type { VercelRequest, VercelResponse } from "@vercel/node";
import { timingSafeEqual } from "node:crypto";
import { handleTelegramUpdate } from "../src/telegram.js";

function safeEqual(a: string, b: string) {
  const aa = Buffer.from(a);
  const bb = Buffer.from(b);
  return aa.length === bb.length && timingSafeEqual(aa, bb);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const expected = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!expected) {
    return res.status(500).json({ ok: false, error: "Webhook secret is not configured" });
  }

  const received = String(req.headers["x-telegram-bot-api-secret-token"] ?? "");
  if (!safeEqual(received, expected)) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }

  try {
    await handleTelegramUpdate(req.body);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false });
  }
}
