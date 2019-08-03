const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./settings.json');
const request = require('request');
const fs = require('fs');

client.on('guildMemberAdd', member => {
	const willkommenshalle = member.guild.channels.find('name', 'willkommenshalle');
	willkommenshalle.send(`Herzlich Willkommen ${member} auf dem BauEvent Discord Server. Was du alles hier auf diesem Discord machen kannst, findest du in <#300002534318145536>.\nSolltest du weitere Fragen haben, kannst du dich gerne in <#343365946305544192> melden! \n\nEine Liste aller Befehle kannst du mithilfe des ?help Befehls bekommen. (Bitte alle Bot Befehle im <#305280345115197441> Channel ausführen)`);
});

client.on('message', msg => {
	if (msg.author.bot) return;
	if (!msg.guild) return msg.reply('Du musst die Befehle auf dem BauEvent Discord Server ausführen!');
	var command = msg.content.split(" ")[0].slice(config.prefix.length).toLowerCase();
	var args = msg.content.split(" ").slice(1);
	let cmd;
	if (client.commands.has(command)) {
		cmd = client.commands.get(command);
	} else if (client.aliases.has(command)) {
		cmd = client.commands.get(client.aliases.get(command));
	}
	if (cmd) {
		cmd.run(client, msg, args);
	}
});

const ping = require('mc-hermes');

client.on('ready', async() => {
	const x = await ping.pc({ 
		server: 'gommehd.net'
	});

	console.log('Bauevent Discord Bot ready to search new Builder!');
	client.user.setPresence({ game: { name: `${x.players.online} Spieler online`, type: 0 } });
	client.user.setAvatar('https://cdn.discordapp.com/attachments/279954940367994880/401694513736843269/server-icon.png');
});

/* ERRORS HANDLING */
process.on('unhandledRejection', (reason) => {
	if (reason.name === 'DiscordAPIError') return;
	console.error(reason);
});
process.on('uncaughtException', (reason) => {
	console.error(reason);
});


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir(`./commands/`, (err, files) => {
	if (err) console.error(err);
	files.forEach(f=> {
		let props = require(`./commands/${f}`);
		client.commands.set(props.help.name, props);
		props.conf.aliases.forEach(alias => {
			client.aliases.set(alias, props.help.name);
		});
	});
});

client.login(config.token);
