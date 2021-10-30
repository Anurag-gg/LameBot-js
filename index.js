const { Client, Intents, Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { token, clientId, guildId } = require('./config.json');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const commands = [];

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES] });
client.command = new Collection();

//registering slash commands
async function init() {
	const directories = fs.readdirSync('commands');
	directories.forEach(directory => {
		commandFiles = fs.readdirSync('commands/' + directory);
		for (const file of commandFiles) {
			command = require(`./commands/${directory}/${file}`);
			// Set a new item in the Collection
			// With the key as the command name and the value as the exported module
			client.command.set(command.data.name, command);
			commands.push(command.data.toJSON());
		}
	})
}

init();

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);


//Dynamically executing slash commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.command.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		await interaction.reply({ content: `${error}`, ephemeral: true });

	}

});


//dynamically executing events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Login to Discord with your client's token
client.login(token);


