const ytdl = module.require("ytdl-core");

module.exports.run = async (client, message, args, serverQueue, ops) => {
      if (ops.fun.checkPermission(client, message, "MANAGE_MESSAGES") === false) return;
      const voiceChannel = message.member.voiceChannel;
      if (!message.member.voiceChannel) return message.channel.send("❌ **`You need to be in a voice channel to play Music!`**");
      if (message.guild.me.voiceChannel && voiceChannel.id !== message.guild.me.voiceChannel.id) return message.channel.send("❌ **`I am already in an voice channel!`**");
      const searchString = args.slice(1).join(" ").trim();
      const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
      if (!searchString || !url) return message.channel.send("❌ **`Please specify the song name`**!");
      if (serverQueue && serverQueue.songs.length >= 15) return message.channel.send("❌ **`Maximum queue size reached`**!");

      const messageSearchString = await message.channel.send(`🔍 **| Searching: \`${searchString}\`**`);
      if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            try {
                  const playlist = await client.youtube.getPlaylist(url);
                  const videos = await playlist.getVideos();
                  if (videos.length <= 0) return messageSearchString.edit("❌ **`Couldn't get any videos from that playlist.`**");
                  for (const video of Object.values(videos)) {
                        const video2 = await client.youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                        await ops.fun.handleVideo(client, video2, message, voiceChannel, messageSearchString, true); // eslint-disable-line no-await-in-loop
                  }
                  return message.channel.send(`✅ Playlist: **${playlist.title}** with **\`${playlist.length}\`** added to **A-Queue**!`);
            } catch (error) {
                  console.error(error);
                  return messageSearchString.edit("❌ **`I couldn't obtain any search results.`**");
            }
      } else {
            try {
                  const info = await ytdl.getInfo(searchString);
                  const video = await client.youtube.getVideo(info.video_url);
                  return ops.fun.handleVideo(client, video, message, voiceChannel, messageSearchString);
            } catch (error) {
                  try {
                        const videos = await client.youtube.searchVideos(searchString, 5).catch(err => {
                              console.error(err);
                              client.users.get(client.config.owner).send(`⚠ **Error \`searchString function\`:**\n\`\`\`js\n${error.stack}\`\`\``);
                              return messageSearchString.edit("❌ **`I couldn't obtain any search results.`**");
                        });
                        if (videos.length <= 9 || searchString.startsWith("https")) {
                              const video = await client.youtube.getVideoByID(videos[0].id);
                              return ops.fun.handleVideo(client, video, message, voiceChannel, messageSearchString);
                        }
                        let index = 0;
                        const sEmessage = await message.channel.send({
                              embed: {
                                    color: 0x000000,
                                    author: {
                                          name: "A-Music",
                                          icon_url: "http://i8.ae/sR812"
                                    },
                                    title: "**Song selection** :",
                                    fields: [
                                          {
                                                name: `[1] - ${videos[0].channel.title}:`,
                                                value: `[${videos[0].title}](${videos[0].url})`
                                          },
                                          {
                                                name: `[2] - ${videos[1].channel.title}:`,
                                                value: `[${videos[1].title}](${videos[1].url})`
                                          },
                                          {
                                                name: `[3] - ${videos[2].channel.title}:`,
                                                value: `[${videos[2].title}](${videos[2].url})`
                                          },
                                          {
                                                name: `[4] - ${videos[3].channel.title}:`,
                                                value: `[${videos[3].title}](${videos[3].url})`
                                          },
                                          {
                                                name: `[5] - ${videos[4].channel.title}:`,
                                                value: `[${videos[4].title}](${videos[4].url})`
                                          },
                                          {
                                                name: `[6] - ${videos[5].channel.title}:`,
                                                value: `[${videos[5].title}](${videos[5].url})`
                                          },
                                          {
                                                name: `[7] - ${videos[6].channel.title}:`,
                                                value: `[${videos[6].title}](${videos[6].url})`
                                          },
                                          {
                                                name: `[8] - ${videos[7].channel.title}:`,
                                                value: `[${videos[7].title}](${videos[7].url})`
                                          },
                                          {
                                                name: `[9] - ${videos[8].channel.title}:`,
                                                value: `[${videos[8].title}](${videos[8].url})`
                                          },
                                          {
                                                name: `[10] - ${videos[9].channel.title}:`,
                                                value: `[${videos[9].title}](${videos[9].url})`
                                          },
                                    ],
                                    footer: {
                                          text: `Search by ${message.author.username}`,
                                          icon_url: message.author.displayAvatarURL
                                    }
                              }
                        });
                        try {
                              var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 6, {
                                    maxMatches: 1,
                                    time: 20000,
                                    errors: ["time"]
                              });
                        } catch (err) {
                              console.error(err);
                              messageSearchString.delete();
                              sEmessage.delete();
                              return message.channel.send("❌ **`No or invalid value entered, cancelling video selection.`**");
                        }
                        sEmessage.delete();
                        response.first().delete();
                        const videoIndex = parseInt(response.first().content);
                        const video = await client.youtube.getVideoByID(videos[videoIndex - 1].id);
                        return ops.fun.handleVideo(client, video, message, voiceChannel, messageSearchString);
                  } catch (err) {
                        console.error(err);
                        return messageSearchString.edit("❌ **`I could not obtain any search results.`**");
                  }
            }
      }
}

module.exports.help = {
      name: "splay",
      musics: ["sp"],
      category: "Music"
}