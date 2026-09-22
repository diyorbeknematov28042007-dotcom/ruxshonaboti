const isVercel = process.env.VERCEL === "1";
const environment = process.env.VERCEL_ENV ?? process.env.VERCEL_TARGET_ENV;

if (!isVercel) {
  console.log("[webhook] Local/non-Vercel build: skipping Telegram webhook registration.");
  process.exit(0);
}

if (environment !== "production") {
  console.log(`[webhook] Vercel environment is "${environment ?? "unknown"}": skipping webhook registration.`);
  process.exit(0);
}

const token = process.env.TELEGRAM_BOT_TOKEN;
const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET;
const productionHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL;

if (!token) throw new Error("TELEGRAM_BOT_TOKEN is missing in Vercel Production environment.");
if (!webhookSecret) throw new Error("TELEGRAM_WEBHOOK_SECRET is missing in Vercel Production environment.");
if (!productionHost) throw new Error("Vercel production URL is unavailable.");

const webhookUrl = `https://${productionHost}/api/webhook`;
const telegramApi = `https://api.telegram.org/bot${token}`;

async function telegram(method, body) {
  const response = await fetch(`${telegramApi}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  if (!response.ok || data?.ok !== true) {
    throw new Error(
      `Telegram ${method} failed: ${response.status} ${JSON.stringify(data)}`
    );
  }

  return data;
}

const me = await telegram("getMe", {});
console.log(`[webhook] Bot verified: @${me.result.username ?? "unknown"}`);

await telegram("setWebhook", {
  url: webhookUrl,
  secret_token: webhookSecret,
  allowed_updates: ["message", "callback_query"],
  drop_pending_updates: false
});

const info = await telegram("getWebhookInfo", {});

if (info.result?.url !== webhookUrl) {
  throw new Error(
    `Webhook verification failed. Expected ${webhookUrl}, got ${info.result?.url ?? "empty"}`
  );
}

if (info.result?.last_error_message) {
  console.warn(`[webhook] Telegram reports previous webhook error: ${info.result.last_error_message}`);
}

console.log(`[webhook] Registered and verified: ${webhookUrl}`);
