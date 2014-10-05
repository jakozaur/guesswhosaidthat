Meteor.publish('quotes', function () {
  return Quotes.find();
});

Meteor.publish('people', function () {
  return People.find();
});
