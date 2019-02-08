module.exports.run = async (client, message, args, ops) => {
	var msg = await message.channel.send("Ping?");
	await msg.edit(`:ping_pong: Time taken: \`${msg.createdTimestamp - message.createdTimestamp}ms\` | Discord API: \`${Math.round(client.ping)}ms\``);
}

module.exports.help = {
	name: "ping",
	aliases: ["pong"],
	category: "General"
}
