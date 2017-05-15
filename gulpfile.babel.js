const gulp = require('gulp');
const storyblokSync = require('./tools');
const config = require('./config');
const userdata = require('./userdata');
const loginCred = {email: userdata.email, password: userdata.password};


gulp.task('storyblok:duplicate:stories', function() {
  return storyblokSync({
    action: 'duplicate-stories',
    options: {
      auth: loginCred,
      spaceId: config.targetSpace,
      spaceToDuplicateId: config.spaceToDuplicate,
      type: 'stories'
    }
  });
});

gulp.task('storyblok:duplicate:components', function() {
  return storyblokSync({
    action: 'duplicate-components',
    options: {
      auth: loginCred,
      spaceId: config.targetSpace,
      spaceToDuplicateId: config.spaceToDuplicate,
      type: 'components'
    }
  });
});

gulp.task('storyblok:duplicate:datasources', function() {
  return storyblokSync({
    action: 'duplicate-datasources',
    options: {
      auth: loginCred,
      spaceId: config.targetSpace,
      spaceToDuplicateId: config.spaceToDuplicate,
      type: 'datasources'
    }
  });
});

gulp.task('storyblok:publish', function() {
  return storyblokSync({
    action: 'publish',
    options: {
      auth: loginCred,
      spaceId: config.targetSpace,
      type: 'stories'
    }
  });
});