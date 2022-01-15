module.exports = {
    readOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'KK', callback_data: 'Kuran'}, {text: 'CVS', callback_data: 'Cevsen'}],
                [{text: 'RIS', callback_data: 'Risale'}, {text: 'KIT', callback_data: 'Kitap'}],
            ]
        })
    },

    readAgain: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Read again', callback_data:'/again'}],
            ]
        })
    }

}