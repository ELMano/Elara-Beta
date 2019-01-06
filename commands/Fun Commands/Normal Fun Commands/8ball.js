const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "8ball",
            memberName: "8ball",
            aliases: ["8b"],
            examples: [`${client.commandPrefix}8ball Does this work?`],
            description: "Ask a question",
            group: "fun",
            args: [
                {
                    key: "ball",
                    prompt: "What do you want to ask the magic 8ball",
                    type: "string"
                }
            ]
        })
    }
    async run(message, { ball }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let n = await neko.getSFW8Ball()
        let embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(`**Question:** ${ball}\n**Answer:** ${n.response.toUpperCase()}`)
            .setImage(n.url);
        message.channel.send(embed);
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}