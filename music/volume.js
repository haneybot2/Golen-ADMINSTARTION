module.exports.run = async (client, message, args, serverQueue, ops) => {
	if (ops.fun.checkPermission(client, message, "MANAGE_MESSAGES") === false) return;
	if (!message.member.voiceChannel) return message.channel.send("❌ **`You are not in a voice channel`**!");
	if (!serverQueue) return message.channel.send("❌ **`There is nothing playing`**");
	if (!args[1]) return message.channel.send(`${(serverQueue.volume <= 100) ? "🔉" : "🔊"} Current volume: **${serverQueue.volume}**`);
	let volume = parseInt(args[1]);
	if (isNaN(volume)) {
		switch (args[1].toLowerCase()) {
			case "up": case "+":
				volume = serverQueue.volume + 20;
				break;
			case "down": case "-":
				volume = serverQueue.volume - 20;
				break;
			default:
				return message.channel.send("🚫 `Please input a number between [1-200]`");
		}
	}
	if (volume > 200 || volume <= 0) return message.channel.send("🚫 `Please input a number between [1-200]`");
	try {
		serverQueue.volume = volume;
		ops.setV[message.guild.id].vol = volume;
		serverQueue.connection.dispatcher.setVolume(Math.round(Number(serverQueue.volume)) / 200);
	} catch (error) {
		console.error(error);
		client.users.get(client.config.owner).send(`⚠ **Error \`volume command\`:**\n\`\`\`js\n${error.stack}\`\`\``);
		return message.channel.send("⚠ **Error**, `The error state has been sent to the programmer`!");
	}
	return message.channel.send(`${(serverQueue.volume <= 100) ? "🔉" : "🔊"} **A-Volume** changed to: **${serverQueue.volume}**`);
}

module.exports.help = {
	name: "volume",
	musics: ["vol"],
      category: "Music"
}
