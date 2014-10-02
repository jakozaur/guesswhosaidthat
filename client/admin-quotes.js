Template.adminQuotes.quotesCounter = function () {
  return Quotes.find().count();
};

Template.adminQuotes.quotes = function () {
  return Quotes.find().fetch();
};

Template.adminQuoteAuthor.photoUrl = function () {
  return People.findOne(this.id).photoUrl;
}

Template.adminQuoteAuthor.name = function () {
  return People.findOne(this.id).name;
}

Template.adminQuote.events({
  'click .remove': function () {
    Quotes.remove(this._id);
    FlashMessages.sendInfo("Quote successfully removed!");
  },
  'click .edit': function () {
    Session.set('adminEditQuote', this._id);
  }
});

Template.adminQuotes.editQuote = function () {
  return Quotes.findOne(Session.get('adminEditQuote'));
};

AutoForm.hooks({
  updateQuote: {
    onSuccess: function() {
      Session.set('adminEditQuote', null);
      FlashMessages.sendSuccess("Quote successfully edited!");
    }
  }, 
  insertQuote: {
    onSuccess: function() {
      FlashMessages.sendSuccess("Quote successfully added!");
    }
  }
});