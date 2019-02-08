module.exports.run = async (client, message, args, serverQueue, ops) => {
      if (ops.fun.checkPermission(client, message, "MANAGE_MESSAGES") === false) return;
      if (serverQueue && serverQueue.playing) {
            try {
                  serverQueue.playing = false;
                  serverQueue.connection.dispatcher.pause();
            } catch (error) {
                  console.error(error);
                  client.users.get(client.config.owner).send(`⚠ **Error \`pause command\`:**\n\`\`\`js\n${error.stack}\`\`\``);
                  return message.channel.send("⚠ **Error**, `The error state has been sent to the programmer!`");
            }
            return message.channel.send("⏸ **A-Music paused** for you!");
      }
      return message.channel.send("❌ **`There is nothing playing to pause!`**");
}

module.exports.help = {
      name: "pause",
      category: "Music"
}