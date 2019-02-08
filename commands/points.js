module.exports.run = async (client, message, args, ops) => {
      if (!args[1]) return message.channel.send(`🏧 **${message.author.username}, You currently have \`${ops.textScore.points}\` points and are level \`[${ops.textScore.level}]\`**`);
      try {
            const target = message.mentions.users.first() || message.guild.members.get(args[1]);
            var userscore = client.getScore.get(target.id, message.guild.id);
            if (!userscore) {
                  userscore = {
                        id: `${message.guild.id}-${target.id}`,
                        user: target.id,
                        guild: message.guild.id,
                        points: 0,
                        credit: 0,
                        level: 1
                  };
            }
            if (!args[2]) {
                  client.setScore.run(userscore);
                  return message.channel.send(`🏧 **${target.username}, You currently have \`${userscore.points}\` points and are level \`[${userscore.level}]\`**`);
            } else {
                  if (args[2] > ops.textScore.points) return message.channel.send("❌ **You don't have enough points to move**");
                  userscore.points = userscore.points + args[2];
                  ops.textScore.points = ops.textScore.points - args[2];
                  const userLevel = Math.floor(0.1 * Math.sqrt(ops.textScore.points));
                  userscore.level = userLevel;
                  client.setScore.run(userscore);
                  client.setScore.run(ops.textScore);
                  return message.channel.send(`🏧 <@${target.id}> **has received ${userscore.points} points by ${message.author} and now stands at ${userscore.points} points**`);
            }
      } catch (error) {
            console.error(error);
            client.users.get(client.config.owner).send(`⚠ **Error \`points command\`:**\`\`\`js\n${error.stack}\`\`\``);
            return message.channel.send("⚠ **Error**, `The error state has been sent to the my programmer!`");
      }
}

module.exports.help = {
      name: "points",
      aliases: ["ponts"],
      category: "General"
}