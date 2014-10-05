Template.answer.correctAuthorName = function () {
  var id = currentQuoteId();
  if (id) {
    var authorId = Quotes.findOne(id).authors[0].id;
    return People.findOne(authorId).name;
  } else {
    return "";
  }
};

Template.answer.events({
  'click .btn': function () {
    var position = Session.get('questionPosition');
    var order = Session.get('questionOrder');
    if (position + 1 < order.length) {
      Session.set('questionPosition', position + 1);
    } else {
      Session.set('questionOrder', null);
    }
  }
});
