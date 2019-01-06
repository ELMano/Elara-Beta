const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const DJSUtils = require('discord.js/src/util/Util')
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "emote",
            memberName: "emote",
            aliases: ["emojifind", "emojisearch"],
            examples: [`${client.commandPrefix}emote <emoji name here>`],
            description: "This will post information about the emoji you search for.",
            group: "info",
            args: [
                {
                    key: 'content',
                    prompt: 'What emoji do you want me to get the info about?',
                    type: 'string'
                }
            ]
        })
    }
    async run(msg, { content }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let client = this.client;
        const emoji = content.split(/\s+/)[0];
        let parsedEmoji = DJSUtils.parseEmoji(emoji);
        if (/^\d{17,19}/.test(emoji)) {
            parsedEmoji = { id: String(emoji), animated: "unknown" };
        }
    if (!parsedEmoji) {
        let e = new Discord.RichEmbed()
        .setAuthor(client.user.tag, client.user.displayAvatarURL)
        .setTitle(`ERROR`)
        .setDescription(`That isn't an emoji!`)
        .setColor(`#FF0000`)
        msg.channel.send(e)
} else 
    
    if (parsedEmoji && !parsedEmoji.id) {
        let e = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setAuthor(client.user.tag, client.user.displayAvatarURL)
        .setDescription(`That is a unicode emoji!`)
        .setTitle(`INFO`)
        .setFooter(`The command works best for custom emojis.`, msg.author.displayAvatarURL)
        msg.channel.send(e)
} else
    
    if (parsedEmoji && parsedEmoji.id) {
			const globalEmoji = this.client.emojis.get(parsedEmoji.id);
			if (globalEmoji) {
                let e = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setAuthor(client.user.tag, client.user.displayAvatarURL)
                .setDescription(`
                **Emoji: **${globalEmoji.name}
                **ID: **${globalEmoji.id}
                **Animated: **${globalEmoji.animated ? "Yes" : "No"}
                **Global Emoji: ** ${globalEmoji.name.startsWith("GW") ? "Yes" : "No"}
                **URL: **[Click Here](${globalEmoji.url})
                **Managed by a Service: **${globalEmoji.managed ? "Yes": "No"}
                **Roles: **${globalEmoji.roles.sort((a, b) => b.position - a.position).map(r => r.toString()).join("\n") ? globalEmoji.roles.sort((a, b) => b.position - a.position).map(r => `@${r.name}`).join("\n» ") : "None"}
                **Server: **${globalEmoji.guild.name} (${globalEmoji.guild.id})
                `)
                .setThumbnail(globalEmoji.url)
                msg.channel.send(e)        
			} else {
                let url = `${parsedEmoji.animated !== "unknown" ? `${ client.options.http.cdn }/emojis/${ parsedEmoji.id }.${ parsedEmoji.animated === true ? "gif" : "png" }` : ""}`
                let e = new Discord.RichEmbed()
                .setAuthor(client.user.tag, client.user.displayAvatarURL)
                .setColor(`RANDOM`)
                .setDescription(`
                **Name: **${parsedEmoji.name ? `${parsedEmoji.name}` : ""}
                **ID: **${parsedEmoji.id}
                **Animated: **${parsedEmoji.animated === "unknown" ? `Unknown.` : parsedEmoji.animated === true ? `Yes` : `No`}
                **Global Emoji: ** ${parsedEmoji.name.startsWith("GW") ? "Yes" : "No"}
                **URL: **[Click Here](${url})
                `)
                e.setThumbnail(url)
                msg.channel.send(e)
			}

    } else if (msg.guild.emojis.size) {
		const staticEmojis = msg.guild.emojis.filter(e => !e.animated);
		const animatedEmojis = msg.guild.emojis.filter(e => e.animated);
		const fields = [];
		staticEmojis.size && fields.push({
			name: `There ${staticEmojis.size === 1 ? "is" : "are"} ${staticEmojis.size} static emoji${staticEmojis.size === 1 ? "" : "s"} in this server`,
			value: `${staticEmojis.map(e => `\`:${e.name}:\` » ${e}`).join("\n")}`,
		});
		animatedEmojis.size && fields.push({
			name: `There ${animatedEmojis.size === 1 ? "is" : "are"} ${animatedEmojis.size} animated emoji${animatedEmojis.size === 1 ? "" : "s"} in this server`,
			value: `${animatedEmojis.map(e => `\`:${e.name}:\` » ${e}`).join("\n")}`,
		});
        msg.channel.send({
			embed: {
				color: 0xFF000,
				fields,
				footer: {
					text: `Want to learn more about an emoji? Run "${msg.guild.commandPrefix}emotes <custom emote>"`,
				},
			},
		});
	} else {
        msg.channel.send({
			embed: {
                color: 0xFF0000,
				description: `There aren't any custom emojis in this server!.`,
			},
        })
    
    }
        } catch (e) {
            this.client.error(this.client, msg, e);
            this.client.logger(this.client, msg.guild, e.stack, msg, msg.channel)
        }
}
}