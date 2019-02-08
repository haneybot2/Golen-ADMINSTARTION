module.exports = (client) => {
	client.getScore = client.sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
	client.setScore = client.sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");
	client.user.setActivity("Loading..", { type: "PLAYING" });
	client.user.setStatus("dnd");
	setTimeout(() => {
		client.user.setActivity("Loading...", { type: "PLAYING" });
		client.user.setStatus("idle");
	}, 1500);
	setTimeout(() => {
		client.user.setActivity("Colden", { type: "STREAMING", url: "https://www.twitch.tv/idk" });
		client.user.setStatus("online");
		console.log("[Start] " + new Date());
	}, 2500);
}
