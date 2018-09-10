const Discord = require('discord.js')
const moment = require('moment');
require('moment-duration-format');

exports.run = async (client, message, args) => {
	const owner = await client.fetchApplication()
	const aylar = {
		"01": "Ocak",
		"02": "Şubat",
		"03": "Mart",
		"04": "Nisan",
		"05": "Mayıs",
		"06": "Haziran",
		"07": "Temmuz",
		"08": "Ağustos",
		"09": "Eylül",
		"10": "Ekim",
		"11": "Kasım",
		"12": "Aralık"
	}
	const duration = moment.duration(client.uptime).format(" D [gün] H [saat] m [dakika] s [saniye boyunca kesintisiz çalışıyor]")
	var helpers = 'Bulunmuyor'

	if(client.ayarlar.yardimcilar[0]) {
		for (var i = 0; i < client.ayarlar.yardimcilar.length; i++) {
			var şuanki = client.users.get(client.ayarlar.yardimcilar[i]).tag;
			if (i === 0) {
				helpers += şuanki
			}
			else if (i === client.ayarlar.yardimcilar.length - 1) {
				helpers += " ve " + şuanki;
			} else {
				helpers += ", " + şuanki
			}
		}
	}

	var destek = 'Bulunmuyor'
	if(client.ayarlar.destek !== "") var destek = `[Destek Sunucusuna Katıl!](http://${client.ayarlar.destek})`;
	var site = 'Bulunmuyor'
	if(client.ayarlar.site !== "") var site = `[Siteye Uçuşa Geç!](http://${client.ayarlar.site})`;

	const embed = new Discord.RichEmbed()
		.setAuthor(`${client.user.username} | Bilgi ve İstatistikler`)
		.addField('Bot Sahibi', owner.user.tag, false)
		.addField('Bot Geliştiricileri', helpers, false)
		.addField('Komut Sayısı', client.commands.size, true)
		.addField('Ön-Ek/Prefix', client.ayarlar.prefix, true)
		.addField('Sürümler', `**Bot:** v${client.ayarlar.surum}\n**Discord.JS:** v${Discord.version}\n**Node.JS**: ${process.version}`, true)
		.addField('Veriler', `**Müzik Çalan Sunucu Sayısı:** ${client.voiceConnections.size.toLocaleFormat()}\n**Kullanıcı Sayısı:** ${client.users.size.toLocaleFormat()}\n**Sunucu Sayısı:** ${client.guilds.size.toLocaleFormat()}\n**Kanal Sayısı:** ${client.channels.size.toLocaleFormat()}`, true)
		.addField('Çalışma Süresi', `${duration}...`, false)
		.addField('Açılış Tarihi', `${moment(client.user.createdAt).format('DD')} ${kur[moment(client.user.createdAt).format('MM')]} ${moment(client.user.createdAt).format('YYYY h:mm:ss')}`, false)
		.addField("Botun Özel Linkleri", `[Sunucuna Ekle!](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) | ${destek} | ${site}`)
		.setTimestamp()
		.setColor(client.ayarlar.renk)
	message.channel.send({embed})
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['i', 'bilgi', 'botbilgi', 'yapımcım', 'yapımcı', 'yapimcim', 'yapimci', 'istatistik', 'istatistikler'],
	permLevel: 0,
	kategori: 'bot'
}

exports.help = {
	komut: 'hakkında',
	aciklama: 'Bot hakkında bilgi verir.',
	kullanim: 'hakkında'
}
