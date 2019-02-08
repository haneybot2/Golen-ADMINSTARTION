const arraySort = module.require("array-sort");

module.exports.run = async (client, message, args, ops) => {
      if (args[1] === "inv" || args[1] === "invite") {
            var invites = await message.guild.fetchInvites();
            let index = 0;
            invites = invites.array();
            arraySort(invites, "uses", { reverse: true });
            const propsInvites = [];
            invites.forEach(function (invite) {
                  propsInvites.push(`#${++index} - <${invite.inviter.tag}> = <Uses: ${invite.uses}>`);
            });
            return message.channel.send({
                  embed: {
                        color: 0x00ff00,
                        author: {
                              name: `Server Invites`,
                              icon_url: message.guild.iconURL
                        },
                        fields: [
                              {
                                    name: "TOP 10 Invites:",
                                    value: `\`\`\`html\n${propsInvites.slice(0, 10).join("\n")}\`\`\``
                              }
                        ]
                  }
            });
      }
}

module.exports.help = {
      name: "top",
      category: "General"
}