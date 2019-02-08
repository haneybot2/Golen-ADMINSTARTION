const { version } = module.require("discord.js");
const os = module.require("os");

module.exports.run = async (client, message, args, ops) => {
	if (message.author.id !== client.config.owner) return message.channel.send({
		embed: {
			color: 0xbe0000,
			description: "This is private commands, you can't do it here!"
		}
	});

	if (args[1] === "data") {
		const totalSeconds = process.uptime();
		const realTotalSecs = Math.floor(totalSeconds % 60);
		let days = Math.floor((totalSeconds % 31536000) / 86400);
		let hours = Math.floor((totalSeconds / 3600) % 24);
		let mins = Math.floor((totalSeconds / 60) % 60);
		let used = process.memoryUsage().heapUsed / 1024 / 1024;

		return message.channel.send(`\n= Memory usage: ${Math.round(used * 100) / 100}MB\n= Rss usage: ${Math.round(process.memoryUsage().rss / 1024 / 1024 * 100) / 100}MB\n= Ping: ${client.ping}\n= Uptime: Days: ${days} | Hours: ${hours} | Minutes: ${mins} | Seconds: ${realTotalSecs}\n= Node: ${process.version}\n= DiscordJS: ${version}\n= ARCH: ${os.arch()}\n= Plataform: ${os.platform}\n= Servers: ${client.guilds.size}\n= Users: ${client.users.size}`, {
			code: "AsciiDoc"
		});
	} else if (args[1] === "servers" || args[1] === "serverlsit") {
		let index = 0;
		return message.channel.send(client.guilds.map(g => `\n[${++index}] - ${g.name} | [${g.id}]`).join("\n"), {
			code: "AsciiDoc"
		});
	}
}

module.exports.help = {
	name: "bot",
	aliases: ["client"],
	category: "DEV"
}
