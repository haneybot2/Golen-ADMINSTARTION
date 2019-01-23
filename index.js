const Discord = require("discord.js");
const client = new Discord.Client();
const settings = {
      prefix: "$",
      modlog: "537265977931464705"
};

client.on('error', console.error)
      .on('warn', console.warn)
      .once('ready', () => console.log("I am ready!"))
      .on("message", async message => {
            if (message.author.bot) return;
            if (!message.content.startsWith(settings.prefix)) return;
            const command = message.content.split(' ')[0].slice(settings.prefix.length);
            const args = message.content.split(' ').slice(1);

            if (command === "warn") {
                  if (!args) return message.reply(`**\`Usage: ${settings.prefix}warn [user] [reason]\`**`);
                  const user = message.mentions.users.first();
                  const modlog = client.channels.get(settings.modlog);
                  if (!modlog) return message.reply("**`I cannot find a mod-log channel!`**");
                  if (message.mentions.users.size < 1) return message.reply("**`You must mention someone to warn them.`**").catch(console.error);
                  const reason = args.slice(1).join(" ");
                  if (!reason) return message.reply("**`Please place a reason`**").catch(console.error);

                  const embed = new Discord.RichEmbed()
                        .setColor(0x00AE86)
                        .setTimestamp()
                        .setDescription(`**Action:** Warning\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** \`\`\`${reason}\`\`\``)
                        .setFooter(`By ${message.author.tag}`, message.author.displayAvatarURL);
		    client.channels.get(modlog.id).send({ embed });
                  return message.channel.send(`:white_check_mark: **${user.username} Warned**`);
            } else if (command === "mute") {
                  if (!args) return menubar.reply(`**\`Usage: ${settings.prefix}mute [user] [pictureURL] [reason]\`**`);
                  const user = message.mentions.users.first();
                  const modlog = client.channels.get(settings.modlog);
                  if (!modlog) return message.reply("**`I cannot find a mod-log channel!`**");
                  if (message.mentions.users.size < 1) return message.reply("**`You must mention someone to warn them.`**").catch(console.error);
			if (args.includes("http://") || args.includes("https://")) {
				var pic = args[0];
				var reason = args.slice(2).join(" ");
			} else {
				var reason = args.slice(1).join(" ");
			}
                  if (!reason) return message.reply("**`Please place a reason`**").catch(console.error);
                  let role = message.guild.roles.find(r => r.name === "Muted");
                  if (!role) {
                        try {
                              role = await message.guild.createRole({
                                    name: "Muted",
                                    color: "#000000",
                                    permissions: []
                              });
                              message.guild.channels.forEach(async (channel, id) => {
                                    await channel.overwritePermissions(role, {
                                          SEND_MESSAGES: false,
                                          ADD_REACTIONS: false
                                    });
                              });
                        } catch (e) {
                              console.log(e.stack);
                        }
                  }
                  if (user.roles.has(role.id)) return message.channel.send("❌ **this user is already muted**!");

                  let embed = new RichEmbed()
                        .setColor(0x00AE86)
                        .setTimestamp()
                        .setDescription(`**Action:** Mute\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
                        .setFooter(`By ${message.author.tag}`, message.author.displayAvatarURL);
		    if (pic) {
		    	embed.setImage(pic);
		    }
                  message.guild.member(user).addRole(role).then(() => {
                        message.channel.send(`**${user.username} Muted** 🤐`);
                        client.channels.get(modlog.id).send({ embed }).catch(console.error);
                  });
            } else if (command === "ban") {
                  if (!args) return menubar.reply(`**\`Usage: ${settings.prefix}ban [user] [pictureURL] [reason]\`**`);
                  const user = message.mentions.users.first();
                  const modlog = client.channels.get(settings.modlog);
                  if (!modlog) return message.reply("**`I cannot find a mod-log channel!`**");
                  if (message.mentions.users.size < 1) return message.reply("**`You must mention someone to warn them.`**").catch(console.error);
			if (args.includes("http://") || args.includes("https://")) {
				var pic = args[0];
				var reason = args.slice(2).join(" ");
			} else {
				var reason = args.slice(1).join(" ");
			}
                  if (!reason) return message.reply("**`Please place a reason`**").catch(console.error);

                  let embed = new RichEmbed()
                        .setColor(0x00AE86)
                        .setTimestamp()
                        .setDescription(`**Action:** Ban\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
                        .setFooter(`By ${message.author.tag}`, message.author.displayAvatarURL);
		    if (pic) {
		    	embed.setImage(pic);
		    }
                  message.guild.member(user).ban(reason).then(() => {
			message.channel.send(`:white_check_mark: **${user.username} Baned**`);
                        client.channels.get(modlog.id).send({ embed });
                  });
            } else if (command === "kick") {
                  if (!args) return menubar.reply(`**\`Usage: ${settings.prefix}kick [user] [reason]\`**`);
                  const user = message.mentions.users.first();
                  const modlog = client.channels.get(settings.modlog);
                  if (!modlog) return message.reply("**`I cannot find a mod-log channel!`**");
                  if (message.mentions.users.size < 1) return message.reply("**`You must mention someone to warn them.`**").catch(console.error);
                  const reason = args.slice(1).join(" ");
                  if (!reason) return message.reply("**`Please place a reason`**").catch(console.error);

                  const embed = new RichEmbed()
                        .setColor(0x00AE86)
                        .setTimestamp()
                        .setDescription(`**Action:** Kick\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
                        .setFooter(`By ${message.author.tag}`, message.author.displayAvatarURL);
                  message.guild.member(user).ban(reason).then(() => {
			message.channel.send(`:white_check_mark: **${user.username} Kiecked**`);
                        client.channels.get(modlog.id).send({ embed });
                  });
            } else if (command === "unban") {
                  const user = args[0];
                  const modlog = client.channels.get(settings.modlog);
                  if (!modlog) return message.reply("**`I cannot find a mod-log channel!`**");
                  if (!reason) return message.reply("**`Please place a reason`**").catch(console.error);
                  if (!user) return message.reply("**`You must supply a User Resolvable, such as a user id.`**").catch(console.error);
                  const embed = new RichEmbed()
                        .setColor(0x00AE86)
                        .setTimestamp()
                        .setDescription(`**Action:** Unban\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
                        .setFooter(`By ${message.author.tag}`, message.author.displayAvatarURL);
                  message.guild.unban(user).then(() => {
			  return message.channel.send(`:white_check_mark: **${user.username} Unbaned**`);
                        client.channels.get(modlog.id).send({ embed });
                  });
            }
      });


client.login(process.env.TOKEN).then(() => console.log("I am login"));
