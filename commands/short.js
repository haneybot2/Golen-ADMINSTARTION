const short = module.require("isgd");

module.exports.run = async (client, message, args, ops) => {
      if (!args[1]) return message.channel.send(`ℹ **Usage: \`${client.config.prefix}short [URL] [title]\`**`);
      if (!args[2]) {
            short.shorten(args[1], function (res) {
                  if (res.startsWith("Error:")) {
                        console.log(res);
                        return message.channel.send("❌ **Please enter a valid URL**");
                  }
                  return message.channel.send(`Short link: **${res}**`);
            });
      } else {
            short.custom(args[1], args[2], function(res) {
                  if (res.startsWith("Error:")) {
                        console.log(res);
                        return message.channel.send(`❌ **${res}**`);
                  }
                  return message.channel.send(`Short link: **${res}**`);
              });
      }
}

module.exports.help = {
      name: "short",
	category: "General"
}