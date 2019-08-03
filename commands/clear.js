const Discord = require('discord.js');
exports.run = function(client, msg, args) {
	let messagecount = parseInt(args.join(' '));
	if (messagecount > 100) return msg.reply('Du kannst nur 100 Nachrichten auf einmal löschen!!').then(m => m.delete({ timeout: 10000 }));
	if (messagecount < 2) return msg.reply('Du musst mindestens 2 Nachrichten löschen!').then(m => m.delete({ timeout: 10000 }));

	const embed = new Discord.RichEmbed()
		.setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL())
		.setThumbnail(user.displayAvatarURL())
		.setColor('#FF0000')
		.setTimestamp()
		.setDescription(`${messagecount} gelöscht!`);

	let modlog = msg.guild.channels.find('name', 'mod-log');
	client.channels.get(modlog.id).send({ embed });

	msg.channel.bulkDelete(messagecount);
	msg.channel.send(`${messagecount} Nachrichten wurden erfolgreich gelöscht! ✅`).then(m => m.delete({ timeout: 10000 }));
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['purge'],
	permLevel: 2
};
exports.help = {
	name: 'clear',
	description: 'Löscht für dich die X beliebigen Nachrichten die zuletzt gesendet wurden',
	usage: 'clear {ANZAHL}',
	example: 'clear 50',
	category: 'administration'
};
