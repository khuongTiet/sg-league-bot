const GG = require('./node_modules/@solomid/node-gg');
const gg = GG.init('13a49d2950a0a74457b1d3379c490850');
const ddJSON = require('./data_dragon/6.22.1/data/en_US/item.json');

var message = "";

handler = function(options, cb) {
  console.log(options[2]);
  switch(options[2]) {
    case "build":
      console.log(options[1]);
      console.log(gg.champions.items.finished.popular(options[1], itemBuild));
    case "skill":
      var build = gg.champions.skills.order.popular(options[1], skillOrder);
      console.log("BUILD: "+message);
  }

}

callBack = function(response, json) {

}

skillOrder = function(response, json) {
  var skill = "";
  json[0].order.forEach(function(value) {
    skill += value;
  })
  skill;
}

//gg.champions.items.finished.popular("Nunu", itemBuild);//
itemBuild = function(response, json) {
  var build = "";
  console.log(json);
  json[0].items.forEach(function(value) {
    build += ddJSON.data[value].name;
  });
  build;
}
