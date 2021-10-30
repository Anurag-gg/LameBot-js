const { SlashCommandBuilder } = require('@discordjs/builders');
const { saveCensor } = require('../../models.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('censor')
        .setDescription('add a word to censor')
        .addStringOption(option => option.setName('censored').setDescription('Enter the word').setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply();
        const word = String(interaction.options.getString('censored'));
        await saveCensor(interaction.channel.guildId, word);
        await interaction.editReply(`**${word}** has been censored`);
    },
};