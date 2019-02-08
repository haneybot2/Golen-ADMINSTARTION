module.exports = (client, oldMember, newMember) => {
      // const channel = oldMember.guild.channels.get(client.config.voiceOnline);
      // const currentSize = channel.guild.members.filter(m => m.voiceChannel).size;
      // const size = channel.name.match(/\[\s(\d+)\s\]/);
      // if (!size || currentSize !== size) channel.setName(`Miracle Online: [${currentSize}]`);
      if (
            (oldMember.id === client.user.id)
            && (oldMember.voiceChannelID !== newMember.voiceChannelID)
            && !newMember.voiceChannel
      ) {
            const queue = client.queue.get(oldMember.guild.id);
            if (queue) {
                  client.queue.delete(oldMember.guild.id)
            }
      }
}