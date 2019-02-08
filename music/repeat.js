module.exports.run = async (client, message, args, serverQueue, ops) => {
      if (ops.fun.checkPermission(client, message, "MANAGE_MESSAGES") === false) return;
      if (!message.member.voiceChannel) return message.channel.send("❌ **`You are not in a voice channel`**!");
      if (!serverQueue) return message.channel.send("❌ **`There is nothing playing to repeat!`**");
      if (serverQueue.repeating) {
            try {
                  serverQueue.repeating = false;
                  ops.setR[message.guild.id].repeatmod = false;
                  return message.channel.send("🔁 Change **A-Repeat** mode to: `False`");
            } catch (error) {
                  console.error(error);
                  client.users.get(client.config.owner).send(`⚠ **Error \`repeating command to false\`:**\n\`\`\`xl\n${error.stack}\`\`\``);
                  return message.channel.send("⚠ **Error**, `The error state has been sent to the programmer`!");
            }
      } else {
            try {
                  serverQueue.repeating = true;
                  ops.setR[message.guild.id].repeatmod = true;
                  return message.channel.send("🔁 Change **A-Repeat** mode to: `True`");
            } catch (error) {
                  console.error(error)
                  client.users.get(client.config.owner).send(`⚠ **Error \`repeating command to true\`:**\n\`\`\`xl\n${error.stack}\`\`\``);
                  return message.channel.send("⚠ **Error**, `The error state has been sent to the programmer`!");
            }
      }
}

module.exports.help = {
      name: "repeat",
      musics: ["re"],
      category: "Music"
}