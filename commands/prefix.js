const data = require('../data.json');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports.run = async (bot, message, args) => {
   let prefix = data.prefix;
    if(args.length == 0){
        var returnMsg =[
            `Prefix: \`${prefix}prefix new_prefix\`\n`,
            `Description: ${this.help.description}`
            ];
            const helps = new MessageEmbed()
            .setColor("#15edf1")
            .setTitle("Prefix Cách dùng")
            .setFooter(`Command: ${message}`)
            .setTimestamp()
            .setDescription(returnMsg.join(""))  
        return message.channel.send({ embeds: [helps] });
    }

    let newChange =data;
    newChange.prefix = args[0];

    fs.writeFileSync("./data.json", JSON.stringify(newChange), function(err) {
        if (err) {
            console.log(err);
        }
    });

    var returnMsg =[
        `Prefix đổi thành công!\n`,
        `Current prefix: \`${newChange.prefix}\``
        ];
        const helps = new MessageEmbed()
        .setColor("#15edf1")
        .setTitle("Prefix Change")
        .setFooter(`Command: ${message}`)
        .setTimestamp()
        .setDescription(returnMsg.join(""))  
    return message.channel.send({ embeds: [helps] });
}

module.exports.help = {
    name: "prefix",
    description:"Thay đổi prefix lệnh của bot."
}