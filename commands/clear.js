module.exports.run = async (client, message, args, ops) => {
	if (ops.fun.checkPermission(client, message, "MANAGE_MESSAGES") === false) return;
	let user = message.mentions.members.first() || message.guild.members.get(args[1]);
	let arg = parseInt(args[1]);
	if (!args[1]) {
		try {
			message.channel.fetchMessages({
				limit: 200
			}).then(msg => {
				if (msg > 100) {
					message.channel.bulkDelete(100).then(msg2 => {
						message.channel.bulkDelete(msg - 100).then(msg3 => {
							message.channel.send(`**I have cleared \`${msg2.size + msg3.size}messages\`**`).then(a => a.delete(5000));
						});
					});
				} else if (msg <= 100) {
					message.channel.bulkDelete(msg).then(msg2 => {
						message.channel.send(`**I have cleared \`${msg2.size}messages\`**`).then(a => a.delete(5000));
					});
				}
			});
		} catch (e) {
			console.error(e);
			client.users.get(client.config.owner).send(`⚠ **Error \`clear [200, (No args[1])] command\`:**\`\`\`js\n${e.stack}\`\`\``);
			return message.channel.send("⚠ **Error**, `The error state has been sent to the my programmer!`");
		}
	} else if (arg > 100) {
		if (arg > 200) return message.channel.send("❌ **You can't clear more than `200` messages**");
		try {
			message.channel.fetchMessages({
				limit: arg
			}).then(msg => {
				message.channel.bulkDelete(100).then(msg2 => {
					message.channel.bulkDelete(msg - 100).then(msg3 => {
						message.channel.send(`**I have cleared \`${msg2.size + msg3.size}messages\`**`).then(a => a.delete(5000));
					});
				});
			});
		} catch (e) {
			console.error(e);
			client.users.get(client.config.owner).send(`⚠ **Error \`clear (args[1] > 100 && !args[1] > 200) command\`:**\`\`\`js\n${e.stack}\`\`\``);
			return message.channel.send("⚠ **Error**, `The error state has been sent to the my programmer!`");
		}
	} else if (arg <= 100) {
		try {
			message.channel.fetchMessages({
				limit: arg
			}).then(msg => {
				message.channel.bulkDelete(msg).then(msg2 => {
					message.channel.send(`**I have cleared \`${msg2.size}messages\`**`).then(a => a.delete(5000));
				});
			});
		} catch (e) {
			console.error(e);
			client.users.get(client.config.owner).send(`⚠ **Error \`clear (args[1] <= 100) command\`:**\`\`\`js\n${e.stack}\`\`\``);
			return message.channel.send("⚠ **Error**, `The error state has been sent to the my programmer!`");
		}
	} else if (user) {
		if (!args[2]) {
			try {
				message.channel.fetchMessages({
					limit: 200
				}).then(msg => {
					if (msg > 100) {
						msg = msg.filter(m => m.author.id === user.id).array().slice(0, msg);
						message.channel.bulkDelete(100).then(msg2 => {
							message.channel.bulkDelete(msg - 100).then(msg3 => {
								message.channel.send(`**I have cleared \`${msg2.size + msg3.size}messages\`**`).then(msg => msg.delete(5000));
							});
						});
					} else if (msg <= 100) {
						msg = msg.filter(m => m.author.id === user.id).array().slice(0, msg);
						message.channel.bulkDelete(msg).then(msg2 => {
							message.channel.send(`**I have cleared \`${msg2.size}messages\`**`).then(msg => msg.delete(5000));
						});
					}
				});
			} catch (e) {
				console.error(e);
				client.users.get(client.config.owner).send(`⚠ **Error \`clear (user, [no args[2]]) command\`:**\`\`\`js\n${e.stack}\`\`\``);
				return message.channel.send("⚠ **Error**, `The error state has been sent to the my programmer!`");
			}
		} else {
			if (parseInt(args[2]) > 200) return message.channel.send("❌ **You can't clear more than `200` messages**");
			try {
				message.channel.fetchMessages({
					limit: args[2]
				}).then(msg => {
					if (msg > 100) {
						msg = msg.filter(m => m.author.id === user.id).array().slice(0, msg);
						message.channel.bulkDelete(100).then(msg2 => {
							message.channel.bulkDelete(msg - 100).then(msg3 => {
								message.channel.send(`**I have cleared \`${msg2.size + msg3.size}messages\`**`).then(msg => msg.delete(5000));
							});
						});
					} else if (msg <= 100) {
						msg = msg.filter(m => m.author.id === user.id).array().slice(0, msg);
						message.channel.bulkDelete(msg).then(msg2 => {
							message.channel.send(`**I have cleared \`${msg2.size}messages\`**`).then(msg => msg.delete(5000));
						});
					}
				});
			} catch (e) {
				console.error(e);
				client.users.get(client.config.owner).send(`⚠ **Error \`clear (user, [yes args[2]]) command\`:**\`\`\`js\n${e.stack}\`\`\``);
				return message.channel.send("⚠ **Error**, `The error state has been sent to the my programmer!`");
			}
		}
	}
}

