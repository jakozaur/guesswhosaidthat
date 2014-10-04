Template.adminPeople.people = function () {
  return People.find({}, {
    sort: ['name']
  });
};

Template.adminPeople.editPerson = function () {
  return People.findOne(Session.get('adminEditPerson'));
};

Template.adminPeople.peopleCounter = function () {
  return People.find().count();
}

AutoForm.hooks({
  updatePerson: {
    after: {
      update: function () {} // No-op to avoid auto-form bug
    },
    onSuccess: function() {
      Session.set('adminEditPerson', null);
      FlashMessages.sendSuccess("Person successfully edited!");
    }
  },
  insertPerson: {
    after: {
      insert: function () {} // No-op to avoid auto-form bug
    },
    onSuccess: function() {
      FlashMessages.sendSuccess("Person successfully added!");
    }
  }
});

Session.setDefault('adminEditPerson', null);

Template.adminPerson.events({
  'click .remove': function () {
    People.remove(this._id);
    FlashMessages.sendInfo("Person successfully removed!");
  },
  'click .edit': function () {
    Session.set('adminEditPerson', this._id);
  }
});
