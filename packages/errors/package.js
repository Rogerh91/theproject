Package.describe({
  name: 'rogerh91:errors',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: 'Test from discover Meteor.',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: ''
});

Package.onUse(function (api, where) {
  api.versionsFrom('0.9.0');
  
  api.use(['minimongo', 'mongo-livedata', 'templating'], 'client');

  api.addFiles(['errors.js', 'errors_list.html', 'errors_list.js'], 'client');
  
  if (api.export) 
    api.export('Errors');
});

Package.onTest(function(api) {
  api.use('rogerh91:errors', 'client');
  api.use(['tinytest', 'test-helpers'], 'client');
  api.addFiles('errors-tests.js', 'client');
});
