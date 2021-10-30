const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');


const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);


module.exports = {
    data: new SlashCommandBuilder()
        .setName('translate')
        .setDescription('translates text to english')
        .addStringOption(option => option.setName('word').setDescription('enter sentence to be translated').setRequired(true)),



    async execute(interaction) {
        await interaction.deferReply();
        const word = interaction.options.getString('word')
        const list = await fetch(`https://nlp-translation.p.rapidapi.com/v1/translate?text=${word}&to=en`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "nlp-translation.p.rapidapi.com",
                "x-rapidapi-key": "2c1f383f4cmsh2b7aaaaedc2c4b3p1ff3a9jsnfd0be5ed9013"
            }
        })
            .then(response =>
                response.json()
            );

        const embed = new MessageEmbed()
            .setColor('#EFFF00')
            .setURL(list.permalink)
            .addFields(
                { name: 'Original Text', value: trim(list.original_text, 1024) },
                { name: 'Translated Text', value: trim(list.translated_text.en, 1024) },
            );




        interaction.editReply({ embeds: [embed] });

    },
};