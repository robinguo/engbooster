var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/engbooster';
var ObjectID = require('mongodb').ObjectID; 

MongoClient.connect(url, {users: "eb", pass: "bobobo"}, function(err, db) {
  console.log("Connected successfully to server");
  var collection = db.collection("templates");
  collection.find({}).toArray(function(err, templates) {
    // console.log(templates);
    var modified = false;
    for (var template of templates) {
      console.log(template);
      if (typeof(template.variables) == "string") {
        template.variables = JSON.parse(template.variables);
        modified = true;
      }
      if (typeof(template.reference) == "string") {
        template.reference = JSON.parse(template.reference);
        modified = true;
      }
      if (typeof(template.tags) == "string") {
        template.tags = JSON.parse(template.tags);
        modified = true;
      }
      if (typeof(template.createdAt == "string")) {
        template.createdAt = new Date(template.createdAt);
        modified = true;
      }
      if (typeof(template.updatedAt == "string")) {
        template.updatedAt = new Date(template.updatedAt);
        modified = true;
      }

      if (modified) {
        var id = template._id;
        console.log(id);
        delete template._id;
        console.log("new document:\n" + JSON.stringify(template));
        // template = JSON.parse(JSON.stringify(template));
        collection.updateOne({_id: ObjectID(id)}, template, function(err, result) {
          console.log(result);
        });
      }

      modified = false;
    }
    // db.close();
  }); 
});
