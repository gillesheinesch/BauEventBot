exports.run = async(client, msg, args) => {
	const Discord = require('discord.js');

	const fragen = ['Kann man mit WorldEdit und VoxelSniper arbeiten?',
	'Ich bin fertig! Wie kann ich mein Plot zur Bewertung einreichen?',
	'Ich mag mein Plot nicht, kann man mir ein neues Plot geben?',
	'Wann schaut ihr euch mein Plot an?',
	'Ein User hat etwas verbrochen. Was soll ich tun?',
	'Gibt es einen permanenten Einladungslink für diesen Discord?'];

	const answers = ['Wir bieten grundlegende Funktionen mit WorldEdit an. VoxelSniper wird jedoch nicht zur Verfügung gestellt.',
	'Das geht mit dem Befehl /finish. Jedoch müssen Discordtag und Discordname angegeben werden \nBeispiel: /finish Deennis#3206',
	'Du kannst dein Plot mit /reset zurücksetzen.',
	'Nur mit der Ruhe, wir gehen alle Plots durch und deins wird auch schon kommen. Dann entscheiden die Event-Member, ob dein Plot weiterkommt.',
	'Für so etwas sind die Event-Moderatoren zuständig. Du kannst ihn am Event-Discord in #meldungen mit dazugehörigem Beweis und dem Befehl (?report) melden.',
	'Ja, es gibt einen. Hier: http://www.discord.io/bauevent'];
	
	var index = 0;

	const embed = new Discord.RichEmbed()
	.setDescription(fragen.map(frage => `**${++index} -** ${frage}`).join('\n'))
	.setColor('#009933')
	.setFooter('Wenn du weitere Informationen zu einer Frage haben möchtest, kannst du die Zahl eingeben die vor der Frage steht!')
	.setAuthor('BAUEVENT FAQ');

	msg.channel.send({ embed });

	try {
		var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < fragen.length + 1 && msg.author.id === msg2.author.id, {
			maxMatches: 1,
			time: 60000,
			errors: ['time']
		});
	} catch (err) {
		return msg.channel.send('Du hast keine Zahl eingegeben deswegen wurde der Befehl abgebrochen.');
	}

	const newembed = new Discord.RichEmbed()
	.setColor('#009933')
	.setDescription(answers[response.first().content - 1])
	.setAuthor(fragen[response.first().content - 1]);

	msg.channel.send({ embed: newembed });
};

exports.conf = {
	aliases: ['help', 'h'],
	enabled: true
};

exports.help = {
	name: 'faq',
	description: 'Auf häufig gestellte Fragen kannst du hier Antworten finden',
	usage: 'faq',
	example: 'faq'
};
