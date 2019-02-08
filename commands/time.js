const ms = module.require("ms");

module.exports.run = async (client, message, args, ops) => {
	const Timer = args[1];
	if (!Timer) return message.channel.send(`ℹ **Usage: \`${client.config.prefix}time [timer]\`**.`);
	message.channel.send(`✅ **Timer has been set for \`${ms(ms(Timer), { long: true })}\`**`);
	setTimeout(function () {
		message.channel.send(`${message.author}, **Timer has ended, it lasted**: \`${ms(ms(Timer), { long: true })}\``);
	}, ms(Timer));
}

module.exports.help = {
	name: "time",
	aliases: [],
	category: "General"
}
