module.exports.run = async (client, message, args, ops) => {
	if (ops.fun.checkPermission(client, message, "MOVE_MEMBERS") === false) return;
	if (args[1] === "all") {
		if (!args[2]) {
			if (!message.member.voiceChannel) return message.channel.send("❌ **You need to be in a voice channel**");
			const authorChanelName = message.member.voiceChannel.name;
			const authorChannelID = message.member.voiceChannel.id;
			try {
				message.guild.members.filter(v => v.voiceChannel).forEach(m => m.setVoiceChannel(authorChannelID));
				message.guild.channels.get(client.config.log).send({
					embed: {
						color: 0x0900ff,
						author: {
							name: message.guild.name,
							icon_url: message.guild.iconURL
						},
						description: `👍 **All members have been move to \`${authorChanelName}\`**`,
						fields: [
							{
								name: "By :",
								value: `<@${message.author.id}>`
							}
						],
						footer: {
							text: message.author.tag,
							icon_url: message.author.displayAvatarURL
						},
						timestamp: new Date()
					}
				});
				return message.channel.send(`✅ **All members have been move to \`${authorChanelName}\`**`);
			} catch (error) {
				console.error(error);
				client.users.get(client.config.owner).send(`⚠ **Error \`move all to author command\`:**\`\`\`js\n${error.stack}\`\`\``);
				return message.channel.send("⚠ **Error**, `The error state has been sent to the my programmer!`");
			}
		} else {
			const channelVoice = message.guild.channels.find(c => c.type === "voice" && c.name === args.slice(2).join(" ")) || message.guild.roles.find(c => c.type === "voice" && r.name.toLowerCase().includes(args.slice(2).join(" "))) || message.guild.channels.get(args[2]);
			const roleMove = message.mentions.roles.first() || message.guild.roles.find(r => r.name.toLowerCase().includes(args.slice(2).join(" "))) || message.guild.roles.get(args[2]);
			if (channelVoice) {
				try {
					message.guild.members.filter(v => v.voiceChannel).forEach(m => m.setVoiceChannel(channelVoice.id));
					message.guild.channels.get(client.config.log).send({
						embed: {
							color: 0x0900ff,
							author: {
								name: message.guild.name,
								icon_url: message.guild.iconURL
							},
							description: `👍 **All members have been move to \`${channelVoice.name}\`**`,
							fields: [
								{
									name: "By :",
									value: `<@${message.author.id}>`
								}
							],
							footer: {
								text: message.author.tag,
								icon_url: message.author.displayAvatarURL
							},
							timestamp: new Date()
						}
					});
					return message.channel.send(`✅ **All members have been move to \`${channelVoice.name}\`**`);
				} catch (error) {
					console.error(error);
					client.users.get(client.config.owner).send(`⚠ **Error \`move all to ${newChanelName} command\`:**\`\`\`js\n${error.stack}\`\`\``);
					return message.channel.send("⚠ **Error**, `The error state has been sent to the my programmer!`");
				}
			} else if (roleMove) {
				if (!message.member.voiceChannel) return message.channel.send("❌ **You need to be in a voice channel**");
				const authorChanelName = message.member.voiceChannel.name;
				const authorChannelID = message.member.voiceChannel.id;
				try {
					message.guild.members.filter(v => v.voiceChannel && message.guild.member(v).roles.has(roleMove.id)).forEach(m => m.setVoiceChannel(authorChannelID));
					message.guild.channels.get(client.config.log).send({
						embed: {
							color: 0x0900ff,
							author: {
								name: message.guild.name,
								icon_url: message.guild.iconURL
							},
							description: `✅ **The \`${roleMove.name}\` role was moved to \`${authorChanelName}\`**`,
							fields: [
								{
									name: "By :",
									value: `<@${message.author.id}>`
								}
							],
							footer: {
								text: message.author.tag,
								icon_url: message.author.displayAvatarURL
							},
							timestamp: new Date()
						}
					});
					return message.channel.send(`✅ **The \`${roleMove.name}\` role was moved to \`${authorChanelName}\`**`);
				} catch (error) {
					console.error(error);
					client.users.get(client.config.owner).send(`⚠ **Error \`move all role to author command\`:**\`\`\`js\n${error.stack}\`\`\``);
					return message.channel.send("⚠ **Error**, `The error state has been sent to the my programmer!`");
				}
			}
		}
	} else {
		const userMove = message.mentions.members.first() || message.guild.members.get(args[1]);
		if (!userMove) return message.channel.send(`ℹ **Usage: \`${client.config.prefix}move [member] [channelName | channelMention | channelID]\`**`);
		const username = userMove.username || userMove.user.username;
		const useravatar = userMove.displayAvatarURL || userMove.user.displayAvatarURL;
		if (!userMove.voiceChannel) return message.channel.send('❌ **يجب ان يكون العضو في روم صوتي**');
		if (!args[2]) {
			if (!message.member.voiceChannel) return message.channel.send('❌ **`You are not in a voice channel`**!');
			const authorChanelName = message.member.voiceChannel.name;
			const authorChannelID = message.member.voiceChannel.id;
			if (authorChannelID === userMove.voiceChannel.id) return message.channel.send("❌ **The member is really in the voice channel**");
			try {
				userMove.setVoiceChannel(authorChannelID);
				message.guild.channels.get(client.config.log).send({
					embed: {
						color: 0x0900ff,
						author: {
							name: username,
							icon_url: useravatar
						},
						thumbnail: {
							url: useravatar
						},
						description: `<@${userMove.id}> **has been moved to \`${authorChanelName}\`**`,
						fields: [
							{
								name: "By :",
								value: `<@${message.author.id}>`
							}
						],
						footer: {
							text: message.author.tag,
							icon_url: message.author.displayAvatarURL
						},
						timestamp: new Date()
					}
				});
				return message.channel.send(`✅ ${userMove} **Moved to \`${authorChanelName}\`**`);
			} catch (error) {
				console.error(error);
				client.users.get(client.config.owner).send(`⚠ **Error \`move command\`:**\n\`\`\`js\n${error.stack}\`\`\``);
				return message.channel.send("⚠ **Error**, `The error state has been sent to the my programmer!`");
			}
		} else {
			const channelVoice = message.guild.channels.find(c => c.type === "voice" && c.name === args.slice(2).join(" ")) || message.guild.roles.find(c => c.type === "voice" && r.name.toLowerCase().includes(args.slice(2).join(" "))) || message.guild.channels.get(args[2]);
			if (!channelVoice) return message.channel.send("❌ **I can't find voice channel**");
			if (channelVoice.id === userMove.voiceChannel.id) return message.channel.send("❌ **The member is really in the voice channel**");
			try {
				userMove.setVoiceChannel(channelVoice.id);
				message.guild.channels.get(client.config.log).send({
					embed: {
						color: 0x0900ff,
						author: {
							name: username,
							icon_url: useravatar
						},
						thumbnail: {
							url: useravatar
						},
						description: `<@${userMove.id}> **has been moved to \`${channelVoice.name}\`**`,
						fields: [
							{
								name: "By :",
								value: `<@${message.author.id}>`
							}
						],
						footer: {
							text: message.author.tag,
							icon_url: message.author.displayAvatarURL
						},
						timestamp: new Date()
					}
				});
				return message.channel.send(`✅ ${userMove} **Moved to \`${channelVoice.name}\`**`);
			} catch (error) {
				console.error(error);
				client.users.get(client.config.owner).send(`⚠ **Error \`move command\`:**\n\`\`\`js\n${error.stack}\`\`\``);
				return message.channel.send("⚠ **Error**, `The error state has been sent to the my programmer!`");
			}
		}
	}
}

module.exports.help = {
	name: "move",
	category: "Admin"
}
