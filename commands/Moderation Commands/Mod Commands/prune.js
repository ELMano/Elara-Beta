const { Command } = require('../../../util/Commando');

module.exports = class CleanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'clean',
            aliases: ['purge', 'prune', 'clear', "nuke"],
            group: 'mod',
            memberName: 'clean',
            clientPermissions: ["MANAGE_MESSAGES"],
            description: 'Deletes messages.',
            details: `Deletes messages. Here is a list of filters:
				__invites:__ Messages containing an invite
				__user @user:__ Messages sent by @user
				__bots:__ Messages sent by bots
				__you:__ Messages sent by the bot
				__uploads:__ Messages containing an attachment
				__links:__ Messages containing a link`,
            guildOnly: true,
            throttling: {
                usages: 2,
                duration: 3
            },

            args: [
                {
                    key: 'limit',
                    prompt: 'how many messages would you like to delete?\n',
                    type: 'integer'
                },
                {
                    key: 'filter',
                    prompt: 'what filter would you like to apply?\n',
                    type: 'string',
                    default: '',
                    parse: str => str.toLowerCase()
                },
                {
                    key: 'member',
                    prompt: 'whose messages would you like to delete?\n',
                    type: 'member',
                    default: ''
                }
            ]
        });
    }
    async run(msg, { filter, limit, member }) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, msg, "MANAGE_MESSAGES")) return;
        try{
        if(limit > 100) limit = 100;
        msg.delete(100).catch()
        let messageFilter;

        if (filter) {
            if (filter === 'invite' || filter === "invites") {
                messageFilter = message => message.content.search(/(discord\.gg\/.+|discordapp\.com\/invite\/.+)/i)
                    !== -1;
            } else if (filter === 'user' || filter === 'member' || filter === 'members' || filter === "users") {
                if (member) {
                    const { user } = member;
                    messageFilter = message => message.author.id === user.id;
                } else {
                    return msg.say(`${msg.author}, you have to mention someone.`);
                }
            } else 
            if (filter === 'bots' || filter === "bot" || filter === "robots" || filter === "robot") {
                messageFilter = message => message.author.bot;
            } else 
            if (filter === 'you') {
                messageFilter = message => message.author.id === this.client.user.id;
            } else 
            if (filter === 'upload' || filter === "photos" || filter === "images") {
                messageFilter = message => message.attachments.size !== 0;
            } else
            if (filter === 'links' || filter === "urls") {
                messageFilter = message => message.content.search(/https?:\/\/[^ \/\.]+\.[^ \/\.]+/) !== -1; // eslint-disable-line no-useless-escape, max-len
            } else {
                return msg.say(`${msg.author}, this is not a valid filter. \`help clean\` for all available filters.`);
            }

            /* eslint-disable no-unused-vars, handle-callback-err */
            const messages = await msg.channel.fetchMessages({ limit }).catch(err => null);
            const messagesToDelete = messages.filter(messageFilter);
            msg.channel.bulkDelete(messagesToDelete.array().reverse()).catch(err => null);

            return null;
        }

        const messagesToDelete = await msg.channel.fetchMessages({ limit }).catch(err => null);
        msg.channel.bulkDelete(messagesToDelete.array().reverse()).catch(err => null)

        return null;

        
        } catch (e) {
            this.client.error(this.client, msg, e);
        this.client.logger(this.client, msg.guild, e.stack, msg, msg.channel)
        }
    }
};