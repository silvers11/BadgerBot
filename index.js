const tmi=require('tmi.js');
const dotenv=require('dotenv');
dotenv.config();
const client=new tmi.client({
  connection:{
    secure:true,
    reconnect:true
  },
  channels:[process.env.TWITCH_CHANNEL]
});
client.connect();
client.on('message',(channel,tags,message,self) =>{
  console.log(`${tags['display-name']}: ${message}`);
});