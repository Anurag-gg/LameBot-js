const { SlashCommandBuilder } = require('@discordjs/builders');
const { findCensor } = require('../../models.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('censorlist')
        .setDescription('shows the list of censored words in this guild'),

    async execute(interaction) {
        await interaction.deferReply();
        const words = await findCensor(interaction.channel.guildId)
        let template = ``;
        if (!words.length) {
            template = `This guild has no censored words`
        }
        else {
            words.forEach(element => {
                template += `${element}\n`

            });
        }
        const embed = new MessageEmbed()
            .setColor('#EFFF00')
            .setTitle("Censored words")
            .addFields(
                { name: 'List:', value: template },
            );
        interaction.editReply({ embeds: [embed] });

    },
};