const { Command } = require('../../../util/Commando'),
    ms = require('ms'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "mute",
            memberName: "mute",
            aliases: ["silence", "calm"],
            examples: [`${client.commandPrefix}mute @user/userid <reason here>`],
            description: "Mutes the member you provide",
            guildOnly: true,
            group: "mod",
            args: [
                {
                    key: "member",
                    prompt: "What member do you want me to mute?",
                    type: "member"
                },
                {
                    key: "time",
                    prompt: "how much time do you want to mute the user for?",
                    type: "string"
                },
                {
                    key: 'reason',
                    prompt: 'What is the reason for the mute?',
                    type: 'string',
                    default: "No Reason Provided"
                }
            ]
        })
    }
    async run(message, {member, time, reason}) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, message, "MANAGE_MESSAGES")) return;
        try{
        let mod = message.author
        if (member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry but i can't mute Mods/Admins!");
        let muterole = message.guild.roles.find(r => r.name === "Muted").id || message.guild.roles.find(r => r.name === "muted").id
        if (!muterole) {
            try {
                muterole = await message.guild.createRole({
                    name: `Muted`,
                    color: "#FF0000",
                    permissions: []
                })
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole.id, {
                        SEND_MESSAGES: false
                    });
                });
            } catch (e) {
                console.log(e.stack);
            }
        }
        await (member.addRole(muterole.id));
        let botembed = new Discord.RichEmbed()
            .setColor("#000FF")
            .setAuthor(`${member.user.username}`, `${member.user.avatarURL}`)
            .setDescription(`Mute | ${member.user.tag} `)
            .addField("Moderator", `**Mod: **${mod} \`${mod.tag}\` (${mod.id})`, true)
            .addField("User Muted", `**User: **${member} \`${member.user.tag}\` (${member.user.id})`, true)
            .addField("Time", `${ms(ms(time))}`, true)
            .addField(`Reason`, `${reason}`)
            .setTimestamp()
        this.client.actionlog(this.client, message.guild, botembed)
        message.channel.send(`${this.client.util.emojis.semoji} ***${member.user.tag} Has Been Muted!***`);

        setTimeout(function () {
            let unmuteembed = new Discord.RichEmbed()
                .setColor(`#FF000`)
                .setAuthor(member.user.tag, member.user.displayAvatarURL)
                .setDescription(`Unmute | ${member.user.tag}`)
                .addField(`Moderator`, `**Moderator: **${this.client.user} \`${this.client.user.tag}\` (${this.client.user.id})`, true)
                .addField(`User Unmuted`, `**User: **${member} \`${member.user.tag}\` (${member.user.id})`, true)
                .addField(`Reason`, `Auto`, true)
                .setTimestamp()
            member.removeRole(muterole.id);
            this.client.actionlog(this.client, message.guild, unmuteembed)
        }, ms(mutetime));
        message.delete().catch();

        const dmembed = new Discord.RichEmbed()
            .setColor(`#FF0000`)
            .setDescription(`You have been Muted in **${message.guild.name}**`)
            .addField(`Time`, `${ms(ms(mutetime))}`)
            .addField(`Reason`, `${reason}`)
        await member.send(dmembed)
    } catch (e) {
        this.client.error(this.client, message, e);
    this.client.logger(this.client, message.guild, e.stack, message, message.channel)
    }
    }
}