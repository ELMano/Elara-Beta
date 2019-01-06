const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js'),
    superagent = require("superagent");
module.exports = class hugCommand extends Command {
    constructor(client) {
        super(client, {
            name: "hug",
            memberName: "hug",
            aliases: ["hugs"],
            examples: [`${client.commandPrefix}hug @user/userid`],
            description: "Hugs the user you mention/userid",
            group: "image",
            args: [
                {
                    key: "user",
                    prompt: "What user do you want to hug?",
                    type: "user"
                }
            ]
        })
    }
    async run(message, { user }) {
        this.client.stats(this.client, "cmd", null, null, null)
    try{
        const { body } = await superagent
            .get(`https://nekos.life/api/v2/img/hug`);
        let hugEmbed = new Discord.RichEmbed()
            .setDescription(`Hug <a:hugs:485137939710345227>\n\n**${message.author}** hugged **${user}**!`)
            .setImage(body.url)
            .setColor("RANDOM")
        message.channel.send(hugEmbed)
    } catch (e) {
        this.client.error(this.client, message, e);
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
    }
    }
}