module.exports.run = async (client, message, args, ops) => {
	if (ops.fun.checkPermission(client, message, "ADMINISTRATOR") === false) return;
	if (!args[1] || !args[2]) return message.channel.send(`ℹ **Usage: \`${client.config.prefix}bcrole [role_name] [message]\`**`);
	try {
		const roleM = message.mentions.roles.first() || message.guild.roles.find(r => r.id === args[1].join(" ") && r.name === args[2].join(" ")) || message.guild.roles.get(args[1]);
		if (!roleM) return message.channel.send("❌ **I can't find role**");
		const msgrole = args.slice(2).join(" ");
		const memberss = message.guild.members.filter(m => m.roles.get(roleM.id));
		memberss.forEach(async sm => {
			let msgwait = await message.channel.send("Now send your message....");
			await sm.send(msgrole.replace('[user]', sm).replace('<user>', sm));
			if (message.attachments.first()) {
				sm.send({
					files: [
						{
							attachment: message.attachments.first().url,
							name: "bcrole.png"
						}
					]
				});
			}
			msg.delete();
			return msgwait.edit(`📣 **Your message has been sent to ${memberss.size} members**`);
		});
	} catch (error) {
		console.error(error);
		client.users.get(client.config.owner).send(`⚠ **Error \`bcrole command\`:**\`\`\`js\n${error.stack}\`\`\``);
		return message.channel.send("⚠ **Error**, `The error state has been sent to the my programmer!`");
	}
}

module.exports.help = {
	name: "bcrole",
	aliases: ["brole", "bcr"],
	category: "Admin"
}
