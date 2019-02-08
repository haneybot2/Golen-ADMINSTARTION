module.exports.run = async (client, message, args, ops) => {
	const msg = await message.channel.send("Generating avatar...");
	const target = message.mentions.members.first() || message.guild.members.get(args[1]) || message.author;

	try {
		await message.channel.send(`**${target.username || target.user.username}**'s avatar:`, {
			files: [
				{
					attachment: target.displayAvatarURL || target.user.displayAvatarURL,
					name: "avatar.png"
				}
			]
		});
		msg.delete();
	} catch (error) {
		console.error(error);
		msg.edit("❌ **`I can't find avatar`**");
	}
}

module.exports.help = {
	name: "avatar",
	aliases: ["ava"],
	description: "To see your avatar",
	comprehensive: "You can use this to see your avatar or anyone else, provided you are in the same server",
	examples: "!avatar @RedDead | !avatar 454527533279608852 | !ava @RedDead",
	usage: "(avatar / ava) (nothing / [@user/userID])",
	category: "General"
}