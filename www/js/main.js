angular
  .module('atmebro', [])
  .controller('PostCtrl', function ($http) {
    var post = this;

    $http
      .get('/')
      .success(function (res) {
        post.data = res.posts;
      });

  });
