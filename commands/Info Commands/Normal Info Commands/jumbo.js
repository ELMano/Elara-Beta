const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const DJSUtils = require('discord.js/src/util/Util')
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "jumbo",
            memberName: "jumbo",
            aliases: [],
            examples: [`${client.commandPrefix}jumbo <emoji name here>`],
            description: "Makes the emoji you provide bigger",
            group: "info",
            args: [
                {
                    key: 'content',
                    prompt: 'What emoji do you want me to make jumbo size?',
                    type: 'string'
                }
            ]
        })
    }
    async run(msg, { content }) {
        this.client.stats(this.client, "cmd")
        try{
        let client = this.client;
        const emoji = content.split(/\s+/)[0];
        let parsedEmoji = DJSUtils.parseEmoji(emoji);
        if (/^\d{17,19}/.test(emoji)) {
            parsedEmoji = { id: String(emoji), animated: "unknown" };
        }
        console.log(parsedEmoji)
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
                .setImage(globalEmoji.url)
                msg.channel.send(e)        
			} else {
                let url = `${parsedEmoji.animated !== "unknown" ? `${ client.options.http.cdn }/emojis/${ parsedEmoji.id }.${ parsedEmoji.animated === true ? "gif" : "png" }` : ""}`
                let e = new Discord.RichEmbed()
                .setAuthor(client.user.tag, client.user.displayAvatarURL)
                .setColor(`RANDOM`)
                e.setImage(url)
                msg.channel.send(e)
			}

    }
        } catch (e) {
            this.client.error(this.client, msg, e);
            this.client.logger(this.client, msg.guild, e.stack, msg, msg.channel)
        }
}
}
