//This is the page where we use Iron Router to bring people to different views in our single page application. 

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.route('/', {name: 'postsList'});

Router.route('/posts/:_id', {
   name: 'postPage',
   data: function() {return Posts.findOne(this.params._id); }
});

Router.route('/submit', {name: 'postSubmit'});

var requireLogin = function() {
  if (! Meteor.user() ) {
    if (Meteor.loggingIn() ) {
      this.render('this.loadingTemplate');
    } else {
    this.render('accessDenied');
  }
  //this only fires if person is not logged in and isn't trying to log in
  } else {
    this.next();
  }
}


//

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'}); 