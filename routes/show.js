var express = require('express');
var router = express.Router();

function formatDuree(time) {
  if(typeof time !== 'undefined' && time != "" && time > 0){
    var d = new Date(time); // js fonctionne en milisecondes
    return addZero(d.getHours()-1) + "h "+ addZero(d.getMinutes()) + "m "+ addZero(d.getSeconds()) + "s ";
  }
  else {
    return "";
  }
}

function addZero(v) {
  return v.toString().replace(/^(\d)$/,'0$1');
};

/* GET home page. */
router.get('/:id', function(req, res, next) {
  var config = require('../config');
  var db = config.init_db();
  var data = [];
  var show = null;

  //on fais toute les opération de base a la suite
  db.serialize(function() {

    db.get("SELECT id, title, year"
    + " FROM metadata_items "
    + " WHERE id = ? "
    ,req.params.id, function(err, row) {
      shows = row;
    });

    db.each("SELECT episode.id as id, episode.title as titre, episode.[index] as episode, season.[index] as saison "+
    "FROM metadata_items episode,metadata_items season,metadata_items show "+
    "WHERE episode.parent_id=season.id AND season.parent_id = show.id AND show.id = ? ",req.params.id, function(err, row) {
        console.log(err);
        console.log(row);
        /*//découpage des hints
        var params = {};
        var tab = row.hints.split('&');
        tab.forEach(function(val,index,table){
          var tab2 = val.split('=');
          params[tab2[0]] = decodeURIComponent(tab2[1]);
        });
        row.info_meta = params;

        if(typeof row.info_meta !== 'undefined' && typeof row.info_meta.season !== 'undefined' && typeof row.info_meta.episode !== 'undefined'){
          row.season_episode = "S"+addZero(row.info_meta.season)+"E"+addZero(row.info_meta.episode);
        }

        row.duree = formatDuree(row.second);*/

        data.push(row);
    },
    //aprés toute les opération de la base
    function() {
      var titre = "Série inexistante";
      if(show != null){
        title = 'Episode de '+show.title;
      }
        res.render('show',{
          title: titre,
          show: show,
          videos: data
        });
    });


  });

  db.close();
});

module.exports = router;
