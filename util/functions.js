const { Util } = module.require("discord.js");
const ytdl = module.require("ytdl-core");
const ms = module.require("ms");
const setV = module.require("../jsons/setv.json");
const setR = module.require("../jsons/setr.json");

//target.presence.gamename/gameicon
module.exports.stauts = status => {
	const ObjectsStatus = {
		online: {
			stateName: "Online",
			stateIcon: "💚"
		},
		idle: {
			stateName: "Idle",
			stateIcon: "💛"
		},
		dnd: {
			stateName: "Do Not Disturb",
			stateIcon: "❤"
		},
		offline: {
			stateName: "Offline or invisible",
			stateIcon: "⚫"
		}
	};
	if (ObjectsStatus[status]) return {
		sName: ObjectsStatus[status].stateName,
		sIcon: ObjectsStatus[status].stateIcon
	};
	else return "No product"
}
//ban/kick/muteTime/reson
module.exports.TimeReson = (args, defult) => {
	let Time;
	let Reason;
	if (!args[2]) {
		Time = ms(defult);
		Reason = "No Reason";
	} else if (args[2] && !args[3]) {
		if (typeof ms(args[2]) === "number") {
			Time = ms(args[2]);
			Reason = "No Reason";
		} else {
			Time = ms(defult);
			Reason = args[2];
		}
	} else if (args[2] && args[3]) {
		if (typeof ms(args[2]) === "number") {
			Time = ms(args[2]);
			Reason = args.slice(3).join(" ");
		} else {
			Time = ms(defult);
			Reason = args.slice(3).join(" ");
		}
	}
	return {
		time: Time,
		reason: Reason
	}
}
//check.permission.member
module.exports.checkPermission = (client, message, permission) => {
	let ownerC;
	let adminIDC;
	let adminMEMBERC;
	let checkperm;
	let amount;
	if (permission === "MANAGE_MESSAGES") checkperm = message.member.hasPermission("MANAGE_MESSAGES");
	else checkperm = message.member.hasPermission("MANAGE_MESSAGES") && message.member.hasPermission(permission)
	if (message.author.id === client.config.owner) {
		ownerC = true;
		return ownerC;
	} else if (message.author.id === client.config.id) {
		adminIDC = true;
		return adminIDC;
	} else if (checkperm) {
		adminMEMBERC = true;
		return adminMEMBERC;
	} else {
		amount = false;
		return amount;
	}
}
//eval.clean
module.exports.clean = (client, text) => {
	if (typeof text === "string") {
		return text = text
			.replace(/`/g, "`" + String.fromCharCode(8203))
			.replace(/@/g, "@" + String.fromCharCode(8203))
			.replace(client.token, "Sorry my friend but it is between me and you only");
	} else return text;
}
//server.verificationLevel
module.exports.VerLvl = verificationLevel => {
	const ObjectsLevl = {
		0: "None",
		1: "Low",
		2: "Medium",
		3: "Hard",
		4: "Very Hard"
	};
	if (ObjectsLevl[verificationLevel]) return ObjectsLevl[verificationLevel];
	else return "No product"
}
//client.commands/muisc.reload
module.exports.reload = (client, command) => {
	return new Promise((resolve, reject) => {
		if (client.commands.has(command) || client.commands.has(client.aliases.has(command))) {
			try {
				delete require.cache[require.resolve(`../commands/${command}`)];
				const cmd = require(`../commands/${command}`);
				client.commands.delete(command);
				client.aliases.forEach((cmd, alias) => {
					if (cmd === command) client.aliases.delete(alias);
				});
				client.commands.set(command, cmd);
				cmd.help.aliases.forEach(alias => {
					client.aliases.set(alias, cmd.help.name);
				});
				resolve();
			} catch (e) {
				reject(e);
			}
		} else if (client.music.has(command) || client.music.has(client.musics.has(command))) {
			try {
				delete require.cache[require.resolve(`../music/${command}`)];
				const cmd = require(`../music/${command}`);
				client.music.delete(command);
				client.musics.forEach((cmd, alias) => {
					if (cmd === command) client.aliases.delete(alias);
				});
				client.music.set(command, cmd);
				cmd.help.musics.forEach(alias => {
					client.aliases.set(alias, cmd.help.name);
				});
				resolve();
			} catch (e) {
				reject(e);
			}
		}
	});
}
//play.handleVideo
module.exports.handleVideo = async (client, video, message, voiceChannel, messageSearchString, playlist = false) => {
	if (video.durationSeconds === 0) return messageSearchString.edit("❌ **`You can't play live streams.`**");
	const serverQueue = client.queue.get(message.guild.id);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		requestedBy: message.author,
		msDur: video.durationSeconds * 1000,
		duration: this.dur(video.duration),
		url: `https://www.youtube.com/watch?v=${video.id}`,
		img: this.videoIMG(video.thumbnails)
	};

	if (!serverQueue) {
		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: setV[message.guild.id].vol,
			playing: true,
			repeating: setR[message.guild.id].repeatmod
		};
		client.queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			messageSearchString.delete();
			queueConstruct.connection = await voiceChannel.join();
			return this.play(client, message.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(error);
			messageSearchString.delete();
			client.queue.delete(message.guild.id);
			client.users.get(client.config.owner).send(`⚠ **Error \`joining event\`:**\n\`\`\`js\n${error.stack}\`\`\``);
			return message.channel.send("⚠ **Error**, `The error state has been sent to the programmer`!");
		}
	} else {
		serverQueue.songs.push(song);
		if (playlist) return undefined;
		console.log(song);
		messageSearchString.delete();
		return message.channel.send(`✅ \`${song.title}\` Added to **A-Queue**!`, {
			embed: {
				color: 0x36393e,
				description: `Time song: (\`${song.duration}\`)`,
				image: {
					url: song.img
				},
				footer: {
					text: `Added by ${song.requestedBy.username}`,
					icon_url: song.requestedBy.displayAvatarURL
				}
			}
		});
	}
}
//play.startVidoe
module.exports.play = (client, guild, song) => {
	const serverQueue = client.queue.get(guild.id);

	if (!song) {
		client.queue.delete(guild.id);
		return serverQueue.textChannel.send("⏹ **A-Queue** has ended!!");;
	}
	console.log(song);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url, { filter: "audioonly" }))
		.on("end", Reason => {
			if (Reason === "Stream is not generating quickly enough.") console.log("Song ended.");
			else console.log(Reason);
			if (serverQueue.repeating) return this.play(client, guild, serverQueue.songs[0]);
			serverQueue.songs.shift();
			this.play(client, guild, serverQueue.songs[0]);
		})
		.on("error", error => {
			console.error(error);
		});
	dispatcher.setVolume(Math.round(Number(serverQueue.volume)) / 200);
	if (client.nowPlaying) {
		const { mes, embed } = this.npMsg(client.queue, guild);
		client.nowPlaying.edit(mes, { embed: embed });
		setInterval(() => {
			const { mes, embed } = this.npMsg(client.queue, guild);
			client.nowPlaying.edit(mes, { embed: embed });
		}, 5000);
	}

	if (serverQueue.repeating) return serverQueue.textChannel.send(`✅ A-Music repeating: **${song.title}**`);
	else return serverQueue.textChannel.send(`✅ A-Music start playing: **${song.title}**`, {
		embed: {
			color: 0x36393e,
			description: `Time song: (\`${song.duration}\`)`,
			image: {
				url: song.img
			},
			footer: {
				text: `Requested by ${song.requestedBy.username}`,
				icon_url: song.requestedBy.displayAvatarURL
			}
		}
	});
}
//play.son.duration
module.exports.dur = duration => {
	const hrs = duration.hours === 1 ? (duration.hours > 9 ? `${duration.hours}:` : `0${duration.hours}:`) : "";
	const min = duration.minutes > 9 ? `${duration.minutes}:` : `0${duration.minutes}:`;
	const sec = duration.seconds > 9 ? duration.seconds : `0${duration.seconds}`;
	return `${hrs}${min}${sec}`;
}
//play.video.thumbnails
module.exports.videoIMG = thumbnails => {
	if (thumbnails.maxres) {
		return thumbnails.maxres.url;
	} else if (!thumbnails.maxres && thumbnails.standard) {
		return thumbnails.standard.url;
	} else if (!thumbnails.standard && thumbnails.high) {
		return thumbnails.high.url;
	} else if (!thumbnails.high && thumbnails.medium) {
		return thumbnails.medium.url;
	}
	return "http://i8.ae/bWaN6";
}
//play.nowPlaying.message.embed
module.exports.npMsg = (queue, guild) => {
	const serverQueue = queue.get(guild.id);
	let embedNp;
	let msg;
	if (!serverQueue) {
		msg = "⛔ No music **playing**....";
		embedNp = {
			color: 0x36393e,
			title: "No music playing",
			description: `\u23F9 ${this.bar(-1)} ${this.volumeIcon(100)}`
		};
	} else {
		msg = "🎶 **Now Playing..**";
		embedNp = {
			color: 0x36393e,
			thumbnail: {
				url: serverQueue.songs[0].img
			},
			author: {
				name: serverQueue.songs[0].requestedBy.tag,
				icon_url: serverQueue.songs[0].requestedBy.displayAvatarURL
			},
			title: serverQueue.songs[0].title,
			url: serverQueue.songs[0].url,
			description: this.embedFormat(serverQueue)
		};
	}
	return {
		mes: msg,
		embed: embedNp
	};
}
//nowPlaying.message.embed.description
module.exports.embedFormat = serverQueue => {
	if (!serverQueue) {
		return `No music playing\n\u23F9 ${this.bar(-1)} ${this.volumeIcon(100)}`;
	} else if (serverQueue && !serverQueue.playing) {
		return `No music playing\n\u23F9 ${this.bar(-1)} ${this.volumeIcon(serverQueue.volume)}`;
	} else {
		let progress = serverQueue.connection.dispatcher.time / serverQueue.songs[0].msDur;
		return `${serverQueue.connection.dispatcher.paused ? "\u23F8" : "\u25B6"} ${this.bar(progress)} \`[${this.formatTime(serverQueue.connection.dispatcher.time)}/${serverQueue.songs[0].duration}]\`${this.volumeIcon(serverQueue.volume)}`;
	}
}
//nowPlaying.message.embed.startTimeAndendTime
module.exports.formatTime = duration => {
	var seconds = parseInt((duration / 1000) % 60);
	var minutes = parseInt((duration / (1000 * 60)) % 60);
	var hours = parseInt((duration / (1000 * 60 * 60)) % 24);
	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;
	return (hours > 0 ? hours + ":" : "") + minutes + ":" + seconds;
}
//nowPlaying.message.embed.bar
module.exports.bar = precent => {
	let str = "";
	for (var i = 0; i < 12; i++) {
		const res = parseInt(precent * 12)
		if (i === res) {
			str += "\uD83D\uDD18";
		}
		else {
			str += "▬";
		}
	}
	return str;
}
//nowPlaying.message.embed.volumeIcon
module.exports.volumeIcon = volume => {
	if (volume === 1)
		return "\uD83D\uDD07";
	if (volume < 50)
		return "\uD83D\uDD08";
	if (volume < 150)
		return "\uD83D\uDD09";
	return "\uD83D\uDD0A";
}
