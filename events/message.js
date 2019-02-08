const setv = module.require("../jsons/setv.json");
const setr = module.require("../jsons/setr.json");
const func = module.require("../util/functions.js");

module.exports = (client, message) => {
	if (message.author.bot) return;
	if (message.channel.type === "dm") return;
	if (!message.content.startsWith(client.config.prefix)) return;
	//set.object.play
	if (!setv[message.guild.id]) setv[message.guild.id] = { vol: 100 };
	if (!setr[message.guild.id]) setr[message.guild.id] = { repeatmod: false };

	const args = message.content.split(" ");
	const serverQueue = client.queue.get(message.guild.id);
	const ops = {
		setV: setv,
		setR: setr,
		fun: func
	};

	let command = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
	command = command.shift().toLowerCase();

	let commandfile = client.commands.get(command) || client.commands.get(client.aliases.get(command));
	let musicCommands = client.music.get(command) || client.music.get(client.musics.get(command));
	if (commandfile) commandfile.run(client, message, args, ops);
	else if (musicCommands) musicCommands.run(client, message, args, serverQueue, ops);
}