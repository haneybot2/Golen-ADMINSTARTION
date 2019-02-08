process.on("unhandledRejection", error => console.error(`Uncaught Promise Error:\n${error.stack}`))
	.on("uncaughtException", error => {
		console.error(`UncaughtException:\n${error.stack}`);
		process.exit();
	})
	.on("error", error => console.error(`ERROR:\n${error.stack}`))
	.on("warn", error => console.error(`WARNING:\n${error.stack}`));
//start.bot
const { Client, Collection } = require("discord.js");
const { readdir } = require("fs");
const YouTube = require("simple-youtube-api");
const SQLite = require("better-sqlite3");
//set.client
const client = new Client({
	disableEveryone: true,
	disabledEvents: [
		"TYPING_START",
		"TYPING_STOP",
		"GUILD_SYNC",
		"RELATIONSHIP_ADD",
		"RELATIONSHIP_REMOVE",
		"USER_SETTINGS_UPDATE",
		"USER_NOTE_UPDATE"
	],
	http: {
		api: "https://discordapp.com/api",
		version: 7
	}
});
//set.object
client.config = require("./config.js");
client.sql = new SQLite("./sqlite/scores.sqlite");
client.commands = new Collection();
client.aliases = new Collection();
client.music = new Collection();
client.musics = new Collection();
client.youtube = new YouTube(client.config.GOOGLE_API_KEY);
client.queue = new Map();
client.talkedRecently = new Set();
//commandfile.system
readdir("./commands/", (err, files) => {
	if (err) throw err;

	const jsfile = files.filter(f => f.split(".").pop() === "js");
	console.log(`Loading ${jsfile.length} commands!`);

	jsfile.forEach((f, i) => {
		const cmds = require(`./commands/${f}`);
		console.log(`${i + 1}: ${client.config.prefix}${cmds.help.name} loaded.`);
		client.commands.set(cmds.help.name, cmds);
		if (cmds.help.aliases) {
			cmds.help.aliases.forEach(alias => {
				client.aliases.set(alias, cmds.help.name)
			});
		}
	});
});
//A-Muiscfile.system
readdir("./music/", (err, files) => {
	if (err) throw err;

	const jsfile = files.filter(f => f.split(".").pop() === "js");
	console.log(`:--------->Loading ${jsfile.length} A-Music commands!<---------:`);

	jsfile.forEach((f, i) => {
		const cmds = require(`./music/${f}`);
		console.log(`A-Music => ${i + 1}: ${client.config.prefix}${cmds.help.name} loaded.`);
		client.music.set(cmds.help.name, cmds);
		if (cmds.help.musics) {
			cmds.help.musics.forEach(ms => {
				client.musics.set(ms, cmds.help.name)
			});
		}
	});
});
//eventfile.system
readdir("./events/", (err, files) => {
	if (err) throw err;

	const jsfile = files.filter(f => f.split(".").pop() === "js");
	console.log(`:=========>Loading ${jsfile.length} Events<=========:`);

	jsfile.forEach((file, i) => {
		const event = require(`./events/${file}`);
		let eventName = file.split(".")[0];
		console.log(`Events ==> ${i + 1}: ${eventName} loaded.`);
		client.on(eventName, event.bind(null, client));
	});
});
//login.bot
client.login(client.config.TOKEN);