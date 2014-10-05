Template.answer.correctAuthorName = function () {
  var id = currentQuoteId();
  if (id) {
    var authorId = Quotes.findOne(id).authors[0].id;
    return People.findOne(authorId).name;
  } else {
    return "";
  }
};

Template.answer.quote = function () {
  var id = currentQuoteId();
  if (id) {
    return Quotes.findOne(id).quote;
  } else {
    return "";
  }
};

Template.answer.correctAuthorUrl = function () {
  var id = currentQuoteId();
  if (id) {
    var authorId = Quotes.findOne(id).authors[0].id;
    return People.findOne(authorId).photoUrl;
  } else {
    return "";
  }
};

Template.answer.events({
  'click .next': function () {
    var position = Session.get('questionPosition');
    var order = Session.get('questionOrder');
    if (position + 1 < order.length) {
      Session.set('questionPosition', position + 1);
    } else {
      Session.set('questionOrder', null);
    }
  },
  'click .tweet': function () {
    // NOTE(jacek): Hacky way to detect if you have twitter app,
    // works well on phone.
    var now = new Date().valueOf();
    setTimeout(function () {
      if (new Date().valueOf() - now > 200) return;
      window.location.href = "http://www.twitter.com/share?url=http://www.guesswhosaidthat.com/";
    }, 50);
  }
});
