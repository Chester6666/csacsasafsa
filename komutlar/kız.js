const dc = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
if(!["798529389326368778", "EXTRA ROL İD GİREBİLRSN"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) return message.reply(`Bu Komutu Kullanabilmek İçin Yetkin Bulunmuyor.`)
  
  
const kayıtlı = message.guild.roles.cache.find(r => r.id === '798529420393578517')
const kayıtlı2 = message.guild.roles.cache.find(r => r.id === '801799811057451068')
const kayıtlı3 = message.guild.roles.cache.find(r => r.id === '798547924706525194')
const kayıtsız = message.guild.roles.cache.find(r => r.id === '798529426442551317')
const genelchat = message.guild.channels.cache.find(g => g.id === "798529751622352926")
const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send('Bir Kullanıcı Belirt.')
if(!member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('Etiketlenen kullanıcı ile Üst/Aynı pozisyonda bulunuyorsunuz.')
const x = message.guild.member(member)
let bilgi = db.get(`yetkili.${member.id}`);
  
db.add(`yetkili.${message.author.id}.kadin`,1 )
db.add(`yetkili.${message.author.id}.toplam`, 1)  
let toplami = db.fetch(`yetkili.${message.author.id}.toplam`)  

let tag = "୪"
let isim = args[1]
let yas = Number(args[2])
if(!isim) return message.channel.send(`Bir İsim Belirt.`)
if(!yas) return message.channel.send(`Bir Yaş Belirt.`)
  
  
x.setNickname(`${tag} ${isim} | ${yas}`)
x.roles.add(kayıtlı)
x.roles.add(kayıtlı2)
x.roles.add(kayıtlı3)
x.roles.remove(kayıtsız)
  

  
const embed = new dc.MessageEmbed()
.setDescription(`
• ${member}, ${message.author} Tarafından Kayıt Edildi.
• ${kayıtlı} ${kayıtlı2}, ${kayıtlı3} Rolleri Verildi.
• İsmi \`${tag} ${isim} | ${yas}\` Olarak Güncellendi.`) 
.setColor('PURPLE')
.setFooter(`${message.author.username} Toplam Kayıt ${toplami} Sayısına Ulaştın`)
message.channel.send(embed)

genelchat.send(`<@${member.id}>, Aramıza Hoş Geldin ! Umarım Keyifli Vakitler Geçirirsin.`)  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["kadın", "k", "woman", "girl"],
    permLevel: 0
};

exports.help = {
    name: "kadın"
}

