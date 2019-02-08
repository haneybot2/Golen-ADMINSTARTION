module.exports.run = async (client, message, args, ops) => {
	if (ops.fun.checkPermission(client, message, "ADMINISTRATOR") === false) return;
	if (!args[1]) return message.channel.send(`ℹ **Usage: \`${client.config.prefix}bc [message]\`**`);
	const msgbc = args.slice(1).join(" ");
	message.channel.send({
		embed: {
			color: 0x36393e,
			author: {
				name: message.author.username,
				icon_url: message.author.displayAvatarURL
			},
			title: "هل انت متاكد من ارسال الرساله"
		}
	}).then(async msg => {
		msg.react("✅")
		await msg.react("❌");
		var yesEmoji = (reaction, user) => reaction.emoji.name === "✅" && user.id === message.author.id;
		var noEmoji = (reaction, user) => reaction.emoji.name === "❌" && user.id === message.author.id;
		const sendBC = msg.createReactionCollector(yesEmoji);
		const dontSendBC = msg.createReactionCollector(noEmoji);
		try {
			sendBC.on("collect", async () => {
				const msgcon = message.guild.members.filter(member => member.presence.status !== "offline" && !member.user.bot);
				let msgwait = await message.channel.send("Now send your message....");
				await msgcon.forEach(member => {
					member.send(msgbc.replace("[user]", member).replace("<user>", member));
					if (message.attachments.first()) {
						member.send({
							files: [
								{
									attachment: message.attachments.first().url,
									name: "bc.png"
								}
							]
						});
					}
				});
				msg.delete();
				return msgwait.edit(`📣 **Your message has been sent to ${msgcon.size} members**`);
			});
		} catch (error) {
			console.error(error);
			client.users.get(client.config.owner).send(`⚠ **Error \`bc command\`:**\`\`\`lx\n${error.stack}\`\`\``);
			return message.channel.send("⚠ **Error**, `The error state has been sent to the my programmer!`");
		}
		dontSendBC.on("collect", () => {
			message.channel.send("❌ **Your order has been canceled**");
			msg.delete();
		});
	});
}

module.exports.help = {
	name: "bc",
	description: "Send a message to the server members online",
	comprehensive: "You can use the command to send a message to all members online of the server only",
	examples: "!bc hello guys, how are you",
	usage: "bc [message]",
	category: "Admin"
}
