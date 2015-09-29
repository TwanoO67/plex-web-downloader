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
  var config = res.locals.config;
  var db = config.init_db();
  var data = [];

  //on fais toute les opération de base a la suite
  db.serialize(function() {

    db.each("SELECT episode.id as id, episode.title as titre, episode.[index] as episode, episode.duration as second, season.[index] as saison, show.title as serie "+
    "FROM metadata_items episode,metadata_items season,metadata_items show "+
    "WHERE episode.parent_id=season.id AND season.parent_id = show.id AND show.id = ? ",req.params.id, function(err, row) {

        /*//découpage des hints
        var params = {};
        var tab = row.hints.split('&');
        tab.forEach(function(val,index,table){
          var tab2 = val.split('=');
          params[tab2[0]] = decodeURIComponent(tab2[1]);
        });
        row.info_meta = params;
        */

        if(typeof row.episode !== '' &&  row.saison !== '' ){
          row.season_episode = "S"+addZero(row.saison)+"E"+addZero(row.episode );
        }

        row.duree = formatDuree(row.second);

        data.push(row);
    },
    function() {
      //a la fin du foreach
    });

    db.close(function(){
        //aprés toute les opération de la base
        var titre = "Série inexistante";
        if(data.length > 0){
          titre = 'Episode de '+data[0].serie;
        }
        res.render('show',{
          title: titre,
          videos: data
        });
    });


  });


});

module.exports = router;
