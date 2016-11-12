const Discord = require('discord.js');
const bot = new Discord.Client();
const token = "MjQ2NzE5OTE4ODMyMDkxMTM2.CwevYQ.Igk_JRmOnhK5p32MNYlicKfClzY";
const championgg_token = "13a49d2950a0a74457b1d3379c490850";

const GG = require('./node_modules/@solomid/node-gg');
const gg = GG.init('13a49d2950a0a74457b1d3379c490850');
const ddItems = require('./data_dragon/6.22.1/data/en_US/item.json');
const ddChampions = require('./data_dragon/6.22.1/data/en_US/champion.json');

var version = "1.00";
var features = "\n->Get popular/winning item builds/skills for champions. (As provided by Champion.gg)\n\n->Reply to some basic messages :)."
var help = "\nTo get a champion build: \n\tType: \n\t\t!league {ChampionName} | {Build/Skill} {Popular/Winning}\n\nMake sure to capitalize the first letter!!\nEverything after the | is optional."

var botInformation = {
  "!version" : "I am sg-league-bot version:\n" + version,
  "!features" : "As of right now I can:\n" + features,
  "!help" : "Here is how you use me:\n" + help
}

var basicResponse = {
  "Hello" : "Hello, ",
  "Hi" : "Hi, ",
  "Good bye" : "Good bye, ",
  "Good night" : "Good night, ",
  "im sleep" : "Good night, ",
  "cya guys" : "See you later, ",
  "moan emoji" : ":weary::weary::weary: "
};
var callBackFunction = function() {
  console.log("Hello");
}

bot.on("message", botinfo => {
  if (botInformation[botinfo.content]){
    botinfo.channel.sendMessage(botInformation[botinfo.content]);
  }
})

bot.on("message", greeting => {
  if (basicResponse[greeting.content]) {
    if (basicResponse[greeting.content] != ":weary::weary::weary: ") {
      greeting.channel.sendMessage(basicResponse[greeting.content] + greeting.author.username);
    }
    else {
      greeting.channel.sendMessage(basicResponse[greeting.content]);
    }
  }
})

bot.on("message", msg => {
  let prefix = "!";
  if (!msg.content.startsWith(prefix)) return;
  skillOrder = function(response, json) {
    var skill = "";
    json[0].order.forEach(function(value) {
      skill += value;
    })
    msg.channel.sendMessage(skill);
  }

  //gg.champions.items.finished.popular("Nunu", itemBuild);//
  itemBuild = function(response, json) {
    var build = "";
    json[0].items.forEach(function(value) {
      build += ddItems.data[value].name + "\n";
    });
    msg.channel.sendMessage(build);
  }

  if (msg.content.startsWith(prefix + "league")) {
    let args = msg.content.split(" ");
    if (!ddChampions.data[args[1]]) return;
    switch (args[2]) {
      case "Build":
        if (args[3] == "Popular") {
          return gg.champions.items.finished.popular(args[1], itemBuild);
        }
        else if (args[3] == "Winning") {
          return gg.champions.items.finished.winning(args[1], itemBuild);
        }
        break;
      case "Skill":
        if (args[3] == "Popular") {
          return gg.champions.skills.order.popular(args[1], skillOrder);
        }
        else if (args[3] == "Winning") {
          return gg.champions.skills.order.winning(args[1], skillOrder);
        }
        break;
      default:
        msg.channel.sendMessage("Most popular skill build and item build for " + args[1]);
        gg.champions.skills.order.popular(args[1], skillOrder);
        gg.champions.items.finished.popular(args[1], itemBuild);
        return;
    }
  }

  if (msg.content.startsWith(prefix + "Salami")) {
    msg.channel.sendMessage("Grill");
  }

  if (msg.content.startsWith(prefix + "bot_log_out")) {
    if (msg.author.id == "209882262429368320") {
      msg.channel.sendMessage("sg-league-bot logging out!");
      bot.destroy();
    }
  }
});

bot.on('ready', ()=> {
  console.log("sg-league-bot started.");
});

bot.on('error', e => { console.error(e); });
bot.login(token);
