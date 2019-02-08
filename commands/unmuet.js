module.exports.run = async (client, message, args, ops) => {
	if (ops.fun.checkPermission(client, message, "MANAGE_MESSAGES") === false) return;
	const toUnmute = message.mentions.members.first() || message.guild.members.get(args[1]);
	if (!toUnmute) return message.channel.send(`:information_source:  **\`${client.config.prefix}unmute @َζ͜͡ELMEWAL3\` يجب تحديد شخص **`);
	const usernaem = toUnmute.username || toUnmute.user.username;
	const role = message.guild.roles.find(r => r.name === "Muted");
	if (!toUnmute.roles.has(role.id)) return message.channel.send(`:information_source: **تم فك الميوت عنه مسبقاً** !`);
	await toUnmute.removeRole(role)
	return message.channel.send(`:white_check_mark: **${usernaem} Unmuted** :smiley:`);
}

module.exports.help = {
	name: "unmute",
	aliases: ["unm"],
	category: "Admin"
}
