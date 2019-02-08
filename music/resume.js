module.exports.run = async (client, message, args, serverQueue, ops) => {
      if (ops.fun.checkPermission(client, message, "MANAGE_MESSAGES") === false) return;
      if (serverQueue && !serverQueue.playing) {
            try {
                  serverQueue.playing = true;
                  serverQueue.connection.dispatcher.resume();
            } catch (error) {
                  console.error(error);
                  client.users.get(client.config.owner).send(`⚠ **Error \`resume command\`:**\n\`${error.stack}\``);
                  return message.channel.send("⚠ **Error**, `The error state has been sent to the programmer!`");
            }
            return message.channel.send("▶ **A-Music resumed** for you!");
      }
      return message.channel.send("❌ **`There is nothing playing to resume!`**");
}

module.exports.help = {
      name: "resume",
      category: "Music"
}