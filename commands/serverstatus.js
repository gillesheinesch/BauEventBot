const Discord = require('discord.js');
exports.run = async(client, msg, args) => {
	const ping = require('mc-hermes');
	const x = await ping.pc({ 
		server: 'gommehd.net'
	});

	const embed = new Discord.RichEmbed()
	.setDescription(`GommeHD.net Server ist online! \n\n${x.players.online}/${x.players.max}`)
	.setAuthor('Bauevent Bot');

	msg.channel.send({embed});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: []
};
exports.help = {
	name: 'serverstatus',
	description: 'Status des GommeHD.net Server',
    usage: 'serverstatus',
    example: 'serverstatus',
	category: 'utility'
};
