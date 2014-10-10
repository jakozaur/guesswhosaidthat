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

var generateTweet = function () {
  var id = currentQuoteId();
  if (id) {
    var quote = Quotes.findOne(id).quote;
    var prefix = "Who said: ";
    var url = "http://guesswhosaidthat.com/question/" + id;
    var maxLength = 140 /* tweet */- 25 /* t.co length */ - prefix.length;
    // t.co length:
    // https://dev.twitter.com/rest/reference/get/help/configuration
    // plus one space
    if (quote.length > maxLength) {
      quote = quote.substring(0, maxLength - 3) + "...";
    }
    var tweet = prefix + quote;
    return [encodeURIComponent(tweet), encodeURIComponent(url)];
  } else {
    return ["", ""];
  }
};

Template.answer.tweet = function () {
  var res = generateTweet();
  return res[0] + " " + res[1];
  var id = currentQuoteId();
}

Template.answer.events({
  'click .next': function () {
    var position = Session.get('questionPosition');
    var order = Session.get('questionOrder');
    if (position + 1 < order.length) {
      Session.setPersistent('questionPosition', position + 1);
    } else {
      Session.setPersistent('questionOrder', null);
    }
  },
  'click .tweet': function (e) {
    // NOTE(jacek): Hacky way to detect if you have twitter app,
    // works well on phone.
    var now = new Date().valueOf();
    setTimeout(function () {
      if (new Date().valueOf() - now > 200) return;
      var tweet = generateTweet();;
      window.location.href = "http://www.twitter.com/share?text=" + tweet[0] + "&url=" + tweet[1];
    }, 50);

    // No touchscreen? No twitter app.
    if (!('ontouchstart' in window)) {
      e.preventDefault();
    }
  }
});
