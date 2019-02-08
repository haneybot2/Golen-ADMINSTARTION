module.exports.run = async (client, message, args, ops) => {
	if (ops.fun.checkPermission(client, message, "MANAGE_MESSAGES") === false) return;
	const online = message.guild.members.filter(m => m.presence.status === "online").size;
	const idle = message.guild.members.filter(m => m.presence.status === "idle").size;
	const dnd = message.guild.members.filter(m => m.presence.status === "dnd").size;
	const offline = message.guild.members.filter(m => m.presence.status === "offline").size;
	return message.channel.send({
		embed: {
			color: 0x36393e,
			author: {
				name: "Members status ✨"
			},
			description: `**Online:** \`${online}\`\n**Idle:** \`${idle}\`\n**DND:** \`${dnd}\`\n**Offline:** \`${offline}\`\n**Bots:** \`${message.guild.members.filter(m => m.user.bot).size}\`\n**Server Members:** \`${message.guild.members.filter(m => !m.user.bot).size}\``,
			footer: {
				text: message.author.tag,
				icon_url: message.author.displayAvatarURL
			},
			timestamp: new Date()
		}
	});
}

module.exports.help = {
	name: "members",
	aliases: [],
	category: "Admin"
}
