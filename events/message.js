const Discord = require('discord.js');
const cooldown = new Set();
module.exports.run = async (client, message) => {
    let msg = message;
    if (message.author.bot) return;
    try{
    if(message.guild){
    let db = await client.db.findOne({guildID: message.guild.id}, (err, settings) => {settings})
    if(message.author.tag.includes('#0000')) return;
    if(message.content.startsWith(db.prefix || client.commandPrefix)){
        return;
    }else{
        if(message.channel.name.includes("spam")) return;
        if (message.guild.id === "264445053596991498") return;
        if(cooldown.has(message.author.id)){
            return;
        }
        if(!client.isOwner(message.author.id)){
            cooldown.add(message.author.id);
        }
        setTimeout(() => {
            cooldown.delete(message.author.id);
        }, 6 * 10000)
    }
    client.coins(client, message);
    client.db.findOne({ guildID: message.guild.id }, (err, settings) => {
        if (err) console.log(err);
        if (settings) {
            if (settings.prefix == "") return;
            message.guild._commandPrefix = settings.prefix
        }
    });
    if(message.author.bot === false){
        client.stats(client, null, message, null, null);
    }
}
 if (message.channel.name === "server-suggestions" || message.channel.name === "📝server-suggestions📝" || message.channel.name === "suggestions" || message.channel.name === "suggestion" || message.channel.name === "server-suggestion" || message.channel.name === "📝suggestions" || message.channel.name === "📝suggestions📝" || message.channel.name === "suggestions📝") {
        if (message.author.id === "288450828837322764" || message.author.id === "248947473161256972") return;
        if(message.author.id === message.guild.ownerID) return;
            message.react("✅")
            message.react("❌")
    }
     if (message.channel.name === "❔weekly-riddle-answer" || message.channel.name === "weekly-riddle-answer") {
            if(message.author.bot) return;
            if(message.guild.id === "273525914187333637"){
            if(!message.member.roles.has("302515743151357962")){return message.delete().catch();}
            }
            let riddleanswers = message.guild.channels.find(c => c.name === "elara-log") || message.guild.channels.find(c => c.name === "🤖elara-log")
            if(!riddleanswers) return;
            let role = message.guild.roles.find(c => c.name === "Riddle Submitted").id;
            if(message.member.roles.has(role)){return message.delete().catch()}
            message.member.addRole(role)
            message.delete().catch()
            let riddleembed = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL)
                .setTimestamp()
                .setFooter(`Riddle submitted at`)
                .setTitle(`Riddle submitted`)
                .setDescription(`${message.content}`)
            riddleanswers.send(riddleembed)

            //Dms the user.
            let dmembed = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setDescription(`
                Your riddle answer has been submitted
                You Have been given the **Riddle Submitted** Role.
                Which means you won't be able to submit another answer until next week.`)
                .setTimestamp()
                .setFooter(`Answer Submitted At`)
                .setAuthor(message.author.tag, message.author.displayAvatarURL)
            message.author.send(dmembed);
        
            }
} catch (e) {
client.logger(client, message.guild, e.stack, message, message.channel)
}
}
