Package.describe({
  summary: "A collection of utilities added to the Meteor.Collection.prototype",
  // Version number.
  version: "0.1.6",
  // Optional.  Default is package directory name.
  name: "steeve:meteor-collection-utils",
  // Optional github URL to your source repository.
  git: "https://github.com/stephentcannon/meteor-collection-utils.git",
});

Package.onUse(function (api) {
  api.addFiles('Mongo.Collection.prototype.Utils.js', ['client', 'server']);
});