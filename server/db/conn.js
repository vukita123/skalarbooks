const { MongoClient } = require("mongodb");

// let Db = process.env.ATLAS_URI;
const Db = "mongodb+srv://luka:mernstack@cluster0.4qd2b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


console.log(Db);
var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("myFirstDatabase");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },

  getDb: function () {
    return _db;
  },
};