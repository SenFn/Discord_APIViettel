const request = require('request');
const data = require('../data.json');
const fs = require('fs');
const { join } = require('path/posix');
const { MessageEmbed } = require('discord.js');
module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = data.prefix;
    if(args.length == 0){
        var returnMsg =[
            `Voice change: \`${prefix}voicechange new_code\`\n`,
            `Description: ${this.help.description}\n`,
            `View list voice: \`${prefix}listvoice\`\n`,
            ];
            const helps = new MessageEmbed()
            .setColor("#15edf1")
            .setTitle("Voice change Cách dùng")
            .setFooter(`Command: ${message}`)
            .setTimestamp()
            .setDescription(returnMsg.join(""))  
        return message.channel.send({ embeds: [helps] });
    }

    let dataChange = data;
    let jsonRead = require("../tts/listvoice.json"); //string to Json for read
    
    let i = jsonRead.length;
    let item;
    jsonRead.forEach(element => {
        if(element.code == args[0]){
            dataChange.voice = element.code;
            fs.writeFileSync("./data.json", JSON.stringify(dataChange), function(err) {
                if (err) {
                    console.log(err);
                }
            });
            item = element;
            return;
        }    
        i--; 
    });

    if(i==0){
        message.channel.send(`Không tìm thấy code: ${args[0]}.`)
    }else{
        message.channel.send(`Thay đổi giọng nói thành công.\nCurrent voice: \`{ name: ${item.name}, des: ${item.description}, code: ${item.code}}\``)
    }
    

}

module.exports.help = {
    name: "voicechange",
    description: "Thay đổi giọng đọc của âm thanh."
}