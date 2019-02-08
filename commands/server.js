const moment = module.require("moment");

module.exports.run = async (client, message, args, ops) => {
	if (ops.fun.checkPermission(client, message, "MANAGE_GUILD_OR_MANAGE_MEMBER") === false) return;
	const online = message.guild.members.filter(m => m.presence.status === "online").size;
	const idle = message.guild.members.filter(m => m.presence.status === "idle").size;
	const dnd = message.guild.members.filter(m => m.presence.status === "dnd").size;
	const offline = message.guild.members.filter(m => m.presence.status === "offline").size;
	moment.locale("ar-TN");
	return message.channel.send({
		embed: {
			color: 0x36393e,
			author: {
				name: message.guild.name,
				icon_url: message.guild.iconURL
			},
			thumbnail: {
				url: message.guild.iconURL
			},
			fields: [
				{
					name: "🆔 Server ID:",
					value: message.guild.id,
					inline: true
				},
				{
					name: "👑 Server owner:",
					value: `<@${message.guild.owner.id}>\`[${message.guild.owner.id}]\``,
					inline: true
				},
				{
					name: "📆 Created on:",
					value: moment.utc(message.guild.createdAt).format("D/M/YYYY `HH:mm:ss`"),
					inline: true
				},
				{
					name: "👥 Member information:",
					value: `**Server Members: \`[${message.guild.members.filter(m => !m.user.bot).size}]\`\nBots: \`[${message.guild.members.filter(m => m.user.bot).size}]\`\n\`Online: [${online}] | Idle: [${idle}] | Dnd: [${dnd}] | Offline: [${offline}]\`**`
				},
				{
					name: "💬 Channel information:",
					value: `**Channels: \`[${message.guild.channels.size}]\`**\n**AFK Chanel:** ${message.guild.afkChannelID ? `**<#${message.guild.afkChannelID}>** after **\`${message.guild.afkTimeout / 60}min\`**` : "**None**"}\n**\`Categorys: [${message.guild.channels.filter(m => m.type === "category").size}] | Text: [${message.guild.channels.filter(m => m.type === "text").size}] | Voice: [${message.guild.channels.filter(m => m.type === "voice").size}]\`**`
				},
				{
					name: "🌍 Others:",
					value: `**Region:** ${message.guild.region}\n**Verification Level:** ${ops.fun.VerLvl(message.guild.verificationLevel)}\`[${message.guild.verificationLevel}]\``
				},
				{
					name: "🔐 Role information:",
					value: `**Roles: \`[${message.guild.roles.size}]\`**\nTo see a list with all roles use **${client.config.prefix}roles**`
				}
			]
		}
	});
}

module.exports.help = {
	name: "server",
	aliases: ["serverinfo", "sinfo"],
	category: "Admin"
}
