const Discord = require('discord.js');
const sa = require('superagent');
module.exports.run = async (bot, oldUser, newUser) => {
    bot.guilds.forEach(async g => {
        try{
        if (g.members.get(oldUser.id)) {
            if (oldUser.avatar !== newUser.avatar) {
                if(oldUser.bot) return;
                let e = new Discord.RichEmbed()
                    .setAuthor(`Avatar Update`, newUser.displayAvatarURL)
                    .setColor(`#FF000`)
                    .setDescription(`**Before: **[Click Here](${oldUser.displayAvatarURL})`)
                    .addField(`Info`, `**User: **${newUser} \`@${newUser.tag}\` (${newUser.id})`)
                let e2 = new Discord.RichEmbed()
                    .setDescription(`**After: **[Click Here](${newUser.displayAvatarURL})`)
                    .setColor(`#FF000`)
                    .setTimestamp()
                if (oldUser.displayAvatarURL.toLowerCase().includes('.gif')) {
                    let avatar;
                    avatar = `http://media.discordapp.net/avatars/${oldUser.id}/${oldUser.avatar}.gif?size=2048`
                    try {
                        let body = await sa.get(avatar);
                        avatar = body.request.url
                    } catch (e) {
                        avatar = `http://www.kalahandi.info/wp-content/uploads/2016/05/sorry-image-not-available.png`
                    }
                    e.attachFiles([new Discord.Attachment(avatar, "avatar.gif")])
                    e.setImage('attachment://avatar.gif')

                } else
                    if (oldUser.displayAvatarURL.toLowerCase().includes('.png' || ".jpg" || ".jpeg")) {
                        if (oldUser.displayAvatarURL.toLowerCase().includes("assets")) {
                            e.setImage(oldUser.displayAvatarURL);
                        } else {
                        let avatar;
                        avatar = `http://media.discordapp.net/avatars/${oldUser.id}/${oldUser.avatar}.png?size=2048`
                        try {
                            let body = await sa.get(avatar);
                            avatar = body.request.url
                        } catch (e) {
                            avatar = `http://www.kalahandi.info/wp-content/uploads/2016/05/sorry-image-not-available.png`
                        }
                        e.attachFiles([new Discord.Attachment(avatar, "avatar.png")])
                        e.setImage('attachment://avatar.png')

                    }
                    }


                if (newUser.displayAvatarURL.toLowerCase().includes('.gif')) {
                    let avatar;
                    avatar = `http://media.discordapp.net/avatars/${newUser.id}/${newUser.avatar}.gif?size=2048`
                    try {
                        let body = await sa.get(avatar);
                        avatar = body.request.url
                    } catch (e) {
                        avatar = `http://www.kalahandi.info/wp-content/uploads/2016/05/sorry-image-not-available.png`
                    }
                    e2.attachFiles([new Discord.Attachment(avatar, "avatar.gif")])
                    e2.setImage('attachment://avatar.gif')

                } else
                    if (newUser.displayAvatarURL.toLowerCase().includes('.png' || ".jpeg" || ".jpg")) {
                        if (newUser.displayAvatarURL.toLowerCase().includes("assets")) {
                            e2.setImage(newUser.displayAvatarURL);
                        }else{
                        let avatar;
                            avatar = `http://media.discordapp.net/avatars/${newUser.id}/${newUser.avatar}.png?size=2048`
                        try {
                            let body = await sa.get(avatar);
                            avatar = body.request.url
                        } catch (e) {
                            avatar = `http://www.kalahandi.info/wp-content/uploads/2016/05/sorry-image-not-available.png`
                        }
                        e2.attachFiles([new Discord.Attachment(avatar, "avatar.png")])
                        e2.setImage('attachment://avatar.png')
                    }

                    }
                try {
                    bot.functions.user(bot, g, e)
                    setTimeout(() => {
                        bot.functions.user(bot, g, e2)
                    }, 2000); 
                } catch (err) {
                    console.log(err)
                    bot.functions.user(bot, g, `Unknown Avatar Change by: **${newUser.tag}**`)
                }
            }
        }
        if (g.members.get(oldUser.id)) {
            if (oldUser.discriminator !== newUser.discriminator) {
                let e = new Discord.RichEmbed()
                    .setAuthor(`Discriminator/Tag Update`, newUser.displayAvatarURL)
                    .setColor(`#FF000`)
                    .setTimestamp()
                    .setDescription(`**Before: **#${oldUser.discriminator}\n**After: **#${newUser.discriminator}`)
                    .addField(`Info`, `**User: **${newUser} \`@${newUser.tag}\` (${newUser.id})`)
                    .setFooter(bot.user.tag, bot.user.displayAvatarURL)
                bot.functions.user(bot, g, e)
            }
        }
        if (g.members.get(oldUser.id)) {
            if (oldUser.username !== newUser.username) {
                let e = new Discord.RichEmbed()
                    .setAuthor(`Username Update`, newUser.displayAvatarURL)
                    .setColor(`#FF000`)
                    .setTimestamp()
                    .setDescription(`**Before: **${oldUser.username}\n**After: **${newUser.username}`)
                    .addField(`Info`, `**User: **${newUser} \`@${newUser.tag}\` (${newUser.id})`)
                    .setFooter(bot.user.tag, bot.user.displayAvatarURL)
                bot.functions.user(bot, g, e)
            }
        }
    }catch(e){
        bot.logger(bot, g, e.stack)
    }
    })
}