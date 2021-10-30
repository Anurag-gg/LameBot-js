const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('shows bot ping'),

    async execute(interaction) {
        await interaction.reply(`${interaction.createdAt - Date.now()}ms`);
    },
};