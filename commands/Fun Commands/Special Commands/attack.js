const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "attack",
            memberName: "attack",
            aliases: [],
            examples: [`${client.commandPrefix}attack`],
            description: "Sends the Attack Blob Cheer army!\n[SUPERCHIEFYT's Discord Command only.]",
            group: "special",
            hidden: true
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        if (message.guild.id !== "371105897570631691" && message.guild.id !== "424200844666208265") return;
        let emoji = this.client.emojis.get("504665622672834560")
        let attack = [`
            ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji}
            ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji}
            ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji}
            ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji}
            ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji}
            ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji} ${emoji}
            `]
        let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setAuthor(`ATTACK OF THE CHEER BLOBS! `, emoji.url)
            .setDescription(attack)
        message.channel.send(embed)
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}