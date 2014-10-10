Session.setDefault('questionOrder', null);
Session.setDefault('questionPosition', 0);
Session.setDefault('questionForceNext', null);
Session.setDefault('questionGavedEmail', false);
Session.setDefaultTemp('questionPrefetched', {});


Tracker.autorun(function () {
  if (!Subscription.quotes.ready()) {
    return;
  }

  var order = Session.get('questionOrder');
  var forcedId = Session.get('questionForceNext');
  if (order !== null &&
      forcedId === null) {
    // TODO: add new questions
    return;
  }

  if (order === null) {
    // random order
    var order = _.chain(Quotes.find().fetch())
      .map(function (q) { return q._id; })
      .filter(function (id) { return id !== forcedId; })
      .shuffle()
      .value();
    var forced = Quotes.findOne(forcedId);
    if (forced) {
      order = [forced._id].concat(order);
    }

    Session.setPersistent('questionPosition', 0);
  } else {
    // we already have order, put force at current position
    var index = _.indexOf(order, forcedId);
    if (index !== -1) {
      var currentPosition = Session.get('questionPosition');
      var tmp = order[currentPosition];
      order[currentPosition] = order[index];
      order[index] = tmp;
    }
  }

  Session.setPersistent('questionOrder', order);
  Session.setPersistent('questionForceNext', null);
});

Tracker.autorun(function () {
  var PREFETCH_NEXT_COUNT = 2;
  var prefetched = Session.get('questionPrefetched');
  var order = Session.get('questionOrder') || [];
  var position = Session.get('questionPosition');
  var next = order.slice(position + 1, position + 1 + PREFETCH_NEXT_COUNT);
  _.each(next, function (quoteId) {
    var quote = Quotes.findOne(quoteId) || {};
    return _.map(quote.authors, function (authorId) {
      var author = People.findOne(authorId.id) || {};
      if (author && !prefetched[author._id]) {
        prefetched[author._id] = true;
        var hint = document.createElement('link');
        hint.setAttribute('rel', 'prefetch');
        hint.setAttribute('href', author.photoUrl);
        document.getElementsByTagName('head')[0].appendChild(hint);

        var loadLater = function (url) {
          setTimeout(function () {
            var img = new Image();
            img.src = url;
          }, 1000);
        };
        loadLater(author.photoUrl);
      }
    });
  });

  Session.setTemp('questionPrefetched', prefetched);
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
  var quote = Quotes.findOne(currentQuoteId()) || {};
  return quote.quote || "";
};

Template.question.authors = function () {
  var quote = Quotes.findOne(currentQuoteId());
  if (quote) {
    return _.chain(quote.authors)
      .shuffle()
      .map(function (el) {
        return People.findOne(el.id);
      })
      .value();
  } else {
    return [];
  }
};

Template.questionAuthor.events({
  'click .author': function (e, tmpl) {
    var quote = Quotes.findOne(currentQuoteId());

    if (this._id !== quote.authors[0].id) {
      tmpl.$('.author').addClass('wrong-choice');
      e.preventDefault();
    }
  }
});

AutoForm.hooks({
  insertMvpEmail: {
    after: {
      insert: function () {} // No-op to avoid auto-form bug
    },
    onSuccess: function () {
      Session.set('questionGavedEmail', true);
    }
  }
});
