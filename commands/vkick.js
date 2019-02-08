module.exports.run = async (client, message, args, ops) => {
	if (ops.fun.checkPermission(client, message, "MANAGE_CHANNELS") === false) return;
	const toVkick = message.mentions.members.first() || message.guild.members.get(args[1]);
	if (!toVkick) return message.channel.send(`ℹ **Usage: \`${client.config.prefix}vkick [member]\`**`);
	if (!toVkick.voiceChannel) return message.channel.send('**اسف ,ولكن العضو ليس في روم صوتي**');
	if (toVkick.id === message.author.id) return message.channel.sendMessage('❌ **لا اظن ذلك**!!');
	if (toVkick.highestRole.position >= message.member.highestRole.position) return message.channel.sendMessage('لا يمكن طرد احد صوتيا من الادارة...');
	const username = toVkick.username || toVkick.user.username;
	const useravatar = toVkick.displayAvatarURL || toVkick.user.displayAvatarURL;
	await message.guild.createChannel('voiceKick :D', 'voice', [
		{
			id: toVkick.id,
			deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK']
		}
	]).then(c => {
		toVkick.setVoiceChannel(c).then(() => {
			c.delete(500).catch(e => console.log(e));
			message.guild.channels.get(client.config.log).send({
				embed: {
					color: 0x0aff00,
					author: {
						name: username,
						icon_url: useravatar
					},
					thumbnail: {
						url: useravatar
					},
					description: `<@${toVkick.id}> **has been kicked out of \`${toVkick.voiceChannel.name}\`**`,
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
			return message.channel.send(`✅ **${username} Voice kicked**`);
		});
	});
}

module.exports.help = {
	name: "vkick",
	category: "Admin"
}
