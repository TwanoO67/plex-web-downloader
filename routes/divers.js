var express = require('express');
var router = express.Router();

function secondsToString(seconds) {
  seconds = Math.round(seconds);

  var years = Math.floor(seconds / 31536000);
  var max =2;
  var current = 0;
  var str = "";
  if (years && current<max) {
      str+= years + 'y ';
      current++;
  }
  var days = Math.floor((seconds %= 31536000) / 86400);
  if (days && current<max) {
      str+= days + 'd ';
      current++;
  }
  var hours = Math.floor((seconds %= 86400) / 3600);
  if (hours && current<max) {
      str+= hours + 'h ';
      current++;
  }
  var minutes = Math.floor((seconds %= 3600) / 60);
  if (minutes && current<max) {
      str+= minutes + 'm ';
      current++;
  }
  var seconds = seconds % 60;
  if (seconds && current<max) {
      str+= seconds + 's ';
      current++;
  }

  return str;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  var config = res.locals.config;//require('../config');
  var db = config.init_db();

  /*var data = [];
  //on fais toute les opération de base a la suite
  db.serialize(function() {

    //db.run("CREATE TABLE if not exists user_info (info TEXT)");
    //var stmt = db.prepare("INSERT INTO user_info VALUES (?)");
    //for (var i = 0; i < 10; i++) {
    //    stmt.run("Ipsum " + i);
    //}
    //stmt.finalize();

    db.each("SELECT id, name, section_type as type"
    + " FROM library_sections ORDER BY name ASC", function(err, row) {
      data.push(row);
    },
    //aprés toute les opération de la base
    function() {*/
        res.render('divers', { title: 'Divers',/*channels: data,*/ presentation: config.presentation, uptime: secondsToString(process.uptime()) });
    /*});

  });

  db.close();*/
});

module.exports = router;
