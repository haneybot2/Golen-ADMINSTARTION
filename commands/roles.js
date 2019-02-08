module.exports.run = async (client, message, args, ops) => {
	if (ops.fun.checkPermission(client, message, "MANAGE_ROLES_OR_MANAGE_GUILD ") === false) return;
	const ros = message.guild.roles.size;
	const role = [];
	for (var i = 0; i < ros; i++) {
		if (message.guild.roles.array()[i].id !== message.guild.id) {
			role.push(message.guild.roles.filter(r => r.position == ros - i).map(r => `${i}- **${r.name}** | members ${message.guild.members.filter(m => m.roles.get(r.id) && !m.user.bot).size}`));
		}
	}
	message.channel.send({
		embed: {
			color: 0x36393e,
			description: role.join("\n")
		}
	})
}

module.exports.help = {
	name: "roles",
	aliases: [],
	category: "Admin"
}
