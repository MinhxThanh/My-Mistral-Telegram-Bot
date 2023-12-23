const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const telegramToken = '6540362186:AAF0m_P8lI5_GrEU7hbBnnfrA4eDGpNt7BM';
const cloudflareToken = 'O0JXe_e8AuW2eG9_JGovO8aRJ1xDZeYzYyRDP8sQ';

const bot = new TelegramBot(telegramToken, {
    polling: true
});

console.log('Loaded success..')

bot.on('message', async (msg) => {
    console.log('-----------------------------------------')
    try {
        const chatId = msg.chat.id;
        const userMessage = msg.text;

        console.log('User: ' + userMessage);

        const response = await axios.post('https://api.cloudflare.com/client/v4/accounts/d888e02cee618e93b19cd9e7717da715/ai/run/@cf/meta/llama-2-7b-chat-int8', {
            prompt: userMessage
        }, {
            headers: {
                'Authorization': `Bearer ${cloudflareToken}`
            }
        });

        const aiResponse = response.data.result.response;

        await bot.sendMessage(chatId, aiResponse);
        console.log('');
        console.log('Bot response: ' + aiResponse);
    } catch (error) {
        console.error('Error occurred:', error);
        // Optionally send a message back to the user that an error occurred
        await bot.sendMessage(msg.chat.id, "An error occurred while processing your message.");
    }
});
