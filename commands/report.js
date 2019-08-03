const Discord = require('discord.js');
exports.run = async(client, msg, args) => {
    var array = [];
    const input = args.slice();

    if (!input || input.length === 0) return msg.channel.send('Du musst mehr Informationen zu deinem Report angeben.');
    if (msg.attachments.size !== 0) return msg.channel.send('Du kannst keine Anhänge bei deiner Meldung anhängen. Wir würden dich bitten den Screenshot oder das Video auf einer Platform wie www.imgur.com hochzuladen! Vielen Dank!');
    if (input.length < 4) return msg.channel.send('Wir würden dich bitten mehr Informationen zu deinem Report anzugeben!');
		msg.channel.send('Der Report wurde erfolgreich an das Event Moderationsteam weitergegeben!');

	const embed = new Discord.RichEmbed()
        .setColor('#669900')
        .addField(`Meldung`, input.join(" "))
		.setAuthor(msg.author.tag, msg.author.displayAvatarURL);


        var channel = client.channels.get('346599901913677844');
		var message = await channel.send({ embed });
		
		await message.react('👍');
		await message.react('👎');

		var collector = message.createReactionCollector((reaction, user) => reaction.emoji.name === '👍' || reaction.emoji.name === '👎');
		collector.on('collect', r => {
			if (r.emoji.name === '👍' && r.count >= 2) {
                    msg.member.send('Vielen Dank für deinen Report! Wir haben uns erfolgreich um deinen Report gekümmert und wünschen dir weiterhin viel Spaß! \n\n- GommeHD.net Team');
        
							var acceptedembed = new Discord.RichEmbed()
                            .setColor('#669900')
                            .addField(`Meldung`, input.join(" "))
							.setAuthor(msg.author.tag, msg.author.displayAvatarURL);

							const archive = msg.guild.channels.get('346600365514293251');
							archive.send({ embed: acceptedembed });
					message.delete();
				  } else if (r.emoji.name === '👎' && r.count >= 2) {
					msg.member.send('Vielen Dank für deinen Report! Wir konnten leider keinen Regelverstoß feststellen und haben deinen Report daher abgelehnt. Wir wünschen dir trotzdem weiterhin viel Spaß! \n\n- GommeHD.net Team');

							var deniedembed = new Discord.RichEmbed()
                            .setColor('#669900')
                            .addField(`Meldung`, input.join(" "))
							.setAuthor(msg.author.tag, msg.author.displayAvatarURL);


								const archive = msg.guild.channels.get('346600365514293251');
								archive.send({ embed: deniedembed });
					message.delete();
				}
		});
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	userpermissions: []
};
exports.help = {
	name: 'report',
	description: 'Erstellt einen Report für die Event Moderation',
	usage: 'report {Text}',
	example: ['report Auf dem Plot von Kevin wurde ein Hakenkreuz gebaut'],
	botpermissions: ['SEND_MESSAGES']
};
