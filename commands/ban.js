const ms = module.require("ms");

module.exports.run = async (client, message, args, ops) => {
	if (ops.fun.checkPermission(client, message, "BAN_MEMBERS") === false) return;
	const toBan = message.mentions.members.first() || message.guild.members.get(args[1]);
	if (!toBan) return message.channel.send(`ℹ **Usage: \`${client.config.prefix}ban [member] [time] [reason]\`**`);
	if (toBan.id === message.author.id) return message.channel.send("❌ **`لا اظن انك يمكنك تبنيد نفسك`**!!");
	if (toBan.highestRole.position >= message.member.highestRole.position) return message.channel.send("لا يمكن تبنيد احد من الادارة...");
	const { time, reason } = ops.fun.TimeReson(args, "5d");

	try {
		message.guild.member(toBan).ban(reason);
		message.channel.send(`✅ ${toBan.user} **Baned from the server.**`);
		message.guild.owner.send(`**[${message.guild.owner}]\n<@${toBan.id}> has been baned from server 🔨\nBy: ${message.author}\nTime: ${ms(ms(time), { long: true })}\nReason: **\`\`\`js\n${reason}\`\`\``);
		message.guild.channels.get(client.config.log).send({
			embed: {
				color: 0xff0000,
				author: {
					name: toBan.user.username,
					icon_url: toBan.user.displayAvatarURL
				},
				thumbnail: {
					url: toBan.user.displayAvatarURL
				},
				description: `🔨 <@${toBan.id}> **has been baned from server**`,
				fields: [
					{
						name: "By :",
						value: `<@${message.author.id}>`
					},
					{
						name: "Time ban :",
						value: ms(time, { long: true })
					},
					{
						name: "Reason :",
						value: `\`\`\`css\n${reason}\`\`\``
					}
				],
				footer: {
					text: message.author.tag,
					icon_url: message.author.displayAvatarURL
				},
				timestamp: new Date()
			}
		});
		setTimeout(function () {
			message.guild.unban(toBan);
			console.log(`${toBan.user.username} [${toBan.id}] has been Unbaned!`);
		}, time);
	} catch (error) {
		console.error(error);
		client.users.get(client.config.owner).send(`⚠ **Error \`ban command\`:**\`\`\`lx\n${error.stack}\`\`\``);
		return message.channel.send("⚠ **Error**, `The error state has been sent to the my programmer!`");
	}
}

module.exports.help = {
	name: "ban",
	description: "Ban the member from the server",
	comprehensive: "You can use this to ban the member from the server and you can set the time at which the ban will be unban and you can set a description of the ban, and you can also place it and will be set the default time 5 days",
	examples: "!ban @RedDead | !ban 454527533279608852 | !ban @RedDead سوي سبام | !ban @RedDead 2b انا لا اعرفه",
	usage: "ban [@user/userID] [time] [reason]",
	category: "Admin"
}
