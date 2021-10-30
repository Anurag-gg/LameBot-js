const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');


const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ud')
        .setDescription('finds  meaning of a word in urban-dictionary')
        .addStringOption(option => option.setName('word').setDescription('enter a word').setRequired(true)),



    async execute(interaction) {
        await interaction.deferReply();
        const word = interaction.options.getString('word')
        const { list } = await fetch(`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${word}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
                "x-rapidapi-key": "2c1f383f4cmsh2b7aaaaedc2c4b3p1ff3a9jsnfd0be5ed9013"
            }
        })
            .then(response =>
                response.json()
            );
        const [answer] = list;
        const embed = new MessageEmbed()
            .setColor('#EFFF00')
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .addFields(
                { name: 'Definition', value: trim(answer.definition, 1024) },
                { name: 'Example', value: trim(answer.example, 1024) },
                { name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` },
            );

        interaction.editReply({ embeds: [embed] });

    },
};