var unirest = require('unirest');
var fs = require('fs');

module.exports = function(opt) {

  switch (opt.action) {

    case 'duplicate-stories':
      var login = unirest('POST', 'https://api.storyblok.com/v1/users/login');
      login.type('json');
      login.send(opt.options.auth);
      login.end(function (res) {
        var req = unirest('GET', 'https://api.storyblok.com/v1/spaces/' + opt.options.spaceId +'/duplicate_stories?original_space=' + opt.options.spaceToDuplicateId);
        
        req.headers({
          'Authorization': res.body.access_token
        });
        req.type('json');
        req.end(function (result) {
          console.log(result.body);
        });
      });
      break; 

    case 'duplicate-components':
      var login = unirest('POST', 'https://api.storyblok.com/v1/users/login');
      var accessToken = "";
      login.type('json');
      login.send(opt.options.auth);
      login.end(function (res) {
        var getReq = unirest('GET', 'https://api.storyblok.com/v1/spaces/'+ opt.options.spaceToDuplicateId +'/components');
        
        accessToken = res.body.access_token;

        getReq.headers({
          'Authorization': res.body.access_token
        });

        getReq.type('json');
        getReq.end(function (getRes) {
          var s = JSON.parse(getRes.raw_body);
          for (var index = 0, max = s.components.length; index < max; index++) {
            var component = s.components[index];
            var postReq = unirest('POST', 'https://api.storyblok.com/v1/spaces/' + opt.options.spaceId + '/components');
          
            delete component.id;
            delete component.created_at;

            postReq.headers({
              'Authorization': accessToken
            });

            postReq.type('json');
            postReq.send({ component: component });
            postReq.end(function (postRes) { console.log(postRes.raw_body); });
          }
        });
      });
      break; 

    case 'duplicate-datasources':
      var login = unirest('POST', 'https://api.storyblok.com/v1/users/login');
      var accessToken = "";
      login.type('json');
      login.send(opt.options.auth);
      login.end(function (res) {
        var getReq = unirest('GET', 'https://api.storyblok.com/v1/spaces/'+ opt.options.spaceToDuplicateId +'/datasources');
        
        accessToken = res.body.access_token;

        getReq.headers({
          'Authorization': res.body.access_token
        });

        getReq.type('json');
        getReq.end(function (getRes) {
          var s = JSON.parse(getRes.raw_body);
          for (var index = 0, max = s.datasources.length; index < max; index++) {
            var datasource = s.datasources[index];
            var postReq = unirest('POST', 'https://api.storyblok.com/v1/spaces/' + opt.options.spaceId + '/datasources');

            postReq.headers({
              'Authorization': accessToken
            });
            var datasourceDetailReq = unirest('GET', 'https://api.storyblok.com/v1/cdn/datasource_entries/?token='+ opt.options.publicToken +'&per_page=1000&datasource=' + datasource.slug);
            getReq.type('json');
            getReq.end(function (datasourceDetailRes) {
              console.log(datasourceDetailRes.raw_body);
            });
          }
        });
      });
      break; 
    
      
    case 'publish':
      var login = unirest('POST', 'https://api.storyblok.com/v1/users/login');
      login.type('json');
      login.send(opt.options.auth);
      login.end(function(res) {
        var req = unirest('GET', 'https://api.storyblok.com/v1/spaces/'+ opt.options.spaceId +'/stories?per_page=1000');
        
        req.headers({
          'Authorization': res.body.access_token
        });

        req.type('json');
        req.end(function (result) {
          var jsonified = JSON.parse(result.raw_body);
          jsonified.stories.forEach(function (item) {
            var publishReq = unirest('GET', 'https://api.storyblok.com/v1/spaces/' + opt.options.spaceId + '/stories/' + item.id + '/publish');
            publishReq.headers({
              'Authorization': res.body.access_token
            });

            publishReq.type('json');
            publishReq.end(function () {
              console.log(item.name + ": published")
            });
          });
        });
        
      });
      break;
  }

}