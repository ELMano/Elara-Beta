const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
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
        let answer = [`Yes`, `No`, `Maybe`, `Nope`, `Never`, `Ask again later.`, `Absolutely`, `Not now`, `It will pass`, `Go for it`, `Wait for it`, `No doubt`];
        let result = Math.floor(Math.random() * answer.length);
        let embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(`**Question:** ${ball}\n**Answer:** ${answer[result]}`)
            .setImage(answer[result]);
        message.channel.send(embed);
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}
