const tmi=require('tmi.js');
const dotenv=require('dotenv');
dotenv.config();
const client=new tmi.client({
  connection:{
    secure:true,
    reconnect:true
  },
  identity:{
    username: process.env.TWITCH_USERNAME,
    password: process.env.TWITCH_OAUTH_TOKEN,
  },
  channels:[process.env.TWITCH_CHANNEL]
});
client.connect();
client.on('message',(channel,tags,message,self) =>{
  console.log(`${tags['display-name']}: ${message}`);
  //prevent echoing
  if(self) return;
  if(message.toLocaleLowerCase()==='!hello'){
    client.say(channel, `Welcome @${tags.username}!`)
  }
});