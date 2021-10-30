const { findWelcome } = require('../models.js')
const { MessageEmbed } = require('discord.js');


module.exports = {
    name: 'guildMemberAdd',
    async execute(client) {
        const guildId = client.guild.id;
        const channelId = await findWelcome(guildId);
        if (channelId) {
            const embed = new MessageEmbed()
                .setColor('#EFFF00')
                .setTitle("New member joined")
                .setImage(client.displayAvatarURL())
                .addFields(
                    { name: 'Member', value: `${client} joined this server` },
                );
            client.guild.channels.fetch(channelId.substring(2, 20))
                .then(obj => obj.send({ embeds: [embed] }))
                .catch(error => obj.send(error))



        }

    },
};
