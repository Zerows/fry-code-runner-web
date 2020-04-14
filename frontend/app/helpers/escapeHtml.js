import {htmlSafe} from '@ember/template';
import {helper} from '@ember/component/helper'

function escapeHtml(string) {
  return htmlSafe(string)
}

export default helper(escapeHtml);
