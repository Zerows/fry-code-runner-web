import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('pads', { path: '/pads' });
  this.route('questions', { path: '/questions' });
  this.route('pads-show', { path: '/pads/:pad_id' });
  this.route('questions-show', { path: '/questions/:question_id' });
  this.route('login');
});

export default Router;
