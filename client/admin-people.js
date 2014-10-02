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
    onSuccess: function() {
      Session.set('adminEditPerson', null);
    }
  }
});

Session.setDefault('adminEditPerson', null);

Template.adminPerson.events({
  'click .remove': function () {
    People.remove(this._id);
  },
  'click .edit': function () {
    Session.set('adminEditPerson', this._id);
  }
});