const Discord = require('discord.js')
const { stripIndents } = require('common-tags')
String.prototype.capitalize = function() {
	this.charAt(0).toUpperCase() + this.slice(1);
}

// Galiba anlamadınız :) Üstteki kod kategorilerin ilk harfinin büyük olmasını sağlar.

exports.run = (client, message, args) => {
	if (!args[0]) {
		const help = {}
		bot.commands.forEach((command) => {
			const cat = command.conf.kategori;
			if (!help.hasOwnProperty(cat)) help[cat] = [];
			help[cat].push(command);
		})
		var str = ''
		var cmds = ''
		for (const kategori in help) {
			for (const command of help[kategori]) {
				cmds += `\`${command.help.komut}\` `
			}
			var str += `**${kategori.capitalize()}** ${cmds}\n\n`
		}

		// Galiba bunuda anlamadınız. Burada istediğiniz kategoriyi tek tek yazdırıyoruz.

		const embed = new Discord.RichEmbed()
			.setAuthor(`${client.user.username} Komutları`)
			.setDescription(`= Komut Listesi =\n[Komut hakkında bilgi için ${client.ayarlar.prefix}yardım <komut adı>]\n${str}`)
			.setTimestamp()
			.setColor(client.ayarlar.renk)
		message.channel.send({embed})
		return
	}
	try {
		let command = args[0]
		if (client.commands.has(command)) {
			command = client.commands.get(command)
			const embed = new Discord.RichEmbed()
				.addField('Komut', command.help.komut, false)
				.addField('Açıklama', command.help.aciklama, false)
				if (command.conf.permLevel === 0) {
					embed.addField('Kullanabilmek için Gerekli Yetki', `Yetki gerekmiyor. (0)`)
				}
				if (command.conf.permLevel === 1) {
					embed.addField('Kullanabilmek için Gerekli Yetki', `Mesajları Yönet yetkisi gerekiyor. (1)`)
				}
				if (command.conf.permLevel === 2) {
					embed.addField('Kullanabilmek için Gerekli Yetki', `Üyeleri At yetkisi gerekiyor. (2)`)
				}
				if (command.conf.permLevel === 3) {
					embed.addField('Kullanabilmek için Gerekli Yetki', `Yönetici yetkisi gerekiyor. (3)`)
				}
				if (command.conf.permLevel === 4) {
					embed.addField('Kullanabilmek için Gerekli Yetki', `Bot geliştiricisi olman gerekiyor. (4)`)
				}
				embed.addField('Doğru Kullanım', client.ayarlar.prefix + command.help.kullanim)
				.addField('Alternatifler', command.conf.aliases.join(', '))
				.setTimestamp()
				.setColor(client.ayarlar.renk)
			message.channel.send({embed})
		} else {
			const embed = new Discord.RichEmbed()
				.setDescription(`${args[0]} diye bir komut bulunamadı. Lütfen geçerli bir komut girin. Eğer komutları bilmiyorsanız ${client.ayarlar.prefix}yardım yazabilirsiniz.`)
				.setTimestamp()
				.setColor(client.ayarlar.renk)
			message.channel.send({embed})
		}
	} catch (err) {
		let command = args[0]
		if (client.commands.has(command)) {
			command = client.commands.get(command)
			const embed = new Discord.RichEmbed()
				.addField('Komut', command.help.komut, false)
				.addField('Açıklama', command.help.aciklama, false)
				if (command.conf.permLevel === 0) {
					embed.addField('Kullanabilmek için Gerekli Yetki', `Yetki gerekmiyor. (0)`)
				}
				if (command.conf.permLevel === 1) {
					embed.addField('Kullanabilmek için Gerekli Yetki', `Mesajları Yönet yetkisi gerekiyor. (1)`)
				}
				if (command.conf.permLevel === 2) {
					embed.addField('Kullanabilmek için Gerekli Yetki', `Üyeleri At yetkisi gerekiyor. (2)`)
				}
				if (command.conf.permLevel === 3) {
					embed.addField('Kullanabilmek için Gerekli Yetki', `Yönetici yetkisi gerekiyor. (3)`)
				}
				if (command.conf.permLevel === 4) {
					embed.addField('Kullanabilmek için Gerekli Yetki', `Bot geliştiricisi olman gerekiyor. (4)`)
				}
				embed.addField('Doğru Kullanım', client.ayarlar.prefix + command.help.kullanim)
				.addField('Alternatifler', 'Bulunmuyor')
				.setTimestamp()
				.setColor(client.ayarlar.renk)
			message.channel.send({embed})
		} else {
			const embed = new Discord.RichEmbed()
				.setDescription(`${args[0]} diye bir komut bulunamadı. Lütfen geçerli bir komut girin. Eğer komutları bilmiyorsanız ${client.ayarlar.prefix}yardım yazabilirsiniz.`)
				.setTimestamp()
				.setColor(client.ayarlar.renk)
			message.channel.send({embed})
		}
	}
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['h', 'halp', 'help', 'y', 'komutlar'],
	permLevel: 0,
	kategori: 'bot'
}

exports.help = {
	name: 'yardım',
	description: 'Tüm komutları gösterir.',
	usage: 'yardım [komut]'
}
