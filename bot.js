const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "7/24 AKTİF TUTMA İŞLEMİ BAŞARILI");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);


client.on("guildMemberAdd", member => {
    require("moment-duration-format")
      var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
            '0': `<a:sfr:799047737701957662>`,
            '1': `<a:bir:799047767212425237>`,
            '2': `<a:iki:799047788175687721>`,
            '3': `<a:uc:799048083887358002>`,
            '4': `<a:dort:799047803695398962>`,
            '5': `<a:bes:799047814083510323>`,
            '6': `<a:alti:799047832366612550>`,
            '7': `<a:yedi:799047848649424936>`,
            '8': `<a:sekiz:799047867616198687>`,
            '9': `<a:dokuz:799047870724440104>`}[d];})}
    const kanal = member.guild.channels.cache.find(r => r.id === "798529694180835388");
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
     const gecen = moment.duration(kurulus).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
    var kontrol;
  if (kurulus < 1296000000) kontrol = 'Hesap Durumu: <a:carpi:799440141802012702> Güvenilir Değil.'
  if (kurulus > 1296000000) kontrol = 'Hesap Durumu: Güvenilir Gözüküyor.'
    moment.locale("tr");
    kanal.send(`
  
  <a:tag3:799477166319468585> • <@`+member.id+`> sunucumuza hoş geldin. Seninle beraber `+üyesayısı+` kişiye ulaştık :tada: 
  
         <a:tag3:799477166319468585> •  Sunucumuzun tagını (\`୪\`) alarak bizlere destek olabilirsin :tada: 

         <a:tag3:799477166319468585> • Sesli odalara girerek kaydınızı yaptırabilirsiniz. <@&798529389326368778> sizinle ilgilenecektir.:tada: 

  <a:tag3:799477166319468585> • Kuralları <#798529732797792297> kanalından sunucu kurallarımızı okumayı ihmal etme! :tada:

  `)
});

////////////////////////////////////////////////////////////BOTU ODAYA SOKAR////////////////////////////////////////////////////
client.on("ready", () => {
  let odayagir = ayarlar.odayagir
  client.channels.cache.get(odayagir).join();
  });    

//////////////////////////////////////////////////////////OTO ROL//////////////////////////////////////////////////////////////

//-----------------------OTO-TAG-----------------------\\     STG

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
    const tag = "୪";
    const sunucu = "798520489488154625";
    const kanal = "798529816802492446";
    const rol = "798529397317042188";

    try {
      if (
        newUser.username.includes(tag) &&
        !client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(rol)
      ) {
        await client.channels.cache
          .get(kanal)
          .send(
            new Discord.MessageEmbed()
              .setColor("GREEN")
              .setDescription(
                `<a:kelebek:799431998032052225>  ${newUser} adlı kişi ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`
              )
          );
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.add(rol);
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .send(
            `<a:sarikelebek:799250866820612126> Merhaba **${
              newUser.username
            }**, Sunucumuzda **${tag}** Tagımızı Aldığın İçin **${
              client.guilds.cache.get(sunucu).roles.cache.get(rol).name
            }** Rolünü Sana Verdim!`
          );
      }
      if (
        !newUser.username.includes(tag) &&
        client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(rol)
      ) {
        await client.channels.cache
          .get(kanal)
          .send(
            new Discord.MessageEmbed()
              .setColor("d40000")
              .setDescription(
                `<a:kelebek:799431998032052225> ${newUser} adlı kişi ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım`
              )
          );
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.remove(rol);
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .send(
            `<a:kelebek:799431998032052225> Selam **${
              newUser.username
            }**, Sunucumuzda **${tag}** Tagımızı Çıkardığın İçin **${
              client.guilds.cache.get(sunucu).roles.cache.get(rol).name
            }** Rolünü Senden Aldım!`
          );
      }
    } catch (e) {
      console.log(`Bir hata oluştu! ${e}`);
    }
  }
});

//Serendia'dan alınıp V12 Çevirilmiştir!

