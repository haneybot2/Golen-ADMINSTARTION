module.exports.run = async (client, message, args, ops) => {
	if (ops.fun.checkPermission(client, message, "ADMINISTRATOR") === false) return;
	if (!args[1]) return message.channel.send(`ℹ **Usage: \`${client.config.prefix}obc [message]\`**`);
	const msgbc = args.slice(1).join(' ');
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
		msg.react('✅')
		await msg.react('❌');
		var yesEmoji = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
		var noEmoji = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
		const sendBC = msg.createReactionCollector(yesEmoji);
		const dontSendBC = msg.createReactionCollector(noEmoji);
		try {
			sendBC.on('collect', async () => {
				const msgcon = message.guild.members.filter(b => !b.user.bot);
				const msgwait = await message.channel.send('يتم الان ارسال رسالتك....');
				await msgcon.forEach(member => {
					member.send(msgbc.replace('[user]', member).replace('<user>', member));
					if (message.attachments.first()) {
						member.send({
							files: [
								{
									attachment: message.attachments.first().url,
									name: "Bc.png"
								}
							]
						});
					}
				});
				await msgwait.edit(`📣 **Your message has been sent to ${message.guild.memberCount} members**`);
				msg.delete();
			});
		} catch (error) {
			console.error(error);
			client.users.get(client.config.owner).send(`⚠ **Error \`bc command\`:**\`\`\`lx\n${error.stack}\`\`\``);
			return message.channel.send("⚠ **Error**, `The error state has been sent to the my programmer!`");
		}
		dontSendBC.on('collect', () => {
			message.channel.send('❌ **تم الغاء الطلب**');
			msg.delete();
		});
	});
}

module.exports.help = {
	name: "obc",
	aliases: [],
	category: "Admin"
}
