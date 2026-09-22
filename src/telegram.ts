import { BACK_MENU, CONTENT, MAIN_MENU, QUIZ, START_TEXT, type MenuKey } from "./content.js";

type TelegramUpdate = {
  message?: {
    chat: { id: number };
    text?: string;
  };
  callback_query?: {
    id: string;
    data?: string;
    message?: {
      chat: { id: number };
      message_id: number;
    };
  };
};

const API = "https://api.telegram.org";

function token(): string {
  const value = process.env.TELEGRAM_BOT_TOKEN;
  if (!value) throw new Error("TELEGRAM_BOT_TOKEN is not configured");
  return value;
}

async function telegram(method: string, body: Record<string, unknown>) {
  const response = await fetch(`${API}/bot${token()}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Telegram API ${method} failed: ${response.status} ${details}`);
  }

  return response.json();
}

async function sendMessage(
  chatId: number,
  text: string,
  replyMarkup?: Record<string, unknown>
) {
  return telegram("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    ...(replyMarkup ? { reply_markup: replyMarkup } : {})
  });
}

async function editMessage(
  chatId: number,
  messageId: number,
  text: string,
  replyMarkup?: Record<string, unknown>
) {
  return telegram("editMessageText", {
    chat_id: chatId,
    message_id: messageId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    ...(replyMarkup ? { reply_markup: replyMarkup } : {})
  });
}

async function answerCallbackQuery(id: string, text?: string, showAlert = false) {
  return telegram("answerCallbackQuery", {
    callback_query_id: id,
    ...(text ? { text } : {}),
    show_alert: showAlert
  });
}

function quizMarkup(index: number) {
  const item = QUIZ[index];
  return {
    inline_keyboard: [
      ...item.options.map((option, optionIndex) => [
        {
          text: `${String.fromCharCode(65 + optionIndex)}. ${option}`,
          callback_data: `quiz-answer:${index}:${optionIndex}`
        }
      ]),
      [{ text: "⬅️ Bosh menyu", callback_data: "menu:home" }]
    ]
  };
}

async function showQuiz(chatId: number, messageId: number | undefined, index: number) {
  const safeIndex = Math.max(0, Math.min(index, QUIZ.length - 1));
  const item = QUIZ[safeIndex];
  const text = `🧠 <b>Viktorina ${safeIndex + 1}/${QUIZ.length}</b>\n\n${item.q}`;

  if (messageId) {
    await editMessage(chatId, messageId, text, quizMarkup(safeIndex));
  } else {
    await sendMessage(chatId, text, quizMarkup(safeIndex));
  }
}

async function showContent(chatId: number, messageId: number, key: MenuKey) {
  const pages = CONTENT[key];
  await editMessage(chatId, messageId, pages[0], BACK_MENU);

  for (let i = 1; i < pages.length; i++) {
    await sendMessage(chatId, pages[i], i === pages.length - 1 ? BACK_MENU : undefined);
  }
}

function isMenuKey(value: string): value is MenuKey {
  return Object.prototype.hasOwnProperty.call(CONTENT, value);
}

export async function handleTelegramUpdate(update: TelegramUpdate) {
  if (update.callback_query) {
    const callback = update.callback_query;
    const data = callback.data ?? "";
    const msg = callback.message;

    if (!msg) {
      await answerCallbackQuery(callback.id);
      return;
    }

    if (data === "menu:home") {
      await answerCallbackQuery(callback.id);
      await editMessage(msg.chat.id, msg.message_id, START_TEXT, MAIN_MENU);
      return;
    }

    if (data.startsWith("menu:")) {
      const key = data.slice(5);
      await answerCallbackQuery(callback.id);
      if (isMenuKey(key)) {
        await showContent(msg.chat.id, msg.message_id, key);
      }
      return;
    }

    if (data.startsWith("quiz:")) {
      const index = Number(data.split(":")[1]) - 1;
      await answerCallbackQuery(callback.id);
      await showQuiz(msg.chat.id, msg.message_id, Number.isFinite(index) ? index : 0);
      return;
    }

    if (data.startsWith("quiz-answer:")) {
      const [, rawIndex, rawAnswer] = data.split(":");
      const index = Number(rawIndex);
      const answer = Number(rawAnswer);
      const item = QUIZ[index];

      if (!item) {
        await answerCallbackQuery(callback.id, "Savol topilmadi.", true);
        return;
      }

      const correct = answer === item.correct;
      await answerCallbackQuery(
        callback.id,
        correct ? `✅ To‘g‘ri! ${item.note}` : `❌ Noto‘g‘ri. ${item.note}`,
        true
      );

      const nextIndex = index + 1;
      const keyboard =
        nextIndex < QUIZ.length
          ? {
              inline_keyboard: [
                [{ text: "Keyingi savol ➡️", callback_data: `quiz:${nextIndex + 1}` }],
                [{ text: "⬅️ Bosh menyu", callback_data: "menu:home" }]
              ]
            }
          : {
              inline_keyboard: [
                [{ text: "🔁 Qayta boshlash", callback_data: "quiz:1" }],
                [{ text: "⬅️ Bosh menyu", callback_data: "menu:home" }]
              ]
            };

      await editMessage(
        msg.chat.id,
        msg.message_id,
        `${correct ? "✅" : "❌"} <b>${correct ? "To‘g‘ri javob" : "Javob tekshirildi"}</b>\n\n${item.note}`,
        keyboard
      );
      return;
    }

    await answerCallbackQuery(callback.id);
    return;
  }

  if (update.message) {
    const chatId = update.message.chat.id;
    const text = (update.message.text ?? "").trim();

    if (text === "/start" || text === "/help" || text === "" || text.startsWith("/")) {
      await sendMessage(chatId, START_TEXT, MAIN_MENU);
      return;
    }

    const normalized = text.toLowerCase();

    if (normalized.includes("shum bola")) {
      await sendMessage(chatId, CONTENT.shumbola[0], BACK_MENU);
      return;
    }

    if (normalized.includes("muzey")) {
      await sendMessage(chatId, CONTENT.museum[0], BACK_MENU);
      return;
    }

    if (normalized.includes("asar") || normalized.includes("ijod")) {
      for (const page of CONTENT.works) {
        await sendMessage(chatId, page, BACK_MENU);
      }
      return;
    }

    await sendMessage(
      chatId,
      "Men hozircha menyu va kalit so‘zlar orqali ishlayman. Kerakli bo‘limni tanlang 👇",
      MAIN_MENU
    );
  }
}
