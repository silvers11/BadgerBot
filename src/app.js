const tmi=require('tmi.js');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:__dirname+'/../.env'});
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
  if(message.toLocaleLowerCase()==='!roll'){
    var roll=RandomNumber(1,100);
    client.say(channel, `@${tags.username} you rolled a ${roll}`);
  }
  if(message.toLocaleLowerCase()==='!d20'){
    var roll=RandomNumber(1,20);
    var msg=`@${tags.username} you rolled a ${roll} `.concat(roll===1 ? 'Critical Fail!' : roll===20 ? 'Critical Hit!' : '');
    client.say(channel,msg);
  }
});

function RandomNumber(min, max){
  return Math.floor(
    Math.random() * (max - min) + min
  )
}