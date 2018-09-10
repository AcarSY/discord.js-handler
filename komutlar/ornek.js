const Discord = require('discord.js') // Öncelikle Discord'u kullanmasını sağlıyoruz.

exports.run = async (client, message, args) => { // Burada async'yi silsenizde olur fakat async olması daha sağlıklı olur çünkü kodda await kullanılırsa async gerekir.
	const embed = new Discord.RichEmbed() // Embed kullanacağımızı belirtiyoruz.
		.setDescription(`Bu bir örnek komuttur!`) // Embed açıklamasını belirtiyoruz.
		.setColor(client.ayarlar.renk) // Ayarlarda belirttiğimiz rengi kullanıyoruz.
		.setTimestamp() // Hangi tarihte gönderildiğini belirtiyoruz.
	message.channel.send({embed}) // Gönderiyoruz.
}

exports.conf = { // Özel ayarları belirtiyoruz.
	enabled: true, // Aktif mi değil mi? (true, false)
	guildOnly: true, // Sadece sunucuda mı kullanılsın? (true, false)
	aliases: [], // Sadece komutu değilde bunlarıda yazarsa bu işlemi gerçekleştir diyoruz.
	permLevel: 0,
	/**

	0 = Yetki gerekmez.
	1 - Mesajları Yönet yetkisi gerekir.
	2 - Üyeleri At yetkisi gerekir.
	3 - Yönetici yetkisi gerekir.
	4 - Bot sahibi yetkisi gerekir.

	*/
	kategori: 'kullanıcı' // Yardım komutunda gözükecek kategoriyi belirtiyoruz.
}

exports.help = { // Ana ayarları belirtiyoruz.
	komut: 'ornek', // Komutu belirtiyoruz.
	aciklama: 'Bu bir örnek komuttur.', // Yardımda gözüken açıklamayı belirtiyoruz.
	kullanim: 'ornek' // Yardımda gözükecek kullanımı belirtiyoruz.
}
