const {Command} = require('../../../util/Commando'),
Discord = require('discord.js');
const reps = require('../../../util/models/reps.js');
module.exports = class NCommand extends Command {
         constructor(client) {
           super(client, {
             name: 'repleaderboard',
             memberName: 'repleaderboard',
             aliases: [`rlb`,'replb'],
             examples: [`${client.commandPrefix}repleaderboard`],
             description: 'Shows the Reputation leaderboard.',
             group: 'fun'
})
}
        async run(message) {
          this.client.stats(this.client, "cmd", null, null, null)
try{
  //Grab all of the users in said server
    reps.find().sort([['reps', 'descending']]).exec(async (err, res) => {
    if (err) console.log(err);
    
    let embed = new Discord.RichEmbed()
      .setTitle("The Top 25 Reputation Leaders!")
      .setColor(`RANDOM`)
    // if there are no results
    let i;
    if (res.length === 0) {
    } else if (res.length < 10) {
        let user = await this.client.fetchUser(res[i].userID);
        if (res[i].reps !== 0) {
            embed.addField(`${i + 1}. ${user ? user.username : res[i].userTag}`, `${user ? `${user} \`${user.tag}\` (${user.id})`: res[i].userTag}\n**Reputation Points: **${res[i].reps}`)
        }
      //less than 10 results
      for (i = 0; i < res.length; i++) {
          let user = await this.client.fetchUser(res[i].userID);
          if (res[i].reps !== 0) {
               embed.addField(`${i + 1}. ${user ? user.username : res[i].userTag}`, `${user ? `${user} \`${user.tag}\` (${user.id})`: res[i].userTag}\n**Reputation Points: **${res[i].reps}`)
          }
      }
    } else {
      //more than 10 results
      for (i = 0; i < 10; i++) {
          let user = await this.client.fetchUser(res[i].userID);
           
          if (res[i].reps !== 0) {
               embed.addField(`${i + 1}. ${user ? user.username : res[i].userTag}`, `${user ? `${user} \`${user.tag}\` (${user.id})`: res[i].userTag}\n**Reputation Points: **${res[i].reps}`)
          }
      }
    }

    message.channel.send(embed);
  })
} catch (e) {
  this.client.error(this.client, message, e)
  this.client.logger(this.client, message.guild, e.stack, message, message.channel)
}
}
}