module.exports.help = {
	name: "clear",
	aliases: ["lsp", "ؤمثشق"],
	category: "Admin"
}
// module.exports.run = async (client, message, args, ops) => {
// 	if(!message.member.hasPermission("MANAGE_MESSAGES")) return console.log(`${message.author.tag} used command clear [X]`);

// 	let user = message.mentions.members.first() || message.guild.members.get(args[1]);
// 	if(!args[1]) {
// 		message.channel.bulkDelete(100).then(msg1 => {
// 			message.channel.bulkDelete(100).then(msg2 => {
// 				message.channel.send(`\`\`\`js\nCleared ${msg1.size + msg2.size} messages.\`\`\``).then(msg => msg.delete(5000));
// 			}).catch(e => console.log(e.stack));
// 		}).catch(e => console.log(e.stack));
// 	} else if(user) {
// 		let amount = parseInt(args[2]);
// 		if(!args[2]) {
// 			message.channel.fetchMessages({
// 				limit: 200,
// 			}).then((messages) => {
// 				if (user) {
// 					let filterBy = user ? user.id : Client.user.id;
// 					messages = messages.filter(m => m.author.id === filterBy).array().slice(0, 100);
// 				}
// 				message.channel.bulkDelete(messages).then(msg1 => {
// 					message.channel.send(`\`\`\`js\nCleared ${msg1.size} messages.\`\`\``).then(msg => msg.delete(5000));
// 				}).catch(e => console.log(e.stack));
// 			});
// 		} else {
// 			if(isNaN(args[2]) || parseInt(args[2]) > 100) return message.channel.send('**لا يمكنك مسح اكثر من `200`رساله**');
// 			message.channel.fetchMessages({
// 				limit: parseInt(args[2]),
// 			}).then((messages) => {
// 				if (user) {
// 					let filterBy = user ? user.id : Client.user.id;
// 					messages = messages.filter(m => m.author.id === filterBy).array().slice(0, parseInt(args[2]));
// 				}
// 				message.channel.bulkDelete(messages).then(msg1 => {
// 					message.channel.send(`\`\`\`js\nCleared ${msg1.size} messages.\`\`\``).then(msg => msg.delete(5000));
// 				}).catch(e => console.log(e.stack));
// 			});
// 		}
// 	} else if(parseInt(args[1]) > 100) {
// 		if(isNaN(args[1])) return message.channel.send('من فضلك اكتب رقما');
// 		if(parseInt(args[1]) > 200) return message.channel.send('**لا يمكنك مسح اكثر من `200`رساله**');
// 		let msgconet = parseInt(args[1]) - 100;
// 		message.channel.bulkDelete(100).then(msg1 => {
// 			message.channel.bulkDelete(args[1] - 100).then(msg2 => {
// 				message.channel.send(`\`\`\`js\nCleared ${msg1.size + msg2.size} messages.\`\`\``).then(msg => msg.delete(5000));
// 			}).catch(e => console.log(e.stack));
// 		}).catch(e => console.log(e.stack));
// 	} else if(parseInt(args[1]) <= 100) {
// 		if(isNaN(args[1])) return message.channel.send('من فضلك اكتب رقما');
// 		let messagecount = parseInt(args[1]);
// 		message.channel.bulkDelete(messagecount).then(msg1 => {
// 			message.channel.send(`\`\`\`js\nCleared ${msg1.size} messages.\`\`\``).then(msg => msg.delete(5000));
// 		}).catch(e => console.log(e.stack));
// 	}
// }