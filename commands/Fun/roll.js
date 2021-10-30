const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('rolls a number')
        .addIntegerOption(option => option.setName('range').setDescription('enter a range')),

    async execute(interaction) {
        const integer = interaction.options.getInteger('range') || 6;

        await interaction.reply(`${Math.floor(Math.random() * integer + 1)}`);
    },
};