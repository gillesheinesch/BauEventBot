const Discord = require('discord.js');
exports.run = (client, msg, args) => {
	if (!msg.member.hasPermission('BAN_MEMBERS')) return msg.reply('You dont have permissions to execute this command!');
	let reason = args.slice(1).join(' ');
	let user = msg.mentions.users.first();
	let modlog = msg.guild.channels.find('name', 'mod-log');

	if (!user) return msg.reply('Du musst einen User zum Bannen markieren.');
	if (!reason) return msg.reply('Du musst einen Grund für den Ban angeben.');
	if (!modlog) return msg.reply('Ich konnte den #mod-log Channel nicht finden.');

	if (!msg.guild.member(user).bannable) return msg.reply('Ich kann diesen User nicht bannen!');
	msg.guild.ban(user, 2);

	const embed = new Discord.RichEmbed()
		.setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL())
		.setThumbnail(user.displayAvatarURL())
		.setColor('#FF0000')
		.setTimestamp()
		.setDescription(`**Aktion**: Ban \n**User**: ${user.username}#${user.discriminator} (${user.id}) \n**Grund**: ${reason}`);

	user.send({ embed });
	return client.channels.get(modlog.id).send({ embed });
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 2
};
exports.help = {
	name: 'ban',
	description: 'Bannt einen User vom Discord Server mit einem bestimmten Grund',
	usage: 'ban @USER {GRUND}',
	example: 'ban @Kevin Respektloses Verhalten',
	category: 'administration'
};

