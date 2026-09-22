import type { VercelRequest, VercelResponse } from "@vercel/node";
import { timingSafeEqual } from "node:crypto";

function safeEqual(a: string, b: string) {
  const aa = Buffer.from(a);
  const bb = Buffer.from(b);
  return aa.length === bb.length && timingSafeEqual(aa, bb);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const setupSecret = process.env.SETUP_SECRET;
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET;

  if (!setupSecret || !token || !webhookSecret) {
    return res.status(500).json({ ok: false, error: "Required environment variables are missing" });
  }

  const auth = String(req.headers.authorization ?? "");
  const provided = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!safeEqual(provided, setupSecret)) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }

  const proto = String(req.headers["x-forwarded-proto"] ?? "https");
  const host = String(req.headers["x-forwarded-host"] ?? req.headers.host ?? "");
  if (!host) return res.status(400).json({ ok: false, error: "Host is missing" });

  const webhookUrl = `${proto}://${host}/api/webhook`;

  const tgResponse = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      url: webhookUrl,
      secret_token: webhookSecret,
      allowed_updates: ["message", "callback_query"],
      drop_pending_updates: true
    })
  });

  const data = await tgResponse.json();
  return res.status(tgResponse.ok ? 200 : 502).json({
    ok: tgResponse.ok,
    webhookUrl,
    telegram: data
  });
}
