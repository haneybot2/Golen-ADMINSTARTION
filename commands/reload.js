module.exports.run = async (client, message, args, ops) => {
      if (message.author.id !== client.config.owner) return message.reply("I think you are **mentally insane**");
      if (!args[1]) return message.channel.send(`❌ **\`I cannot find the command\`**`);
      if (client.commands.has(args[1])) {
            var command = args[1];
      } else if (client.aliases.has(args[1])) {
            var command = client.aliases.get(args[1]);
      } else if (client.music.has(args[1])) {
            var command = args[1];
      } else if (client.musics.has(args[1])) {
            var command = client.musics.get(args[1]);
      }

      message.channel.send(`Reloading: **${command}**`)
            .then(m => {
                  ops.fun.reload(client, command)
                        .then(() => m.edit(`✅ **Successfully reloaded: \`${command} command\`**`))
                        .catch(error => m.edit(`❌ Command reload failed: **${command}**\n\`\`\`${error.stack}\`\`\``));
            });
}

module.exports.help = {
      name: "reload",
      aliases: ["relod"],
	category: "DEV"
}