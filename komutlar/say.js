const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  
let tag = "ꏬ";
const aktifsay = message.guild.members.cache.filter(aktif => aktif.presence.status != "offline").size
const toplamsay = message.guild.memberCount
const sessay = message.guild.channels.cache.filter(channel => channel.type === "voice").map(channel => channel.members.size).reduce((a, b) => a + b)
const taglisay = message.guild.members.cache.filter(t => t.user.username.includes(tag)).size
const boostersay = message.guild.roles.cache.get('773299468749635586').members.size
const erkeksay = message.guild.roles.cache.get('787416083619119176').members.size
const kadinsay = message.guild.roles.cache.get('787416083153027122').members.size

const embed = new Discord.MessageEmbed()
.setColor('BLACK')
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`<a:helenosemoji:786038299495497728>   *Toplam Üye;* **\`${toplamsay}\`**
<a:helenostac:786038369217282048>   *Aktif Üye;* **\`${aktifsay}\`**
<a:helenossonsuzluk:786038364339044362>   *Kadın Üye;* **\`${kadinsay}\`**
<a:helenostik:786038354956779530>  *Erkek Üye;* **\`${erkeksay}\`**
<a:helenosyldz:786038339227746325>  *Taglı Üye;* **\`${taglisay}\`**
<a:helenosdiamond:786041108433207316>   *Sesteki Üye;* **\`${sessay}\`**
<a:helenosbooster:786038322883461140>   *Booster Üye;* **\`${boostersay}\`**`)
.setFooter(`Helenos Say Sistemi!`)
message.channel.send(embed)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "say"
};
