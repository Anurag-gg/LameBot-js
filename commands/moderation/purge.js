const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('purges the desired amount of messages')
        .addNumberOption(option => option.setName('number').setDescription('Enter number of messages to purge')),



    async execute(interaction) {
        number = interaction.options.getNumber('number') || 5;
        await interaction.channel.bulkDelete(number, true);
        await interaction.reply(`deleted ${number}  messages`);

    },
};