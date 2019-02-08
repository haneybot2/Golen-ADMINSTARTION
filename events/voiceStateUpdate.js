module.exports = (client, oldMember, newMember) => {
      const channel = oldMember.guild.channels.get(client.config.voiceOnline)
      || newMember.guild.channels.get(client.config.voiceOnline);
      const currentSize = channel.guild.members.filter(m => m.voiceChannel).size;
      const size = channel.name.match(/\[\s(\d+)\s\]/);
      if (!size || currentSize !== size) channel.setName(`Golden Online: [${currentSize}]`);
}
