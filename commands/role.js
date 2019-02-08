module.exports.run = async (client, message, args, ops) => {
	if (ops.fun.checkPermission(client, message, "MANAGE_ROLES_OR_MANAGE_GUILD ") === false) return;
	const helpEmbed = {
		color: 0x36393e,
		title: "**أمثله على الأوامر : **",
		description: `**${client.config.prefix}role @RedDead. Admin** : لأعطاء رتبة لعضو\n**${client.config.prefix}role @RedDead. -Admin** : لازالة الرتبة من شخص\n**${client.config.prefix}role all [role]** : لأعطاء رتبة للجميع\n**${client.config.prefix}role humans [role]** : لأعطاء رتبة للاشخاص فقط\n**${client.config.prefix}role bots [role]** : لأعطاء رتبة لجميع البوتات`,
		footer: {
			text: `Requested by ${message.author.tag}`,
			icon_url: message.author.avatarURL
		}
	};
	//const userM = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.id === args[1]));
	const userM = message.mentions.members.first() || message.guild.members.get(args[1]);
	if (!args[1]) return message.channel.send({ embed: helpEmbed });
	if (!userM && args[1] !== "humans" && args[1] !== "bots" && args[1] !== "all") return message.channel.send({ embed: helpEmbed });
	const argsRole = message.content.toLowerCase().split(" ").slice(2);
	const roleRe = argsRole.join(" ").replace("-", "");
	const getRole = message.mentions.roles.first() || message.guild.roles.find(r => r.name.toLowerCase() === roleRe) || message.guild.roles.find(r => r.name.toLowerCase().includes(roleRe)) || message.guild.roles.get(roleRe);

	if (userM) {
		if (!argsRole) return message.channel.send({ embed: helpEmbed });
		if (!getRole) return message.channel.send("❌ **I can't find role.**");
		if (getRole.name === "@everyone") return message.channel.send("❌ **You can't give this role to anyone**");
		if (getRole.position >= message.guild.me.highestRole.position) return message.channel.send(`❌ **I can't \`GIVE\` or \`DELETE\` any user have or not have \`${getRole.name}\` role beacuse this role highest from my role!**`);
		if (userM.highestRole.position >= message.member.highestRole.position) return message.channel.send("انا اسف , ولكن انت لا يمكن تغير رتبة احد الاشخاص اعلي منك او يساويك في الرتبة");

		if (args[2].includes("-")) {
			if (!message.guild.member(userM).roles.has(getRole.id)) return message.channel.send(`❌ ${userM} **does not have the ${getRole.name} role to withdraw.**`);
			message.guild.member(userM).removeRole(getRole.id);
			return message.channel.send({
				embed: {
					color: 0x2aff00,
					description: `✅ **Changed roles for <@${userM.id}>, -${getRole.name}.**`,
					footer: {
						text: `Requested by ${message.author.tag}`,
						icon_url: message.author.avatarURL
					}
				}
			});
		} else {
			if (message.guild.member(userM).roles.has(getRole.id)) return message.channel.send(`❌ ${userM} **already has the ${getRole.name}.**`);
			message.guild.member(userM).addRole(getRole.id);
			return message.channel.send({
				embed: {
					color: 0x2aff00,
					description: `✅ **Changed roles for <@${userM.id}>, +${getRole.name}.**`,
					footer: {
						text: `Requested by ${message.author.tag}`,
						icon_url: message.author.avatarURL
					}
				}
			});
		}
	} else if (args[1] === "humans") {
		if (!argsRole) return message.channel.send({ embed: helpEmbed });
		if (!getRole) return message.channel.send("❌ **I can't find role.**");
		if (getRole.name === "@everyone") return message.channel.send("❌ **You can't give this role to anyone**");
		if (getRole.position >= message.guild.me.highestRole.position) return message.channel.send(`❌ **I can't \`GIVE\` or \`DELETE\` \`${getRole.name}\` role of all human beings beacuse this role highest from my role!**`);
		if (getRole.position >= message.member.highestRole.position) return message.channel.send("حسنا يا صديقي انا اعتزر منك لانك لا يمكنك اعطاء كل الاشخاص رتبة اعلي منك او تمتلكها");

		if (args[2].includes("-")) {
			if (message.guild.members.filter(m => message.guild.member(m).roles.has(getRole.id) && !m.user.bot).size == 0) return message.channel.send(`❌ I can't find any user have **${getRole.name}** role!`);
			return message.channel.send({
				embed: {
					color: 0x36393e,
					title: `Are you sure of removing **${getRole.name} role** of all humans`,
					description: "You have one minute to choose",
					footer: {
						text: message.author.tag,
						icon_url: message.author.displayAvatarURL
					}
				}
			}).then(msg => {
				msg.react("✅");
				msg.react("❌");
				var removeRole = (reaction, user) => reaction.emoji.name === "✅" && user.id === message.author.id;
				var dontRemoveRole = (reaction, user) => reaction.emoji.name === "❌" && user.id === message.author.id;
				const remove = msg.createReactionCollector(removeRole, { time: 60000 });
				const dontRemove = msg.createReactionCollector(dontRemoveRole, { time: 60000 });
				remove.on("collect", () => {
					msg.delete();
					message.channel.send(`⏲ Now removing ${getRole.name} role of all human beings...`).then(async message1 => {
						message.guild.members.filter(m => message.guild.member(m).roles.has(getRole.id) && !m.user.bot).forEach(m => message.guild.member(m).removeRole(getRole.id));
						await message1.edit(`👍 **${getRole.name} role of all human beings has been removed**`);
					});
					return undefined;
				});
				dontRemove.on("collect", () => {
					msg.delete();
					return message.channel.send("❌ **Your order has been canceled**")
				});
			});
		} else {
			if (message.guild.members.filter(m => message.guild.member(m).roles.has(getRole.id) && !m.user.bot).size == 0) return message.channel.send(`❌ I can't find any user have **${getRole.name}** role!`);
			return message.channel.send({
				embed: {
					color: 0x36393e,
					title: `Are you sure of giving all human beings **${getRole.name} role**`,
					description: "You have one minute to choose",
					footer: {
						text: message.author.tag,
						icon_url: message.author.displayAvatarURL
					}
				}
			}).then(msg => {
				msg.react("✅");
				msg.react("❌");
				var giveRole = (reaction, user) => reaction.emoji.name === "✅" && user.id === message.author.id;
				var dontGiveRole = (reaction, user) => reaction.emoji.name === "❌" && user.id === message.author.id;
				const give = msg.createReactionCollector(giveRole, { time: 60000 });
				const dontgive = msg.createReactionCollector(dontGiveRole, { time: 60000 });
				give.on("collect", () => {
					msg.delete();
					message.channel.send(`⏲ Now give all human beings are given **${getRole.name} role**`).then(async message1 => {
						message.guild.members.filter(m => !message.guild.member(m).roles.has(getRole.id) && !m.user.bot).forEach(m => message.guild.member(m).addRole(getRole.id));
						await message1.edit(`👍 **All humans were given ${getRole.name} role**`);
					});
					return undefined;
				});
				dontgive.on("collect", () => {
					msg.delete();
					return message.channel.send("❌ **Your order has been canceled**")
				});
			});
		}
	} else if (args[1] === "bots") {
		if (!argsRole) return message.channel.send({ embed: helpEmbed });
		if (!getRole) return message.channel.send("❌ **I can't find role.**");
		if (getRole.name === "@everyone") return message.channel.send("❌ **You can't give this role to anyone**");
		if (getRole.position >= message.guild.me.highestRole.position) return message.channel.send(`❌ **I can't \`GIVE\` or \`DELETE\` \`${getRole.name}\` role from all the bots beacuse this role highest from my role!**`);
		if (getRole.position >= message.member.highestRole.position) return message.channel.send("حسنا يا صديقي انا اعتزر منك لانك لا يمكنك اعطاء كل البوتات رتبة اعلي منك او تمتلكها");

		if (args[2].includes("-")) {
			message.delete();
			message.channel.send(`⏲ ${getRole.name} role is being removed from all the bots`).then(message1 => {
				message.guild.members.filter(b => message.guild.member(b).roles.has(getRole.id) && b.user.bot).forEach(b => message.guild.member(b).removeRole(getRole.id));
				return message1.edit(`👍 **${getRole.name} role was removed from all the bots**`);
			});
			return undefined;
		} else {
			message.delete();
			message.channel.send(`⏲ Now giving all the bots **${getRole.name} role**`).then(message1 => {
				message.guild.members.filter(b => !message.guild.member(b).roles.has(getRole.id) && b.user.bot).forEach(b => message.guild.member(b).addRole(getRole.id));
				return message1.edit(`👍 **All bots were given ${getRole.name} role**`);
			});
			return undefined;
		}
	} else if (args[1] === "all") {
		if (!argsRole) return message.channel.send({ embed: helpEmbed });
		if (!getRole) return message.channel.send("❌ **I can't find role.**");
		if (getRole.name === "@everyone") return message.channel.send("❌ **You can't give this role to anyone**");
		if (getRole.position >= message.guild.me.highestRole.position) return message.channel.send(`❌ **I can't \`GIVE\` or \`DELETE\` \`${getRole.name}\` role from all the people to the server beacuse this role highest from my role!**`);
		if (getRole.position >= message.member.highestRole.position) return message.channel.send("حسنا يا صديقي انا اعتزر منك لانك لا يمكنك اعطاء كل الاعضاء الي في السيرفر ومنهم البوتات رتبة اعلي منك او تمتلكها");

		if (args[2].includes("-")) {
			return message.channel.send({
				embed: {
					color: 0x36393e,
					title: `Are you sure to remove ${getRole.name} role from all`,
					description: "You have one minute to choose",
					footer: {
						text: message.author.tag,
						icon_url: message.author.displayAvatarURL
					}
				}
			}).then(async msg => {
				msg.react("✅");
				msg.react("❌");
				var removeRole = (reaction, user) => reaction.emoji.name === "✅" && user.id === message.author.id;
				var dontRemoveRole = (reaction, user) => reaction.emoji.name === "❌" && user.id === message.author.id;
				const remove = msg.createReactionCollector(removeRole, { time: 60000 });
				const dontRemove = msg.createReactionCollector(dontRemoveRole, { time: 60000 });
				remove.on("collect", () => {
					msg.delete();
					message.channel.send(`⏲ **${getRole.name} role**  is being removed from everyone..`).then(async message1 => {
						message.guild.members.filter(m => message.guild.member(m).roles.has(getRole.id)).forEach(m => message.guild.member(m).removeRole(getRole.id));
						await message1.edit(`👍 **${getRole.name} role removed from all**`);
					});
					return undefined;
				});
				dontRemove.on("collect", () => {
					msg.delete();
					return message.channel.send("❌ **Your order has been canceled**")
				});
			});
		} else {
			return message.channel.send({
				embed: {
					color: 0x36393e,
					title: `Are you sure of giving all **${getRole.name} role**`,
					description: "You have one minute to choose",
					footer: {
						text: message.author.tag,
						icon_url: message.author.displayAvatarURL
					}
				}
			}).then(msg => {
				msg.react("✅");
				msg.react("❌");
				var giveRole = (reaction, user) => reaction.emoji.name === "✅" && user.id === message.author.id;
				var dontGiveRole = (reaction, user) => reaction.emoji.name === "❌" && user.id === message.author.id;
				const give = msg.createReactionCollector(giveRole, { time: 60000 });
				const dontGive = msg.createReactionCollector(dontGiveRole, { time: 60000 });
				give.on("collect", () => {
					msg.delete();
					message.channel.send(`⏲ Now all is giving **${getRole.name} role**..`).then(async message1 => {
						message.guild.members.filter(m => !message.guild.member(m).roles.has(getRole.id)).forEach(m => message.guild.member(m).addRole(getRole.id));
						await message1.edit(`👍 **All were given ${getRole} role**`);
					});
					return undefined;
				});
				dontGive.on("collect", () => {
					msg.delete();
					return message.channel.send("❌ **Your order has been canceled**")
				});
			});
		}
	}
}

module.exports.help = {
	name: "role",
	aliases: [],
	category: "Admin"
}
