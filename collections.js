People = new Mongo.Collection("people");

People.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    max: 100
  },
  photoUrl: {
    type: String,
    label: "Photo url (only square)",
    max: 300
  }
}));

