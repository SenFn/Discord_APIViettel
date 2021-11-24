const request = require('request');
let prefix = require("../data.json").prefix;
module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    // await request.post('https://viettelgroup.ai/voice/api/tts/v1/rest/voices',function(err,res,body){
    //     if(err) return;
    //     //console.log(res)
    //     let json_string = JSON.stringify(body); //to json for save
    //     console.log(json_string)
    //     var fs = require('fs');
    //     fs.writeFileSync("./tts/listvoice.json", body, function(err) {
    //         if (err) {
    //             console.log(err);
    //         }
    //     });
    // })
    let jsonRead = require("../tts/listvoice.json"); //string to Json for read
    let msg = "";
    jsonRead.forEach(element => {
        msg += `{ "${element.name}", "${element.description}", code: "${element.code}"},\n`;
    });
    let currentVoice = require("../data.json").voice;
    message.channel.send("**List voice:**```json\n"+msg+`{ "currentVoice": "${currentVoice}"}`+"`````Set voice command: "+prefix+"voicechange code ``");
}

module.exports.help = {
    name: "listvoice"
}