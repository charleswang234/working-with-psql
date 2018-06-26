const settings = require("./settings");
const args = process.argv.slice(2);

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


function dateObject(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  return `${year}-${month}-${day}`;
}


function printLookup(famousPeopleRows) {
  console.log(`Searching ...`);
  console.log(`Found ${famousPeopleRows.length} person(s) by the name '${args[0]}':`);
  for (let i = 0; i < famousPeopleRows.length; ++i) {
    console.log(`- ${i + 1}: ${famousPeopleRows[i].first_name}, born ${dateObject(famousPeopleRows[i].birthdate)}`)
  }
}


knex.select('*').from('famous_people')
.where('first_name', '=', args[0])
.orWhere('last_name', '=', args[0])
.asCallback(function(err, rows) {
  if (err) return console.error(err);
  // knex.select('id').from('nicknames')
  //   .whereIn('nickname', _.pluck(rows, 'name'))
  //   .asCallback(function(err, rows) {
  //     if (err) return console.error(err);
  //     console.log(rows);
  //   });
  printLookup(rows);
});

// knex.insert()