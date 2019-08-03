const Discord = require('discord.js');
exports.run = (client, msg, args) => {
    const config = require('../settings.json');
	const margs = msg.content.split(" ");
	const commandNames = Array.from(client.commands.keys());
	const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
	const embed = new Discord.RichEmbed()
    .setColor('#0066CC');

    msg.channel.send(`${client.commands.filter(c => c.conf.enabled === true).map(cmd => `${config.prefix}${cmd.help.name}${' '.repeat(longest - cmd.help.name.length)} :: ${cmd.help.description}`).join("\n")}`, { code:'asciidoc' });
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: []
};
exports.help = {
	name: 'help',
	description: 'Alle verfügbaren Befehle des Discord Bots',
	usage: 'help',
	example: 'help',
	category: 'help'
};

