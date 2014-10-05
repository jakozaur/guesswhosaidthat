Session.setDefault('questionOrder', null);
Session.setDefault('questionPosition', 0);

Tracker.autorun(function () {
  if (!Subscription.quotes.ready()) {
    return;
  }

  if (Session.get('questionOrder') !== null) {
    // TODO: add new questions
    return;
  }

  var order = _.chain(Quotes.find().fetch())
    .map(function (q) { return q._id; })
    .shuffle()
    .value();

  Session.set('questionOrder', order);
  Session.set('questionPosition', 0);
});

currentQuoteId = function () {
  var order = Session.get('questionOrder');
  var position = Session.get('questionPosition');
  if (order && position < order.length) {
    return order[position];
  } else {
    return null;
  }
};

Template.question.quote = function () {
  var id = currentQuoteId();
  if (id) {
    return Quotes.findOne(id).quote;
  } else {
    return "No more quotes";
  }
};

Template.question.authors = function () {
  // TODO: random order
  var id = currentQuoteId();
  if (id) {
    return _.map(Quotes.findOne(id).authors, function (el) {
      return People.findOne(el.id);
    });
  } else {
    return [];
  }
};
