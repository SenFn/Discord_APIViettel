const request = require('request');
const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_VOICE_STATES
  ]});

Client.commands = new Discord.Collection();
const head = require("./data.json");
let queueRead = require("./queue.json");

const { joinVoiceChannel,createAudioResource, createAudioPlayer } = require('@discordjs/voice');
const player = createAudioPlayer();
const connection = null;
fs.readdir("./commands/", (err, files)=>{
  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop()==="js")
  if(jsfile.length <= 0){
      console.log("Không tìm thấy lệnh");
      return;
  }
  jsfile.forEach((f, i)=>{
      let props = require(`./commands/${f}`);
      console.log(`${f} loaded!`);
      Client.commands.set(props.help.name, props);

  });
  module.exports.run = async (Client, message, args) => {
      if(message.author.bot) return;
      if(message.channel.type === "dm") return;
      
      let prefix = botconfig.prefix;
      let messageArray = message.content.split(" ");
      let cmd= messageArray[0];
  }
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);  
});

client.on('voiceStateUpdate', (oldState, newState) => {

	let newUserChannel = newState.channelId;
	let oldUserChannel = oldState.channelId;

  if(oldUserChannel != null){
    let memberLeft = newState.member.user.id;

    //kiểm tra nếu con bot leave thì remove queue
    if(memberLeft == client.user.id){      
      //console.log(memberLeft);
      fs.writeFileSync("./queue.json", "[]", function(err) {
        if (err) {
            console.log(err);
        }
    });
    }
  }  

  // console.log(newUserChannel);
  // console.log(oldUserChannel);
});

client.on('messageCreate', async message => {
  if(message.author.bot == true) return;
  if(message.channel.type === "DM") return;
  let prefix = head.prefix;
  console.log(message.content);
  
  let messageArray = message.content.split(" ");

  if(messageArray[0].slice(0,1) == prefix){
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = Client.commands.get(cmd.slice(prefix.length));
    if (commandfile){
      commandfile.run(client,message,args,player);
    } 
  }

});

client.login(head.token);

