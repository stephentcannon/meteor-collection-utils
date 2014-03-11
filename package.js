Package.describe({
  summary: "A collection of utilities added to the Meteor.Collection.prototype"
});

Package.on_use(function (api, where) {
  api.add_files('Meteor.Collection.prototype.Utils.js', ['client', 'server']);
});