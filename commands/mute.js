const ms = module.require("ms");

module.exports.run = async (client, message, args, ops) => {
	if (ops.fun.checkPermission(client, message, "MANAGE_MESSAGES") === false) return;
	const toMute = message.mentions.members.first() || message.guild.members.get(args[1]);
	if (!toMute) return message.channel.send(`ℹ **Usage: \`${client.config.prefix}mute [member] [time] [reason]\`**`);
	if (toMute.id === message.author.id) return message.channel.send("❌ **لا اظن انك يمكنك اعطاء ميوت لنفسك**!");
	if (toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("! لا تستطيع اعطاء ميوت لاحد اعلي منك رتبة");
	const role = message.guild.roles.find(r => r.name === "Muted");
	if (!role) {
		try {
			role = await message.guild.createRole({
				name: "Muted",
				color: "#000000",
				permissions: []
			});

			message.guild.channels.forEach(async (channel, id) => {
				await channel.overwritePermissions(role, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false
				});
			});
		} catch (e) {
			console.log(e.stack);
		}
	}
	if (toMute.roles.has(role.id)) return message.channel.send("❌ **this user is already muted**!");
	const { time, reason } = ops.fun.TimeReson(args, "1d");

	try {
		await toMute.addRole(role.id);
		message.channel.send(`✅ ${toMute.user} **Muted** 🤐`);
		message.guild.channels.get(client.config.log).send({
			embed: {
				color: 0x48ff00,
				author: {
					name: toMute.user.username,
					icon_url: toMute.user.displayAvatarURL
				},
				thumbnail: {
					url: toMute.user.displayAvatarURL
				},
				description: `<@${toMute.id}> **has been muted** 🤐`,
				fields: [
					{
						name: "By :",
						value: `<@${message.author.id}>`
					},
					{
						name: "Time of ban :",
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
			toMute.removeRole(role.id);
			console.log(`${toMute.user.username} [${toMute.id}] has been Unmuted!`);
		}, time);
	} catch (error) {
		console.error(error);
		client.users.get(client.config.owner).send(`⚠ **Error \`mute command\`:**\`\`\`js\n${error.stack}\`\`\``);
		return message.channel.send("⚠ **Error**, `The error state has been sent to the my programmer!`");
	}
}

module.exports.help = {
	name: "mute",
	aliases: [],
	category: "Admin"
}
