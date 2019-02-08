module.exports.run = async (client, message, args, ops) => {
	if (message.author.id !== client.config.owner) return message.reply("This is private commands, you can't do it here! (احمق)");
	console.clear();
	console.log(`${message.author.tag} [ ${message.author.id} ] has restarted the bot.`);
	message.channel.send('Resetting...')
		.then(() => client.destroy())
		.then(() => client.login(client.config.TOKEN));
}

module.exports.help = {
	name: "restart",
	aliases: ["rest"],
	category: "DEV"
}
