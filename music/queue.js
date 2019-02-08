module.exports.run = async (client, message, args, serverQueue, ops) => {
      if (ops.fun.checkPermission(client, message, "MANAGE_MESSAGES") === false) return;
      if (!serverQueue) return message.channel.send("🎶 **A-Queue** empty!");
      let state;
      if (serverQueue.repeating) {
            if (serverQueue.playing) state = "Repeating";
            else state = "Paused";
      } else {
            if (serverQueue.playing) state = "Playing";
            else state = "Paused";
      }
      if (args[1] === "remove" || args[1] === "re") {
            if (!message.member.voiceChannel) return message.channel.send("❌ **`You are not in a voice channel`**!");
            if (!args[2] || isNaN(args[2])) return message.channel.send("❌ **`Please specify the section number`**!");
            const num = Number(args[2]) - 1;
            try {
                  if (num > 0 && serverQueue.songs[num]) {
                        const hold = serverQueue.songs[num];
                        serverQueue.songs.splice(num, 1);
                        return message.channel.send(`🗑 **Removed:** \`${hold.title}\``);
                  }
            } catch (error) {
                  console.error(error);
                  client.users.get(client.config.owner).send(`⚠ **Error \`queue remove command\`:**\n\`\`\`xl\n${error.stack}\`\`\``);
                  return message.channel.send("⚠ **Error**, `The error state has been sent to the programmer`!");
            }
            return message.channel.send("❌ **`Couldn't find that song or something went wrong.`**");
      } if (args[1] === "move" || args[1] === "mo") {
            if (!message.member.voiceChannel) return message.channel.send("❌ **`You are not in a voice channel!`**");
            if (serverQueue.songs.length < 2) return message.channel.send("❌ **`There is not enough songs to move!`**");
            if (!args[2] || isNaN(args[2])) return message.channel.send("❌ **`I could not find the song to be moved!`**");
            if (!args[3] || isNaN(args[3])) return message.channel.send("❌ **`I could not find the place to move the song to!`**");
            const org = Number(args[2]) - 1;
            const fin = Number(args[3]) - 1;
            try {
                  if (org > 0 && fin > 0 && serverQueue.songs[org] && serverQueue.songs[fin]) {
                        const hold = serverQueue.songs[org];
                        serverQueue.songs.splice(org, 1);
                        serverQueue.songs.splice(fin, 0, hold);
                        return message.channel.send(`✅ **Moved \`${hold.title}\` To \`${fin}\`**`);
                  }
            } catch (error) {
                  console.error(error);
                  client.users.get(client.config.owner).send(`⚠ **Error \`queue move command\`:**\n\`\`\`xl\n${error.stack}\`\`\``);
                  return message.channel.send("⚠ **Error**, `The error state has been sent to the programmer`!");
            }
            return message.channel.send("❌ **`Please enter valid orgin and finish queue positions!`**");
      } if (args[1] === "shuffle" || args[1] === "sf") {
            if (!message.member.voiceChannel) return message.channel.send("❌ **`You are not in a voice channel`**!");
            if (serverQueue.songs.length < 2) return message.channel.send("❌ **`There is not enough items to shuffle in A-Queue!`**");
            try {
                  for (let i = 0; i < queue[id].length; i++) {
                        const num = Math.floor(Math.random() * (serverQueue.songs.length - 1) + 1);
                        const hold = serverQueue.songs[i];
                        serverQueue.songs.splice(i, 1);
                        serverQueue.songs.splice(num, 0, hold);
                  }
            } catch (error) {
                  console.error(error);
                  client.users.get(client.config.owner).send(`⚠ **Error \`queue shuffle command\`:**\n\`\`\`xl\n${error.stack}\`\`\``);
                  return message.channel.send("⚠ **Error**, `The error state has been sent to the programmer`!");
            }
            return message.channel.send("✅ **A-Queue** shuffle");
      } else {
            let index = 0;
            return message.channel.send({
                  embed: {
                        color: 0x000000,
                        thumbnail: {
                              url: serverQueue.songs[0].img
                        },
                        author: {
                              name: "A-Queue",
                              icon_url: "http://i8.ae/sR812"
                        },
                        title: "**A-Queue List :**",
                        description: `**Status:**\`${state}\`\n${serverQueue.songs.slice(0, 10).map(song => `**${++index}.** [${song.title}](${song.url}) (\`${song.duration}\`) - <@${song.requestedBy.id}>`).join("\n")}`,
                        footer: {
                              text: serverQueue.songs.length > 10 ? `And ${serverQueue.songs.length - 10} more` : "No more queue"
                        }
                  }
            });
      }
}

module.exports.help = {
      name: "queue",
      musics: ["q"]
}