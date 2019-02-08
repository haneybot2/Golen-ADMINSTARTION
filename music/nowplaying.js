module.exports.run = async (client, message, args, serverQueue, ops) => {
      if (ops.fun.checkPermission(client, message, "MANAGE_MESSAGES") === false) return;
      const { mes, embed } = ops.fun.npMsg(client.queue, message.guild);
      client.nowPlaying = await message.channel.send(mes, { embed: embed });
      setInterval(() => {
            const { mes, embed } = ops.fun.npMsg(client.queue, message.guild);
            client.nowPlaying.edit(mes, { embed: embed });
      }, 5000);
}

module.exports.help = {
      name: "nowplaying",
      musics: ["np"],
      category: "Music"
}