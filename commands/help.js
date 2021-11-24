const data = require('../data.json');
const { MessageEmbed } = require('discord.js');
module.exports.run = async (bot, message, args) => {
   let prefix = data.prefix;
   //help commands
   var help =[
    `Ping: \`${prefix}ping\`\n`,
    `Thông tin Bot: \`${prefix}bot\`(maintenance)\n`,
    `List voice: \`${prefix}listvoice\`\n`,
    `Perfix: \`${prefix}prefix\`\n`,
    `Say: \`${prefix}lói\`\n`,
    `Voice Change: \`${prefix}voicechange\`\n`,
    ];

    const helps = new MessageEmbed()
        .setColor("#15edf1")
        .setTitle("Commands")
        .setFooter(`Command: ${message}`)
        .setTimestamp()
        .setDescription(help.join(""))  
    return message.channel.send({ embeds: [helps] });
}

module.exports.help = {
    name: "help"
}