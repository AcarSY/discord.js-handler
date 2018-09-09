const Discord = require('discord.js')
const client = new Discord.Client()

/**
	Aşağıya bilgilerinizi yazın.
	Üst kısımda kodlar bulunuyor. Bu kısıma dokunmayın.
*/

const client.ayarlar = {

	ownerID: "478861391894282240", // ID Numaranız
	prefix: "!", // Komutların başına gelecek ek
	token: "Discord Applications sayfasındaki token bilginiz",
	klasor: "komutlar", // Komutların bulunduğu klasörün ismi
	renk: "#FF0000", // Embed rengi (HTML kodu veya RANDOM yazılabilir.)
	destek: "discord.gg/xyzxyzq", // Discord destek sunucusu linki istenirse boş bırakılabilir.
	surum: "0.2.1", // Bot sürümü
	site: "site.xyz", // Botun sitesi istenirse boş bırakılabilir.
	yardimcilar: ["1. yardımcı ID numarası", "2. yardımcı ID numarası", "3. yardımcı ID numarası"], // İstenirse daha fazla eklenebilir. Eğer yoksa [] içi temizlenebilir.
	sunucuekleme: "{sunucu} adlı sunucuya eklendim! Bu sunucuda toplam {uye} üye, {bot} bulunuyor! Şuan da toplam {sunucular} tane sunucuya hizmet veriyorum!", // Bot bir sunucuya katılınca konsolda yazacak yazı
	sunucuatma: "{sunucu} adlı sunucudan atıldım! Bu sunucuda toplam {uye} üye, {bot} bulunuyordu! Şuan da toplam {sunucular} tane sunucuya hizmet veriyorum!" // Bot bir sunucudan atılınca konsolda yazacak yazı
	oyun: "{prefix}yardım | {sunucu} sunucu | {site} | {kullanıcı} kullanıcı" // Oynuyor yeri
	oyundurum: "oynuyor" // Oynuyor durumu sadece oynuyor veya dinliyor veya izliyor yazabilirsiniz eğer bunlar dışında bir şey yazarsanız veya boş bırakırsanız direk oynuyor gözükecektir.
	durum: "cevrimici" // Botun durumu sadece rahatsizetmeyin veya cevrimici veya bosta yazabilirsiniz eğer bunlar dışında bir şey yazarsanız veya boş bırakırsanız direk çevrimiçi gözükecektir.

}


/**
	Yukarıya bilgilerinizi yazın.
	Alt kısımda kodlar bulunuyor. Bu kısıma dokunmayın.
*/

const fs = require('fs')
const chalk = require('chalk')

fs.readdir(`./${client.ayarlar.klasor}/`, (err, files) => {
	let jsfiles = files.filter(f => f.split(".").pop() === "js")
	if(jsfiles.length <= 0) {
		log(`${chalk.redBright("Üzgünüm ama hiçbir komut bulunamadı!")}`)
	} else {
		if (err) {
			console.error(`${chalk.redBright("Hata çıktı;")}\n${err}\n\n${chalk.greenBright("Hatayı düzeltmen için bir kaç tavsiye vereceğim. İlk öncelikle ayarları doğru girdiğinden ve boş bırakmadığından emin ol. Daha sonra kendin eklediğin komutlara iyice bak ve örnek komutla karşılaştır. Hatan varsa düzelt. Eğer kodda hata olduğunu düşünüyorsan bildirmekten çekinme!")}`)
		}
		log(`${chalk.yellow(jsfiles.length)} komut yüklenecek.`)
		jsfiles.forEach(f => {
			let props = require(`./${client.ayarlar.klasor}/${f}`)
			client.commands.set(props.help.name, props)
			props.conf.aliases.forEach(alias => {
				client.aliases.set(alias, props.help.name)
			})
			log(`Yüklenen komut: ${props.help.name}`)
		})
	}
})

