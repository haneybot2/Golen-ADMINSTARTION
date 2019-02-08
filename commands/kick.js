module.exports.run = async (client, message, args, ops) => {
	if (ops.fun.checkPermission(client, message, "KICK_MEMBERS") === false) return;
	const toKick = message.mentions.members.first() || message.guild.members.get(args[1]);
	if (!toKick) return message.channel.send(`ℹ **Usage: \`${client.config.prefix}kick [member] [reason]\`**`);
	if (toKick.id === message.author.id) return message.channel.send('❌ **لا اظن انك يمكنك طرد نفسك**!!');
	if (toKick.highestRole.position >= message.member.highestRole.position) return message.channel.send('لا يمكن طرد احد من الادارة...');
	const reason = args.slice(2).join(' ');
	if (!reason) reason = 'No reason';
	const username = toKick.username || toKick.user.username;
	const useravatar = toKick.displayAvatarURL || toKick.user.displayAvatarURL;
	try {
		await message.guild.member(toKick).kick(reason);
		message.guild.channels.get(client.config.log).send({
			embed: {
				color: 0xff0000,
				author: {
					name: username,
					icon_url: useravatar
				},
				thumbnail: {
					url: useravatar
				},
				description: `<@${toKick.id}> **has been kicked from server**`,
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
		return message.channel.send(`✅ **${username} Kicked from server.**`);
	} catch (error) {
		console.error(error);
		client.users.get(client.config.owner).send(`⚠ **Error \`kick command\`:**\`\`\`js\n${error.stack}\`\`\``);
		return message.channel.send("⚠ **Error**, `The error state has been sent to the my programmer!`");
	}
}

module.exports.help = {
	name: "kick",
	aliases: [],
	category: "Admin"
}
