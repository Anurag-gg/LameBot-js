const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('kicks an user')
        .addUserOption(option => option.setName('target').setDescription('Select a user to kick').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Enter kick reason')),


    async execute(interaction) {

        user = interaction.options.getUser('target');
        reason = interaction.options.getString('reason') || "No reason provided";
        await interaction.guild.members.kick(user, { reason: reason });
        await interaction.reply(`kicked ${user}\nReason: ${reason}`);


    },
};