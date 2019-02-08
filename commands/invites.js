module.exports.run = async (client, message, args, ops) => {
      const target = message.mentions.members.first() || message.guild.members.get(args[1]) || message.author;
      message.guild.fetchInvites().then(invites => {
            const invitesConta = invites.filter(i => i.inviter.id === target.id).reduce((p, v) => v.uses + p, 0);
            return message.channel.send(`**The number of your invitations is: \`${invitesConta}\`**`);
      });
}

module.exports.help = {
	name: "invites",
	aliases: ["inv"],
	category: "General"
}
