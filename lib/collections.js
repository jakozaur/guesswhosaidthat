People = new Mongo.Collection("people");
Quotes = new Mongo.Collection("quotes");

Schema = {};

Schema.People = new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    max: 100
  },
  photoUrl: {
    type: String,
    label: "Photo url (only square)",
    max: 300
  }
});

People.attachSchema(Schema.People);

Schema.Quotes = new SimpleSchema({
  quote: {
    type: String,
    label: "Quote",
    autoform: {
      rows: 5
    }
  },
  authors: {
    type: [Object],
    label: "Choose authors (first: correct, next 3: candidates)",
    minCount: 4,
    maxCount: 4
  },
  'authors.$.id': {
    type: Schema.People._id,
    label: "Select person",
    autoform: {
      options: function () {
        var options = [];
        People.find().forEach(function (el) {
          options.push({
            value: el._id,
            label: el.name
          });
        });
        return options;
      }
    }
  }
});

Quotes.attachSchema(Schema.Quotes);

