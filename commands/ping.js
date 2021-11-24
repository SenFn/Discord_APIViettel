module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    //Ping
    message.channel.send("yaaaaaaa....").then(m=>{
        let ping = m.createdTimestamp - message.createdTimestamp
        m.edit(`Latency: \`${ping} ms\``)
    })
    return;
}

module.exports.help = {
    name: "ping"
}