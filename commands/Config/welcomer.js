const { SlashCommandBuilder } = require('@discordjs/builders');
const { saveWelcome } = require('../../models.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('welcomer')
        .setDescription('default welcome channel when someone joins this server')
        .addChannelOption(option => option.setName('destination').setDescription('Select a channel').setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply();
        const channel = String(interaction.options.getChannel('destination'));
        await saveWelcome(interaction.channel.guildId, channel);
        await interaction.editReply(`Set ${channel} as welcomer channel `);
    },
};