const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const morse = require('morse-node').create('ITU');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "encode",
            memberName: "encode",
            aliases: [],
            examples: [`${client.commandPrefix}encode <text here>`],
            description: "Turns the text you give into morse code",
            group: "info",
            args: [
                {
                    key: 'content',
                    prompt: 'Please Provide the text you want me to turn into morse code?!',
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
            let translated = morse.encode(content);
            e.addField('📥 Original 📥', content, false)
            .addField('📤 Encoded 📤', translated, false)
        return message.channel.send(e)
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}
