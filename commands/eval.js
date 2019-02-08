module.exports.run = async (client, message, args, ops) => {
      if (message.author.id !== client.config.owner) return undefined;
      if (!args[1]) return message.reply("**Please enter code to run it, Ok my programmer!**");
      const code = args.slice(1).join(" ");
      try {
            let evaled = eval(code);
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
            return message.channel.send(`📥 Input:\n\`\`\`xl\n${code}\`\`\`\n🔄 **Run** the code:\n\`\`\`xl\n${ops.fun.clean(client, evaled)}\`\`\``);
      } catch (error) {
            return message.channel.send(`⚠ **Error**, \`${code}\`:\n\`\`\`xl\n${ops.fun.clean(client, error)}\`\`\``);
      }
}

module.exports.help = {
      name: "eval",
	category: "DEV"
}