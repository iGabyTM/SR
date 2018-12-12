const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require('./config.json');

var statustring = "No signal";
var request = require('request');
var mcCommand = '/minecraft';
var mcIP = settings.ip;
var mcPort = settings.port;

var url = 'https://api.mcsrvstat.us/1/' + mcIP + ':' + mcPort;

function update() {
  request(url, function(err, response, body) {
      if(err) {
          console.log(err);
      }
      body = JSON.parse(body);
      var status = 'Server offline';
      /*console.log(body.motd.raw);
      console.log(body.players.online);*/
      if(body.debug.ping) {
          /*if((body.motd=="&cWe are under maintenance.")||(body.players.now>=body.players.max)){
            client.user.setStatus('idle')
            .catch(console.error);
          }else{
            client.user.setStatus('online')
            .catch(console.error);
          }*/
            if(body.players.online) {
                status = 'Online: ' + body.players.online + '  /  ' + body.players.max;
              } else {
                status = 'No online players 😢';
        }
      } else {
        client.user.setStatus('dnd')
        .catch(console.error);
      }
      client.user.setActivity(status, { type: 'PLAYING' })
      .then(presence => console.log(status))
      .catch(console.error);
  });
}
client.on("ready", () => {
  console.log("I am ready!");
  client.setInterval(update,15000);
});

client.login(settings.token);