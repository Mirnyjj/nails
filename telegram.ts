const baseUrl = `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID!}/`;

export const sendAppointmentMessage = async (formData: {
  name: string;
  phone: string;
  service?: string;
  date?: string;
  message?: string;
  source?: string;
}): Promise<void> => {
  const { name, phone, service, date, message, source = "Сайт" } = formData;

  if (
    !process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID ||
    !process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID
  ) {
    throw new Error("Telegram настройки не установлены");
  }

  const serviceTitle = service || "Не выбрана";
  const dateFormatted = date
    ? new Date(date).toLocaleDateString("ru-RU")
    : "Не указана";

  const messageText = `
🎯 *Новая заявка на запись*

👤 *Имя:* ${name}
📱 *Телефон:* ${phone}
💅 *Услуга:* ${serviceTitle}
📅 *Дата:* ${dateFormatted}
💬 *Комментарий:*
${message || "Без комментария"}

📍 *Источник:* ${source}
⏰ *Время:* ${new Date().toLocaleString("ru-RU")}
  `.trim();

  const encodedMessage = encodeURIComponent(messageText);
  const url = `${baseUrl}sendMessage?chat_id=${process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID}&text=${encodedMessage}&parse_mode=Markdown`;

  const response = await fetch(url);
  const result = await response.json();

  if (!result.ok) {
    throw new Error(`Telegram API: ${result.description}`);
  }
};
