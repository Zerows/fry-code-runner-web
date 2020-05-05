import {helper} from '@ember/component/helper';

export default helper(function divideBy(params) {
  return parseInt(params[0] || 0) / params[1];
});
