const moment = module.require("moment");

module.exports.run = async (client, message, args, ops) => {
      const target = message.mentions.members.first() || message.guild.members.get(args[1]) || message.author;
      const username = target.username || target.user.username;
      const userAva = target.displayAvatarURL || target.user.displayAvatarURL;
      const userdis = target.discriminator || target.user.discriminator;
      const userTag = target.tag || target.user.tag;
      const usercratat = target.createdAt || target.user.createdAt;
      const { sIcon, sName } = ops.fun.stauts(target.presence.status);
      moment.locale("ar-TN");

      return message.channel.send({
            embed: {
                  color: 0x36393e,
                  author: {
                        name: userTag,
                        icon_url: userAva
                  },
                  thumbnail: {
                        url: userAva
                  },
                  title: `${username} information:`,
                  fields: [
                        {
                              name: "🆔 User ID:",
                              value: target.id
                        },
                        {
                              name: `🔱 Name information:`,
                              value: `**Mention:** <@${target.id}>\n**Displayname: ${userTag}**\n\`Username: ${username} | Discrim: #${userdis}\``
                        },
                        {
                              name: "🛡 Account information:",
                              value: `**Type: ${target.bot ? "Bot Account" : "User Account"}\nJoined at:** ${moment.utc(target.joinedAt).format("DD/MM/YYYY `HH:mm:ss`")}\n**Created at:** ${moment.utc(usercratat).format("D/M/YYYY `HH:mm:ss`")}`
                        },
                        {
                              name: `${sIcon} Status information:`,
                              value: `**Playing: ${target.presence.game ? target.presence.game.name : "💤 Not **playing**"}\nstatus: ${sName}**`
                        }
                  ],
                  footer: {
                        text: message.author.tag,
                        icon_url: message.author.displayAvatarURL
                  },
                  timestamp: new Date()
            }
      });
}

module.exports.help = {
      name: "userinfo",
      aliases: ["uinfo", "user"],
      category: "General"
}