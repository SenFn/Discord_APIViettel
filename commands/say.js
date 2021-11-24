const request = require('request');
const fs = require('fs');
const { joinVoiceChannel,createAudioResource, createAudioPlayer } = require('@discordjs/voice');
const dataGet = require('../data.json');
const prefix = dataGet.prefix;
let queueRead = require("../queue.json");
const qh = require("../handlequeue");
const { MessageEmbed } = require('discord.js');
module.exports.run = async (bot, message, args, player) => {
    let messageReceive = args.join(" ").replace(/(\r\n|\n|\r|")/gm, " ");
    
    if(args.length < 1 ){
        
        var returnMsg =[
            `Say: \`${prefix}lói text\`\n`,
            `Description: ${this.help.description}`
            ];
            const helps = new MessageEmbed()
            .setColor("#15edf1")
            .setTitle("Cách dùng")
            .setFooter(`Command: ${message}`)
            .setTimestamp()
            .setDescription(returnMsg.join(""))  
        return message.channel.send({ embeds: [helps] });
    }
    if(args.length > 40 )
        return message.reply("``Text`` không được quá 40 chữ!");
    
    if(!message.member.voice.channel)
        return message.reply("Hãy vào voice Channel trước!");    
    
    if(message.guild.members.cache.get("912782091442356244").voice.channel){
        if(message.guild.members.cache.get("912782091442356244").voice.channel.id != message.member.voice.channel.id)
            return message.reply("Bot đang được sử dụng tại phòng khác!"); 
    }
            
    var data = `{"text": "`+ messageReceive.toString() +`", "voice": "`+dataGet.voice+`", "id": "2", "without_filter": false, "speed": 1.0, "tts_return_option": 3}`;
    var json_obj = JSON.parse(data);
    var today = Date.now();  

    await request.post(
        'https://viettelgroup.ai/voice/api/tts/v1/rest/syn/', 
        {   json: json_obj,
            headers : {'Content-type': 'application/json', 'token': dataGet.tokenVT} 
        },
    ).pipe(fs.createWriteStream('./tts/'+today+'.mp3'));
    
      
    queueRead.push(today);
    let json_string = JSON.stringify(queueRead); //to json for save
    fs.writeFileSync("./queue.json", json_string, function(err) {
        if (err) {
            console.log(err);
        }
    });
    qh.QueueHandle(bot, message, args, player,queueRead);

}

module.exports.help = {
    name: "lói",
    description:"Chuyển nội dung dạng text thành âm thanh. Yêu cầu người sử dụng phải tham gia một phòng âm thanh."
}