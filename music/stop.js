module.exports.run = async (client, message, args, serverQueue, ops) => {
      if (ops.fun.checkPermission(client, message, "MANAGE_MESSAGES") === false) return;
      if (!message.member.voiceChannel) return message.channel.send("❌ **`You are not in a voice channel`**!");
      if (!serverQueue && !message.guild.me.voiceChannel) return message.channel.send("❌ **`There is nothing playing to stop to.`**");
      try {
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end("Stop command has been used!");
            serverQueue.voiceChannel.leave();
      } catch (error) {
            console.error(error);
            client.users.get(client.config.owner).send(`⚠ **Error \`stop command\`:**\n\`\`\`js\n${error.stack}\`\`\``);
            return message.channel.send("⚠ **Error**, `The error state has been sent to the programmer`!");
      }
      return message.channel.send("🎵 **A-Music stopped** for you!");
}

module.exports.help = {
      name: "stop",
      musics: ["s"],
      category: "Music"
}