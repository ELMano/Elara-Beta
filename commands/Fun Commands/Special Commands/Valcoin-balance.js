const {Command} = require('../../../util/Commando'),
Discord = require('discord.js');
const vcoins = require('../../../util/models/VALCOINS.js');
module.exports = class NCommand extends Command {
         constructor(client) {
           super(client, {
             name: 'vbalance',
             memberName: 'vbalance',
             aliases: [`vbal`, `vh=`],
             examples: [`${client.commandPrefix}vbalance @user/id/name`],
             description: 'Checks the VAL Heartagram balance of you or another user.',
             group: 'special',
             guildOnly: true,
             args: [
                {
                    key: 'user',
                    prompt: "What user do you want to check the balance for?",
                    type: 'user',
                    default: message => message.author
                }
              ]
})
}
        async run(message, {user}) {
            this.client.stats(this.client, "cmd", null, null, null)
            try{
        if(user.bot) return;
        vcoins.findOne({userID: user.id, guildID: message.guild.id}, async (err, db) => {
            if(!db){
                return message.channel.send(`You don't have any heartagrams in the database.`)
            }else{
                let e = new Discord.RichEmbed()
                .setAuthor(user.tag, user.displayAvatarURL)
                .setColor(`RANDOM`)
                .addField(`Balance`, `${db.vcoins} <a:Heartagram:520544378104709120> Heartagrams`)
                message.channel.send(e)
            }
        })
            } catch (e) {
                this.client.error(this.client, message, e);
                this.client.logger(this.client, message.guild, e.stack, message, message.channel)
            }
}
}