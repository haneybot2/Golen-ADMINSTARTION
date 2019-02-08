module.exports.run = async (client, message, args, ops) => {
	if (!message.member.hasPermission("MANAGE_MESSAGES")) return undefined;
	if (!args[1]) return message.channel.send({
		embed: {
			color: 0x36393e,
			title: "Please, write any of the following commands",
			description: `**${client.config.prefix}set name**: set my name\n**${client.config.prefix}set avatar**: set my avatar\n**${client.config.prefix}set game**: set my game\n**${client.config.prefix}set status**: set my status\n**${client.config.prefix}set server name**: set the name of server\n**${client.config.prefix}set server icon**: set the icon of server`,
			footer: {
				text: `Requested by ${message.author.tag}`,
				icon_url: message.author.displayAvatarURL
			}
		}
	});
	if (args[1] === "name") {
		if (message.author.id !== client.config.owner) return console.log(`${message.author.tag} used command set name [X]`);
		const username = args.slice(2).join(" ");
		if (!username) return message.channel.send("**I'm sorry my friend but, you need put a NEWNAME for me, Hmm**");
		client.user.setUsername(username).catch(error => {
			console.error(error);
			client.users.get(client.config.owner).send(`⚠ **Error \`set My name command\`:**\`\`\`js\n${error.stack}\`\`\``);
			return message.channel.send("⚠ **Error**, `The error state has been sent to you, Ok my programmer!`");
		});
		return message.channel.send(`🆗 My name is changed to: **\`${username}\`**`);
	} else if (args[1] === "avatar" || args[1] === "ava") {
		if (message.author.id !== client.config.owner) return console.log(`${message.author.tag} used command set avatar [X]`);
		const icon = message.attachments.first() || args.slice(2).join(" ");
		if (!icon) return message.channel.send("**I'm sorry my friend but, you need put a picture for me, Hmm**");
		client.user.setAvatar(icon).catch(error => {
			console.error(error);
			client.users.get(client.config.owner).send(`⚠ **Error \`set My avatar command\`:**\`\`\`js\n${error.stack}\`\`\``);
			return message.channel.send("⚠ **Error**, `The error state has been sent to you, Ok my programmer!`");
		});
		return message.channel.send(`🆗 My avatar is changed to: **\`${icon}\`**`);
	} else if (args[1] === "prefix") {
		if (message.author.id !== client.config.owner) return console.log(`${message.author.tag} used command set prefix [X]`);
		if (!args[2]) return message.channel.send(`**Usage: \`${client.config.prefix}set prefix [NewPrefix]\`**`);
		if (args[2] === client.config.prefix) return message.channel.send(`**\`${args[2]}\` is actually the Prefix**!`);
		client.config.prefix = args[2];
		return message.channel.send({
			embed: {
				color: 0x36393e,
				title: "Prefix set, oh my god!",
				sescription: `**My prefix Set to:** \`${args[2]}\``
			}
		});
	} else if (args[1] === "game") {
		if (message.author.id !== client.config.owner) return console.log(`${message.author.tag} used command set prefix [X]`);
		if (!args[2]) return message.channel.send(`**Usage: \`${client.config.prefix}set game [type_of_game] [game]\`**`, {
			embed: {
				color: 0x36393e,
				description: `**Type of game** : \`playing\`, \`watching\`, \`listeing\`, \`streming\`\nIf you want to reset the situation as it was used **${client.config.prefix}set game restart**`,
				footer: {
					text: `Requested by ${message.author.tag}`,
					icon_url: message.author.displayAvatarURL
				}
			}
		});
		const game = args.slice(3).join(" ");
		if (args[2] === "playing") {
			if (!game) return message.channel.send(`❌ **My game activity must be entered**`);
			client.user.setActivity(game, { type: "PLAYING" });
			return message.channel.send(`✅ **\`Playing changed to:\` ${game}**`);
		} else if (args[2] === "watching") {
			if (!game) return message.channel.send(`❌ **My game activity must be entered**`);
			client.user.setActivity(game, { type: "WATCHING" });
			return message.channel.send(`✅ **\`Watching changed to:\` ${game}**`);
		} else if (args[2] === "listeing") {
			if (!game) return message.channel.send(`❌ **My game activity must be entered**`);
			client.user.setActivity(game, { type: "LISTENING" });
			return message.channel.send(`✅ **\`Listening changed to:\` ${game}**`);
		} else if (args[2] === "streming") {
			if (!game) return message.channel.send(`❌ **My game activity must be entered**`);
			client.user.setActivity(game, { type: "STREAMING", url: "https://www.twitch.tv/idk" });
			return message.channel.send(`✅ **\`Streming changed to:\` ${game}**`);
		} else if (args[2] === "restart" || args[2] === "rest") {
			client.user.setActivity(null);
			return message.channel.send("✅ **`Restart game`**");
		} else {
			let offgame = args.slice(2).join(" ");
			client.user.setActivity(offgame, { type: "PLAYING" });
			return message.channel.send(`✅ **\`Playing changed to:\` ${offgame}**`);
		}
	} else if (args[1] === "status") {
		if (!args[2]) return message.channel.send("**`ONLINE`, `IDLE`, `DND`, `INVISIBLE` : يجب تحديد الحالة ما بين**");
		if (args[2] === "online") {
			client.user.setStatus("online");
			return message.channel.send("✅ **Status changed to: `ONLINE`**");
		} else if (args[2] === "idle") {
			client.user.setStatus("idle");
			return message.channel.send("✅ **Status changed to: `IDLE`**");
		} else if (args[2] === "dnd") {
			client.user.setStatus("dnd");
			return message.channel.send("✅ **Status changed to: `DND`**");
		} else if (args[2] === "ofline") {
			client.user.setStatus("invisible");
			return message.channel.send("✅ **Status changed to: `INVISIBLE`**");
		}
	} else if (args[1] === "server") {
		if (ops.fun.checkPermission(client, message, "MANAGE_GUILD") === false) return;
		if (args[2] === "avatar" || args[2] === "ava" || args[2] === "icon") {
			const newserverava = message.attachments.first() || args[3];
			if (!newserverava) return message.channel.send("**Sorry but, you must be enter the server icon, man**");
			try {
				message.guild.owner.send(`**[<@${message.guild.owner.id}>]\nThe server icon has been changed!\nBy: <@${message.author.id}>\nOld icon: ${message.guild.iconURL}\nNew icon: ${newserverava}**`);
				message.guild.setIcon(newserverava);
				return message.channel.send(`👍 **The server icon has been changed to:** ${newserverava}`);
			} catch (error) {
				console.error(error);
				client.users.get(client.config.owner).send(`⚠ **Error \`set server icon command\`:**\`\`\`js\n${error.stack}\`\`\``);
				return message.channel.send("⚠ **Error**, `The error state has been sent to the my programmer!`");
			}
		} else if (args[2] === "name") {
			const newserveranme = args.slice(3).join(" ");
			if (!newserveranme) return message.channel.send("**Sorry but, you must be enter the server name, man**");
			try {
				message.guild.owner.send(`**[<@${message.guild.owner.id}>]\nThe server name has been changed!\nBy: <@${message.author.id}>**`, {
					embed: {
						color: 0x36393e,
						fields: [
							{
								name: "Old name :",
								value: message.guild.name,
								inline: true
							},
							{
								name: "New name :",
								value: newserveranme,
								inline: true
							}
						],
						footer: {
							text: message.author.tag,
							icon_url: message.author.displayAvatarURL
						},
						timestamp: new Date()
					}
				});
				message.guild.setName(newserveranme);
				return message.channel.send(`👍 **The server name has been changed to:** \`${newserveranme}\``);
			} catch (error) {
				console.error(error);
				client.users.get(client.config.owner).send(`⚠ **Error \`set server name command\`:**\`\`\`js\n${error.stack}\`\`\``);
				return message.channel.send("⚠ **Error**, `The error state has been sent to the my programmer!`");
			}
		}
	}
}

module.exports.help = {
	name: "set",
	aliases: [],
	category: "Admin"
}
