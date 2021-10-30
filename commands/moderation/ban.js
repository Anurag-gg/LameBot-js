const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('bans an user')
        .addUserOption(option => option.setName('target').setDescription('Select a user to ban').setRequired(true))
        .addNumberOption(option => option.setName('days').setDescription('Enter ban duration in days'))
        .addStringOption(option => option.setName('reason').setDescription('Enter ban reason')),


    async execute(interaction) {

        user = interaction.options.getUser('target');
        days = interaction.options.getNumber('days') || 0;
        reason = interaction.options.getString('reason') || "No reason provided";
        await interaction.guild.members.ban(user, { days: days, reason: reason });
        await interaction.reply(`banned ${user} for ${days} days \nReason: ${reason}`);


    },
};