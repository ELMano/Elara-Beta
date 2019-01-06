const { Command } = require('../../../util/Commando');
const Discord = require('discord.js');
module.exports = class SCommand extends Command {
    constructor(client) {
        super(client, {
            name: "support",
            memberName: "support",
            aliases: [`botsupport`],
            examples: [`${client.commandPrefix}support`],
            description: "Gives you the invite to the support server",
            group: "info",
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let embed = new Discord.RichEmbed()
            .setAuthor(`Elara Support`, this.client.util.avatar)
            .setColor(`RANDOM`)
            .setDescription(`[Click Here](${this.client.options.invite})`)
        message.say(embed)
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}