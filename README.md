# G‘afur G‘ulom Telegram Bot

G‘afur G‘ulom hayoti va ijodiga bag‘ishlangan o‘zbekcha Telegram ma’lumotnoma boti.

## Imkoniyatlar

- biografiya va xronologiya
- asarlar va “Shum bola” bo‘limi
- she’riyat va tarjimonlik faoliyati
- unvon va mukofotlar
- uy-muzeyi va xotira
- interaktiv viktorina
- tekshirilgan manbalar
- Telegram webhook secret verification

## Vercel environment variables

```env
TELEGRAM_BOT_TOKEN=...
TELEGRAM_WEBHOOK_SECRET=...
SETUP_SECRET=...
```

Secretlarni repository'ga commit qilmang.

## Deploy

Repo'ni Vercel'ga import qiling. Framework preset: **Other**. Root directory: repository root.

Deploydan keyin webhookni ro‘yxatdan o‘tkazing:

```bash
curl -X POST \
  -H "Authorization: Bearer $SETUP_SECRET" \
  https://YOUR-VERCEL-DOMAIN/api/register-webhook
```

Health check:

```bash
curl https://YOUR-VERCEL-DOMAIN/api/health
```

## Local validation

```bash
npm install
npm run typecheck
```

## Muhim: sanalardagi manba tafovuti

Adabiy va institutsional manbalarda ayrim sanalar bir xil emas:

- tug‘ilgan sana ko‘plab manbalarda 1903-yil 10-may, O‘zbekiston Fanlar akademiyasi ro‘yxatida 11-may;
- vafot sanasi uchun O‘zbekiston Fanlar akademiyasi va O‘zA 1966-yil 10-iyulni ko‘rsatadi, ayrim ikkilamchi sahifalarda 10-iyun uchraydi.

Bot bu farqni ochiq qayd etadi.

## Kontent manbalari

- O‘zbekiston Respublikasi Fanlar akademiyasi
- O‘zA
- Uzbekistan Travel
- Ziyouz

Bot to‘liq badiiy matnlarni ko‘chirmaydi; faktlar, tavsiflar va qisqa mazmunlar bilan ishlaydi.
