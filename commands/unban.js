module.exports.run = async (client, message, args, ops) => {
	if (ops.fun.checkPermission(client, message, "BAN_MEMBERS") === false) return;
	if (!args[1]) return message.channel.send(`:information_source: **Usage: \`${client.config.prefix}unban [userID] [reason]\`**.`);
	try {
		let bans = await message.guild.fetchBans();
		const banned = bans.get(args[1]) || bans.find(u => u.tag.toLowerCase().includes(args[1].toLowerCase()));
		if (!banned) return message.channel.send("**`لم استطع ايجاد هذا العضو`**");
		if (banned.id === message.author.id) return message.channel.send("**`يا لك من غريب ,كيف تفك البان عنك بنفسك`**");
		if (banned.id === message.guild.owner.id) return message.channel.send("**`لا اظن انك ستنجح`** ._.");
		const reason = message.content.split(" ").slice(2).join(" ");
		if (!reason) return message.channel.send("**`عليك كتابة سبب ازالة الحظر عن الشخص`**");

		await message.guild.unban(banned);
		message.guild.owner.send(`**[${message.guild.owner}]\nThe ban has been unblocked about <@${banned.id}>\nBy : ${message.author}\nReason :**\`\`\`js\n${reason}\`\`\``)
		message.channel.send(`:white_check_mark: <@${banned.id}> **Unbanned from server**`);
		return message.guild.channels.get(client.config.log).send({
			embed: {
				color: 0x000000,
				author: {
					name: message.guild.name,
					icon_url: message.guild.iconURL
				},
				thumbnail: {
					url: message.author.displayAvatarURL
				},
				description: `**<@${banned.id}> has been unban from the server**`,
				fields: [
					{
						name: "By :",
						value: `<@${message.author.id}>`
					},
					{
						name: "Reason :",
						value: `\`\`\`js\n${reason}\`\`\``
					}
				],
				footer: {
					text: message.author.tag,
					icon_url: message.author.displayAvatarURL
				},
				timestamp: new Date()
			}
		});
	} catch (error) {
		console.error(error);
		client.users.get(client.config.owner).send(`⚠ **Error \`unban command\`:**\`\`\`js\n${error.stack}\`\`\``);
		return message.channel.send("⚠ **Error**, `The error state has been sent to the my programmer!`");
	}
}

module.exports.help = {
	name: "unban",
	aliases: ["unb"],
	category: "Admin"
}
