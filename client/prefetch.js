Template.prefetch.resources = function () {
  var PREFETCH_NEXT_COUNT = 2;
  var order = Session.get('questionOrder') || [];
  var position = Session.get('questionPosition');
  var next = order.slice(position + 1, position + 1 + PREFETCH_NEXT_COUNT);
  return _.chain(next).map(function (quoteId) {
      var quote = Quotes.findOne(quoteId) || {};
      return _.map(quote.authors, function (authorId) {
        var author = People.findOne(authorId.id) || {};
        // default in case it's not loaded yet
        return {url: author.photoUrl};
      });
    })
    .flatten()
    .value();
}
