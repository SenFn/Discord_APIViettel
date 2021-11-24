const { joinVoiceChannel,createAudioResource, createAudioPlayer } = require('@discordjs/voice');
const { Module } = require('module');
const fs = require('fs');
var timeout = function(bot,message,args,player,queueRead) {
    setTimeout(function () {
        if(player._state.status == "idle"){
            fs.unlinkSync('./tts/'+queueRead[0].toString()+".mp3");
            queueRead.shift();
            if(queueRead.length!=0){                
                return module.exports.QueueHandle(bot,message,args,player,queueRead);
            }                
            else
                return setTimeout(() => {
                    if(!message.guild.members.cache.get("912782091442356244").voice.channel) return;
                    if(player._state.status != "idle") return timeout(bot,message,args,player,queueRead);
                    const connection = joinVoiceChannel({
                        channelId: message.member.voice.channel.id,
                        guildId: message.guild.id,
                        adapterCreator: message.guild.voiceAdapterCreator
                    });
                    connection.destroy();
                }, 120_000);
        }            
        
        timeout(bot,message,args,player,queueRead);
    }, 1000);
}

module.exports = {
    QueueHandle: async function (bot,message,args,player,queueRead) {
        if(player.state.status == "idle"){
            //khi player dang idle
            const connection = joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });
        
            const resource = createAudioResource('./tts/'+queueRead[0].toString()+".mp3", {
                metadata: {
                    title: 'TSS sound!',
                },
            });

            connection.subscribe(player);
            player.play(resource);
            timeout(bot,message,args,player,queueRead)
        }else
            return;
    }
    
    
};
