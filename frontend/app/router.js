import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', { path: '/' });
  this.route('login');
  this.route('pads', function(){
    this.route('index', { path: '/' });
    this.route('show', { path: '/:pad_id' });
  });
  this.route('questions', function(){
    this.route('index', { path: '/' });
    this.route('show', { path: '/:question_id' });
  });

  this.route('guest', function() {
    this.route('signup');
  });
});

export default Router;
