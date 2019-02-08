module.exports.run = async (client, message, args, ops) => {
	if (ops.fun.checkPermission(client, message, "ADMINSTRATOR") === false) return;
	if (!args[1]) {
		return message.channel.send('**Please enter your speech**');
	} else if (args[1] === 'e') {
		const botmessage = args.slice(2).join(" ");
		message.delete();
		return message.channel.send({
			embed: {
				color: 0x36393e,
				description: botmessage
			}
		});
	} else {
		const botmessage = args.slice(1).join(" ");
		message.delete();
		return message.channel.send(botmessage, { disableEveryone: false });
	}
}

module.exports.help = {
	name: "say",
	aliases: [],
	category: "DEV"
}
