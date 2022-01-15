const TelegramApi = require('node-telegram-bot-api')

const  {readOptions, readAgain} = require('./options')

const token = '5051324804:AAFV7Zw_ktcfophRcdKb0QJGIqrz3J8f9XY'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const readBook = async (chatId) => {
    await bot.sendMessage(chatId, 'Start read book for 10 minutes');
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await  bot.sendMessage(chatId, 'Choose book to read', readOptions);
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Start bot for competition'},
        {command: '/info', description: 'Information about this bot'},
        {command: '/read', description: 'Choose a book'},
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if(text === '/start'){
            return  bot.sendMessage(chatId, 'Bismillah. Welcome to challenge ${msg.from.first_name}');
        }
        if(text === '/info'){
            await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/4d6/8ea/4d68eab6-b229-358b-8d46-e5da083d2f40/27.jpg')
            return  bot.sendMessage(chatId, `This bot will help you to achieve your goals.`);
        }
        if(text === '/read'){
           return readBook(chatId);
        }
        return bot.sendMessage(chatId, 'I dont understand you, please repeat command.');
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return readBook(chatId);
        }
        if(data === chats[chatId]){
            return  bot.sendMessage(chatId, 'You start to read ${chats[chatId}', readAgain)
        } else {
            return bot.sendMessage(chatId,'You completed book', readAgain);
        }
    })

}

start()