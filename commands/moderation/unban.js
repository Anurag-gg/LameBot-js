const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('unbans an user')
        .addUserOption(option => option.setName('target').setDescription('Select a user to unban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Enter unban reason')),


    async execute(interaction) {

        user = interaction.options.getUser('target');
        reason = interaction.options.getString('reason') || "No reason provided";
        await interaction.guild.members.unban(user, { reason: reason });
        await interaction.reply(`unbanned ${user}\nReason: ${reason}`);



    },
};