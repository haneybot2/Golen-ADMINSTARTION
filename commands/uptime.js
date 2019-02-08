module.exports.run = async (client, message, args, ops) => {
    const uptime = client.uptime;
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let notCompleted = true;
    while (notCompleted) {
        if (uptime >= 8.64e+7) {
            days++;
            uptime -= 8.64e+7;
        } else if (uptime >= 3.6e+6) {
            hours++;
            uptime -= 3.6e+6;
        } else if (uptime >= 60000) {
            minutes++;
            uptime -= 60000;
        } else if (uptime >= 1000) {
            seconds++;
            uptime -= 1000;
        }
        if (uptime < 1000) notCompleted = false;
    }
    return message.channel.send("`" + `${days} days, ${hours} hrs, ${minutes} min, ${seconds} sec` + "`");
}

module.exports.help = {
    name: "uptime",
    aliases: [],
    category: "General"
}
