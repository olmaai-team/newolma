const { Telegraf, Markup } = require('telegraf');

// Замените 'YOUR_BOT_TOKEN' на токен вашего бота от BotFather
const BOT_TOKEN = '7699040309:AAGhOPurVUjluHqlhyfWD2BriB_WERw4jj4';
const bot = new Telegraf(BOT_TOKEN);

// Команда /start
bot.start((ctx) => {
    const welcomeText = `👋 Привет, ${ctx.from.first_name}!

Добро пожаловать в OlmaGPT бот! 

Для полного доступа ко всем функциям и удобного использования, пожалуйста, перейдите в веб-версию бота:
👉 t.me/OlmaGPT_bot/olmagpt

Там вас ждет расширенный функционал и более комфортный интерфейс!`;

    ctx.reply(welcomeText);
});

// Команда /id
bot.command('id', (ctx) => {
    const userId = ctx.from.id;
    const chatId = ctx.chat.id;

    let messageText = `🆔 Ваши идентификаторы:\n\n`;
    messageText += `👤 Ваш ID: <code>${userId}</code>\n`;
    messageText += `💬 ID чата: <code>${chatId}</code>`;

    ctx.reply(messageText, {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
            Markup.button.callback('📋 Скопировать мой ID', `copy_${userId}`)
        ])
    });
});

// Обработка нажатия кнопки копирования
bot.action(/copy_(\d+)/, (ctx) => {
    const userId = ctx.match[1];

    // Показываем уведомление о копировании
    ctx.answerCbQuery(`ID ${userId} скопирован в буфер обмена!`, {
        show_alert: false
    });

    // Отправляем сообщение с ID для легкого копирования
    ctx.reply(`📋 Для копирования выделите этот текст:\n\n<code>${userId}</code>`, {
        parse_mode: 'HTML'
    });
});

// Обработка ошибок
bot.catch((err, ctx) => {
    console.error(`Ошибка для ${ctx.updateType}:`, err);
    ctx.reply('❌ Произошла ошибка. Пожалуйста, попробуйте позже.');
});

// Запуск бота
bot.launch()
    .then(() => {
        console.log('🤖 Бот успешно запущен!');
    })
    .catch((err) => {
        console.error('❌ Ошибка запуска бота:', err);
    });

// Корректное завершение работы
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));