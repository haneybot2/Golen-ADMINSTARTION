module.exports = (client) => {
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