client.on("ready", () => {
	var odurumlar = ["oynuyor", "dinliyor", "izliyor"]
	var odurum = "PLAYING"

	if(odurumlar.includes(client.ayarlar.oyundurum)) {
		var odurum = client.ayarlar.oyundurum.replace("oynuyor", "PLAYING").replace("dinliyor", "LISTENING").replace("izliyor", "WATCHING")
	}

	var durumlar = ["rahatsizetmeyin", "online", "bosta"]
	var durum = "dnd"

	if(durumlar.includes(client.ayarlar.durum)) {
		var durum = client.ayarlar.oyundurum.replace("rahatsizetmeyin", "dnd").replace("cevrimici", "online").replace("bosta", "idle")
	}

	client.user.setPresence({
		game: {
			name: client.ayarlar.oyun.replace(\{prefix}\g, client.ayarlar.prefix).replace(\{kullanıcı}\g, client.users.size).replace(\{sunucu}\g, client.guilds.size).replace(\{site}\g, client.ayarlar.site),
			type: odurum
		},
		status: durum
	})
})

client.on("guildCreate", guild => {
	console.log(client.ayarlar.sunucuekleme.replace(\{sunucu}\g, chalk.orange(guild.name)).replace(\{bot}\g, chalk.blue(guild.members.filter(m => m.user.bot)).size).replace(\{uye}\g, chalk.green(guild.members.filter(m => !m.user.bot)).size).replace(\{sunucular}\g, chalk.redBright(client.guilds.size)))
	var odurumlar = ["oynuyor", "dinliyor", "izliyor"]
	var odurum = "PLAYING"

	if(odurumlar.includes(client.ayarlar.oyundurum)) {
		var odurum = client.ayarlar.oyundurum.replace("oynuyor", "PLAYING").replace("dinliyor", "LISTENING").replace("izliyor", "WATCHING")
	}

	var durumlar = ["rahatsizetmeyin", "online", "bosta"]
	var durum = "dnd"

	if(durumlar.includes(client.ayarlar.durum)) {
		var durum = client.ayarlar.oyundurum.replace("rahatsizetmeyin", "dnd").replace("cevrimici", "online").replace("bosta", "idle")
	}

	client.user.setPresence({
		game: {
			name: client.ayarlar.oyun.replace(\{prefix}\g, client.ayarlar.prefix).replace(\{kullanıcı}\g, client.users.size).replace(\{sunucu}\g, client.guilds.size).replace(\{site}\g, client.ayarlar.site),
			type: odurum
		},
		status: durum
	})
})

client.on("guildDelete", guild => {
	console.log(client.ayarlar.sunucuatma.replace(\{sunucu}\g, chalk.orange(guild.name)).replace(\{bot}\g, chalk.blue(guild.members.filter(m => m.user.bot)).size).replace(\{uye}\g, chalk.green(guild.members.filter(m => !m.user.bot)).size).replace(\{sunucular}\g, chalk.redBright(client.guilds.size)))
	var odurumlar = ["oynuyor", "dinliyor", "izliyor"]
	var odurum = "PLAYING"

	if(odurumlar.includes(client.ayarlar.oyundurum)) {
		var odurum = client.ayarlar.oyundurum.replace("oynuyor", "PLAYING").replace("dinliyor", "LISTENING").replace("izliyor", "WATCHING")
	}

	var durumlar = ["rahatsizetmeyin", "online", "bosta"]
	var durum = "dnd"

	if(durumlar.includes(client.ayarlar.durum)) {
		var durum = client.ayarlar.oyundurum.replace("rahatsizetmeyin", "dnd").replace("cevrimici", "online").replace("bosta", "idle")
	}

	client.user.setPresence({
		game: {
			name: client.ayarlar.oyun.replace(\{prefix}\g, client.ayarlar.prefix).replace(\{kullanıcı}\g, client.users.size).replace(\{sunucu}\g, client.guilds.size).replace(\{site}\g, client.ayarlar.site),
			type: odurum
		},
		status: durum
	})
})

client.login(client.ayarlar.token)
