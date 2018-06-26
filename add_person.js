const settings = require("./settings");
const addFamous = process.argv.slice(2);

var knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
  // searchPath: ['knex', 'public'],
});


knex('famous_people').insert({first_name: addFamous[0], last_name: addFamous[1], birthdate: addFamous[2]})
.asCallback(function() {
  return knex.destroy();
});

// knex.select('*').from('famous_people')
// .asCallback(function(err, rows) {
//   if (err) return console.error(err);
//   // knex.select('id').from('nicknames')
//   //   .whereIn('nickname', _.pluck(rows, 'name'))
//   //   .asCallback(function(err, rows) {
//   //     if (err) return console.error(err);
//   //     console.log(rows);
//   //   });
//   console.log(rows);
// });