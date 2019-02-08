module.exports.run = async (client, message, args, ops) => {
	if (ops.fun.checkPermission(client, message, "BAN_MEMBERS") === false) return;
	return message.guild.fetchBans().then(bans => message.channel.send(`**Number of banned persons: \`${bans.size}\`**`));
}

module.exports.help = {
	name: "bans",
	description: "To see the number of civilizations in the server",
	comprehensive: "You can use it to see how many people have been baned in the server",
	examples: "!bans",
	usage: "bans",
	category: "Admin"
}
