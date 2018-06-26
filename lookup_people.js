const pg = require("pg");
const settings = require("./settings"); // settings.json
const selectName = process.argv[2];


const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
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
  console.log(`Found ${famousPeopleRows.length} person(s) by the name '${selectName}':`);
  for (let i = 0; i < famousPeopleRows.length; ++i) {
    console.log(`- ${i + 1}: ${famousPeopleRows[i].first_name}, born ${dateObject(famousPeopleRows[i].birthdate)}`)
  }
}

function searchQuery(name) {
  client.query(`SELECT * FROM famous_people
   WHERE first_name = '${name}' OR last_name = '${name}'`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    printLookup(result.rows);
    client.end();
  });
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  searchQuery(selectName);
});