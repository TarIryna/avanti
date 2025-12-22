export const sendTelegramMessage = async (text) => {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

      const isLocalhost =
    process.env.NEXTAUTH_URL?.includes("localhost")

    if (!token || !chatId) {
      throw new Error("Telegram env variables are missing");
    }

    if (isLocalhost){
      return {message: 'Is local dev'}
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Telegram API error: ${errorText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to send Telegram message:", error);
    return null; // чтобы приложение не падало
  }
};
