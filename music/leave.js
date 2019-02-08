module.exports.run = async (client, message, args, serverQueue, ops) => {
	if (!message.member.voiceChannel) return message.channel.send("❌ **`You need to be in a voice channel !`**");
	if (!message.guild.me.voiceChannel) return message.channel.send("❌ **`I am already not connected to the voice channel!`**");
      if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send("❌ **`You are not connected to the same channel!`**");
	try {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
                  serverQueue.connection.dispatcher.pause();
		}
            message.guild.me.voiceChannel.leave();
            return message.channel.send("📤 **Leaving channel**");
	} catch (error) {
		console.error(error);
		client.users.get(dev).send(`⚠ **Error \`leave command\`:**\n\`\`\`js\n${err.stack}\`\`\``);
		return statusMsg.edit("⚠ **Error**, `The error state has been sent to the programmer`!");
	}
}

module.exports.help = {
	name: "leave",
	category: "Music"
}