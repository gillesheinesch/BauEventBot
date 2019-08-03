const Discord = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
exports.run = (client, msg, args) => {
	const uptimeserver = moment.duration(client.uptime).format('d[ days], h[ hours], m[ minutes and ]s[ seconds]');
	const embed = new Discord.RichEmbed()
        .setAuthor('BauEventBot', msg.guild.iconURL)
        .setColor('#0066CC')
        .addField('‼ Interesse an einem Discord Bot? Hier:', 'http://bit.ly/2iraiZ9')
        .addField(`🖱 Prefix`, 'Alle Befehle werden mit folgendem Prefix ausgeführt: `?`')
        .addField(`⏳ Laufzeit seit dem letzten Restart`, `${uptimeserver}`)
        .addField(`📡 Statistiken über den Bot`, `Online auf dem BauEvent Discord Server für ${client.users.size} User`)
        .addField(`🇩🇪 Bot Sprache`, `Deutsch`)
        .addField(`👤 Programmierer des Bots`, `Monkeyyy11#7584`);

	msg.channel.send({ embed });
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: []
};
exports.help = {
	name: 'botinfo',
	description: 'Informationen über den Discord-Bot',
    usage: 'botinfo',
    example: 'botinfo',
	category: 'utility'
};
