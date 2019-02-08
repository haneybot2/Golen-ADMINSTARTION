module.exports.run = async (client, message, args, ops) => {
	if (!args[1]) return message.channel.send('❌ **Please supply a number**');
	return message.channel.send(Math.floor(Math.random() * args.slice(1).join(' ')));
}

module.exports.help = {
	name: "roll",
	aliases: [],
	category: "General"
}
