const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js'),
    superagent = require('superagent');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "poke",
            memberName: "poke",
            aliases: [],
            examples: [`${client.commandPrefix}poke @user/userid`],
            description: "Pokes the user you mention or their user id",
            group: "image",
            args: [
                {
                    key: "user",
                    prompt: "What user do you want to poke?",
                    type: "user"
                }
            ]
        })
    }
    async run(message, { user }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        const { body } = await superagent
            .get(`https://nekos.life/api/v2/img/poke`);
        let hugUser = user;
        if (hugUser.id === message.author.id) return message.say(`You can't poke yourself silly :wink:`)
        let hugEmbed = new Discord.RichEmbed()
            .setDescription(`Poke \n\n**${message.author}** Poked **${hugUser}**!`)
            .setImage(body.url)
            .setColor("RANDOM")
        message.channel.send(hugEmbed)
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}