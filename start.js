const Discord = require("discord.js");
const { TOKEN } = require("./config.js");
const Manager = new Discord.ShardingManager("./index.js", { totalShards: 2, token: TOKEN });
Manager.spawn();

Manager.on("message", (shard, msg) => {
    console.log("[" + shard.id + 1 + "] " + msg);
});