const { findCensor } = require('../models.js')


module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot)
            return
        const words = await findCensor(message.guildId)
        if (words) {
            words.forEach(async element => {
                if (message.content.indexOf(element) !== -1) {
                    await message.channel.send(`Hey ${message.author} that word is censored `)
                    await message.delete()
                    return

                }

            });
        }

    },
};
