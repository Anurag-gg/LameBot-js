const { Sequelize, DataTypes, Model } = require('sequelize');
const { postgresUrl } = require('./config.json')

const sequelize = new Sequelize(postgresUrl);

class Welcome extends Model { }

Welcome.init({
    // Model attributes are defined here
    guildId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true

    },
    channel: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Welcome' // We need to choose the model name
});


class Censor extends Model { }

Censor.init({
    // Model attributes are defined here
    guildId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true

    },
    censored: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []

    }

}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Censor' // We need to choose the model name
});

async function findWelcome(guildId) {
    const channel = await Welcome.findAll({ where: { guildId: guildId } })
    if (channel.length)
        return channel[0]["dataValues"]["channel"]
    return ''

}

async function saveWelcome(guildId, channel) {
    await sequelize.sync();
    await Welcome.upsert({ guildId: guildId, channel: channel });

}

async function findCensor(guildId) {
    const bad = await Censor.findAll({ where: { guildId: guildId } });
    if (bad.length)
        return bad[0]["dataValues"]["censored"]
    return ''


}

async function saveCensor(guildId, word) {
    await sequelize.sync();
    //Object.entries(await findCensor(guildId)).length 
    const idk = await findCensor(guildId)
    if (idk instanceof Array)
        await Censor.update({ 'censored': sequelize.fn('array_append', sequelize.col('censored'), word) }, { 'where': { 'guildId': guildId } });
    else
        await Censor.create({ guildId: guildId, censored: [word] })

}

async function delCensor(guildId, word) {
    await sequelize.sync();
    if (Object.entries(await findCensor(guildId)).length)
        await Censor.update({ 'censored': sequelize.fn('array_remove', sequelize.col('censored'), word) }, { 'where': { 'guildId': guildId } });


}

module.exports = {
    findWelcome, saveWelcome, saveCensor, delCensor, findCensor
}





