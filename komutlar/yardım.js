const Discord = require('discord.js')
const { stripIndents } = require('common-tags')
String.prototype.capitalize = function() {
	this.charAt(0).toUpperCase() + this.slice(1);
}

// Galiba anlamadınız :) Üstteki kod kategorilerin ilk harfinin büyük olmasını sağlar.

exports.run = (client, message, args) => {
	if (!args[0]) {
		const help = {}
		client.commands.forEach((command) => {
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
			str += `**${kategori.capitalize()}** ${cmds}\n\n`
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
	let command = args[0]
	if (client.commands.has(command)) {
		command = client.commands.get(command)
		var yetki = command.conf.permLevel
			.replace(0, `Yetki gerekmiyor.`)
			.replace(1, `Mesajları Yönet yetkisi gerekiyor.`)
			.replace(2, `Üyeleri At yetkisi gerekiyor.`)
			.replace(3, `Yönetici yetkisi gerekiyor.`)
			.replace(4, `Bot sahibi yetkisi gerekiyor.`)
		const embed = new Discord.RichEmbed()
			.addField('Komut', command.help.komut, false)
			.addField('Açıklama', command.help.aciklama, false)
			.addField('Kullanabilmek için Gerekli Yetki', yetki)
			.addField('Doğru Kullanım', client.ayarlar.prefix + command.help.kullanim)
			.addField('Alternatifler', command.conf.aliases[0] ? command.conf.join(', ') : 'Bulunmuyor')
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
