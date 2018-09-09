const Discord = require('discord.js')

exports.run = async (client, message, args) => {
	const msg = await message.channel.send("Bekle biraz. Gerekli verileri hesaplıyorum... 🤔");
	var ping = Math.round(message.createdTimestamp - msg.createdTimestamp)

	if(ping < 0) {
		var ping = Math.round(message.createdTimestamp - msg.createdTimestamp)
	}

	message.channel.send(`Mesaj gecikme süresi: ${ping} milisaniye\nBot gecikme süresi: ${client.ping} milisaniye`)
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 0,
	kategori: 'kullanıcı'
}

exports.help = {
	komut: 'ping',
	aciklama: 'Botun gecikme süresini gösterir.',
	kullanim: 'ping'
}
