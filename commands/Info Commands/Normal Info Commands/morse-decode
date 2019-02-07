const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const morse = require('morse-node').create('ITU');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "decode",
            memberName: "decode",
            aliases: [],
            examples: [`${client.commandPrefix}decode <morse text here>`],
            description: "Decodes the text you provide",
            group: "info",
            args: [
                {
                    key: 'content',
                    prompt: 'Please Provide the text you want me to decode!',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { content }) {
        this.client.stats(this.client, "cmd")
        try{
        let color;
        if(message.guild){
            color = message.member.displayColor;
        }else{
            color = "RANDOM";
        }
        const e = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setColor(color)
        .setTitle(`Morse Code Translator`)
        .setTimestamp()
            let translated = morse.decode(content);
            e.addField('📥 Original 📥', content, false)
            .addField('📤 Decoded 📤', translated, false)
        return message.channel.send(e)
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}
