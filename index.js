const Discord = require("discord.js");
const client = new Discord.Client();
const settings = {
      prefix: "$",
      modlog: ""
};
const warns = {};

client.on('error', console.error)
      .on('warn', console.warn)
      .once('ready', () => console.log("I am ready!"))
      .on("message", message => {
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
                  const reason = args.join(" ");
                  if (!reason) return message.reply("**`Please place a reason`**").catch(console.error);

                  const embed = new Discord.RichEmbed()
                        .setColor(0x00AE86)
                        .setTimestamp()
                        .setDescription(`**Action:** Warning\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** \`\`\`${reason}\`\`\``)
                        .setFooter(`By ${message.author.tag}`, message.author.displayAvatarURL);
                  return client.channels.get(modlog.id).send({ embed });
            } else if (command === "mute") {
                  if (!args) return menubar.reply(`**\`Usage: ${settings.prefix}mute [user] [pictureURL] [reason]\`**`);
                  const user = message.mentions.users.first();
                  const modlog = client.channels.get(settings.modlog);
                  if (!modlog) return message.reply("**`I cannot find a mod-log channel!`**");
                  if (message.mentions.users.size < 1) return message.reply("**`You must mention someone to warn them.`**").catch(console.error);
                  if (user.highestRole.position >= message.member.highestRole.position) return message.channel.send("! لا تستطيع اعطاء ميوت لاحد اعلي منك رتبة");
			if (args.includes("http://") || args.includes("https://")) {
				var pic = args[0];
				var reason = args.slice(1).join(" ");
			} else {
				var reason = args.join(" ");
			}
                  if (!reason) return message.reply("**`Please place a reason`**").catch(console.error);
                  const role = message.guild.roles.find(r => r.name === "Muted");
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

                  const embed = new RichEmbed()
                        .setColor(0x00AE86)
                        .setTimestamp()
                        .setDescription(`**Action:** Mute\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
                        .setFooter(`By ${message.author.tag}`, message.author.displayAvatarURL);
                  message.guild.member(user).addRole(role).then(() => {
                        message.channel.send(`**${user.username} Muted** 🤐`);
                        client.channels.get(modlog.id).send({ embed }).catch(console.error);
                  });
            } else if (command === "ban") {
                  if (!args) return menubar.reply(`**\`Usage: ${settings.prefix}ban [user] [reason]\`**`);
                  const user = message.mentions.users.first();
                  const modlog = client.channels.get(settings.modlog);
                  if (!modlog) return message.reply("**`I cannot find a mod-log channel!`**");
                  if (message.mentions.users.size < 1) return message.reply("**`You must mention someone to warn them.`**").catch(console.error);
                  if (user.highestRole.position >= message.member.highestRole.position) return message.channel.send("! لا تستطيع اعطاء بان لاحد اعلي منك رتبة");
			if (args.includes("http://") || args.includes("https://")) {
				var pic = args[0];
				var reason = args.slice(1).join(" ");
			} else {
				var reason = args.join(" ");
			}
                  const reason = args.join(" ");
                  if (!reason) return message.reply("**`Please place a reason`**").catch(console.error);

                  const embed = new RichEmbed()
                        .setColor(0x00AE86)
                        .setTimestamp()
                        .setDescription(`**Action:** Ban\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
                        .setFooter(`By ${message.author.tag}`, message.author.displayAvatarURL);
                  message.guild.member(user).ban(reason).then(() => {
                        client.channels.get(modlog.id).send({ embed });
                  });
            } else if (command === "kick") {
                  if (!args) return menubar.reply(`**\`Usage: ${settings.prefix}kick [user] [reason]\`**`);
                  const user = message.mentions.users.first();
                  const modlog = client.channels.get(settings.modlog);
                  if (!modlog) return message.reply("**`I cannot find a mod-log channel!`**");
                  if (message.mentions.users.size < 1) return message.reply("**`You must mention someone to warn them.`**").catch(console.error);
                  if (user.highestRole.position >= message.member.highestRole.position) return message.channel.send("! لا تستطيع اعطاء كيك لاحد اعلي منك رتبة");
                  const reason = args.join(" ");
                  if (!reason) return message.reply("**`Please place a reason`**").catch(console.error);

                  const embed = new RichEmbed()
                        .setColor(0x00AE86)
                        .setTimestamp()
                        .setDescription(`**Action:** Kick\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
                        .setFooter(`By ${message.author.tag}`, message.author.displayAvatarURL);
                  message.guild.member(user).ban(reason).then(() => {
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
                        client.channels.get(modlog.id).send({ embed });
                  });
            }
      });


client.login(process.env.TOKEN).then(() => console.log("I am login"));
