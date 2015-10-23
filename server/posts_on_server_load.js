if (Posts.find().count() === 0) {

  Posts.insert({
    title: 'The Meteor Book',
    userId: 1,
    author: "tom",
    url: 'http://themeteorbook.com',
    submitted: "10/23/2015",
    commentsCount: 0
  });

  for (var i = 0; i < 15; i++) {
    Posts.insert({
      title: 'Test post #' + i,
      author: "sacha",
      userId: 2,
      url: 'http://google.com/?q=test-' + i,
      submitted: "10/23/2015",
      commentsCount: 0
    });
  }
}

//these fixtures are broken, need to find a way to debug date(now)
