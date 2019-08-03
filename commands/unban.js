const Discord = require('discord.js');
exports.run = async(client, msg, args) => {
	if (!msg.member.hasPermission('BAN_MEMBERS')) return msg.reply('You dont have permissions to execute this command!');
	let reason = args.slice(1).join(' ');
	client.unbanReason = reason;
	client.unbanAuth = msg.author;
	let user = args[0];
	let modlog = msg.guild.channels.find('name', 'mod-log');

	if (!user) return msg.reply('Du musst den Usernamen + Discord ID vom gebannten User angeben um ihn zu entbannen!');
	if (!reason) return msg.reply('Du musst einen Grund für den UnBan angeben!');
	if (!modlog) return msg.reply('Ich kann keinen Mod-Channel finden!');

	user = await msg.guild.unban(user);

	const embed = new Discord.RichEmbed()
		.setAuthor(`${msg.author.username}#${msg.author.discriminator}`, user.displayAvatarURL())
		.setThumbnail(user.displayAvatarURL())
		.setColor(0x00AE86)
		.setTimestamp()
		.setDescription(`**Aktion**: Unban \n**User**: ${user.username}#${user.discriminator} (${user.id}) \n**Grund**: ${reason}`);

	return client.channels.get(modlog.id).send({ embed: embed });
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 2
};
exports.help = {
	name: 'unban',
	description: 'Entbannt einen User',
	usage: 'unban {EINDEUTIGE ID DES USERS} {GRUND}',
	example: 'unban 238590234135101440 Fehlban',
	category: 'administration'
};
