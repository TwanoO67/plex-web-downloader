var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {
  var config = require('../config');
  var db = config.init_db();

  var shows = [];

  //on fais toute les opération de base a la suite
  db.serialize(function() {

    db.each("SELECT id, title, year"
    + " FROM metadata_items "
    + " WHERE parent_id IS NULL AND library_section_id = ? "
    ,req.params.id, function(err, row) {
      shows.push(row);
    },
    //aprés toute les opération de la base
    function(){
        console.log(shows);
        res.render('show_list', { title: 'Liste des séries',shows: shows });
    });

  });

  db.close();
});

module.exports = router;