//-----------------------OTO-TAG-----------------------\\     STG

client.on("userUpdate", async (stg, yeni) => {
  var sunucu = client.guilds.cache.get("772479909427281930"); // Buraya Sunucu ID
  var uye = sunucu.members.cache.get(yeni.id);
  var tag = "୪"; // Buraya Ekip Tag
  var tagrol = "798529397317042188"; // Buraya Ekip Rolünün ID
  var kanal = "798529816802492446"; // Loglanacağı Kanalın ID

  if (
    !sunucu.members.has(yeni.id) ||
    yeni.bot ||
    stg.username === yeni.username
  )
    return;

  if (yeni.username.includes(tag) && !uye.roles.has(tagrol)) {
    try {
      await uye.roles.add(tagrol);
      await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
      await client.channels.cache
        .get(kanal)
        .send(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`);
    } catch (err) {
      console.error(err);
    }
  }

  if (!yeni.username.includes(tag) && uye.roles.has(tagrol)) {
    try {
      await uye.roles.remove(
        uye.roles.filter(
          rol => rol.position >= sunucu.roles.get(tagrol).position
        )
      );
      await uye.send(
        `Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${tag}**`
      );
      await client.channels.cache
        .get(kanal)
        .send(`**${yeni}** adlı üye tagımızı bırakarak aramızdan ayrıldı!`);
    } catch (err) {
      console.error(err);
    }
  }
});

//----------------------TAG-KONTROL----------------------\\     

client.on("guildMemberAdd", member => {
  let sunucuid = "798520489488154625"; //Buraya sunucunuzun IDsini yazın
  let tag = "୪"; //Buraya tagınızı yazın
  let rol = "798529397317042188"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
if(member.user.username.includes(tag)){
member.roles.add(rol)
  const tagalma = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, o doğuştan beri bizden !`)
      .setTimestamp()
     client.channels.cache.get('798529816802492446').send(tagalma)
}
})

//-----------------------TAG-KONTROL----------------------\\     
client.on("guildMemberAdd", member => {
    var moment = require("moment")
    require("moment-duration-format")
    moment.locale("tr")
     var {Permissions} = require('discord.js');
     var x = moment(member.user.createdAt).add(7, 'days').fromNow()
     var user = member.user
     x = x.replace("birkaç saniye önce", " ")
     if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
    const kytsz = member.guild.roles.cache.find(r => r.id === "798529426442551317") 
     var rol = member.guild.roles.cache.get("798529457576607795") // ŞÜPHELİ HESAP ROLÜNÜN İDSİNİ GİRİN
     var kayıtsız = member.guild.roles.cache.get("798529426442551317") // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
     member.roles.add(rol)
     member.roles.remove(kytsz)

  member.user.send('Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.')
  setTimeout(() => {
  
  }, 1000)
  
  
     }
          else {
  
          }
      });

/////////////////////////////////////////////////////////////////YASAKLI TAG//////////////////////////////////////////////////////////
client.on("guildMemberAdd", member => {
  let tag = ayarlar.yasaklıtag
  let kayıtsızcık = ayarlar.kayıtsız //FALCO 
  let cezalıcık = ayarlar.cezalı

if(member.user.username.includes(tag)){ //FALCO 
member.roles.add(cezalıcık)
member.roles.remove(kayıtsızcık)
member.send( ` \`${member.guild.name}\` adlı **sunucuda __yasaklı tag__ kullandığınız için __Cezalı__ rolünü aldınız!**`)
} //FALCO
})

/////////////////////////////

client.on("guildMemberAdd", async (member) => {
  member.roles.add(ayarlar.unregister)
  member.setNickname("୪ İsim | Yaş")
  });

/////////////////////////////

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'tag') {
    msg.reply('୪');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '.tag') {
    msg.reply('୪');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Tag') {
    msg.reply('୪');
  }
});

/////////////////////////////
client.on("guildMemberAdd", member => {
  member.roles.add('798529426442551317'); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});
