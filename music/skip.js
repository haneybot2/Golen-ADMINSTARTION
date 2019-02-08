module.exports.run = async (client, message, args, serverQueue, ops) => {
	if (ops.fun.checkPermission(client, message, "MANAGE_MESSAGES") === false) return;
	if (!message.member.voiceChannel) return message.channel.send("❌ **`You are not in a voice channel`**!");
	if (!serverQueue) return message.channel.send("❌ **`There is nothing playing to skip to.`**");
	if (!args[1]) {
		if (serverQueue.repeating) {
			serverQueue.repeating = false;
			serverQueue.connection.dispatcher.end("ForceSkipping command has been used!");
			serverQueue.repeating = true;
		} else {
			serverQueue.connection.dispatcher.end("Skip command has been used!");
		}
	} else {
		if (isNaN(args[1])) return message.channel.send("❌ **`Please specify the section number`**!");
		if (!serverQueue.songs[args[1] - 1]) return message.channel.send("ℹ **`There is no song with this number.`**");
		if (serverQueue.songs.length <= 2) return message.channel.send("ℹ **`You can not skip it and there's one or two songs.`**");
		try {
			for (var i = 1; i < (args[1] - 1); i++) {
				serverQueue.songs.shift();
			}
			serverQueue.connection.dispatcher.end("Skipping To..");
		} catch (error) {
			console.error(error);
			client.users.get(client.config.owner).send(`⚠ **Error \`skipTo command\`:**\n\`\`\`xl\n${error.stack}\`\`\``);
			return message.channel.send("⚠ **Error**, `The error state has been sent to the programmer`!");
		}
	}
	return undefined;
}

module.exports.help = {
	name: "skip",
	musics: ["sto"],
      category: "Music"
}