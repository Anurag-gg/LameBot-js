const { SlashCommandBuilder } = require('@discordjs/builders');
const { delCensor } = require('../../models.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uncensor')
        .setDescription('removes word from censorlist')
        .addStringOption(option => option.setName('uncensored').setDescription('Enter the word').setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply();
        const word = String(interaction.options.getString('uncensored'));
        await delCensor(interaction.channel.guildId, word);
        await interaction.editReply(`**${word}** has been uncensored`);
    },
};