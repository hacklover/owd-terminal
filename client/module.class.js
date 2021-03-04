import {ModuleApp} from '@owd-client/core'

import terminalStore from './store'
import terminalStoreInstance from './storeInstance/index';

export default class TerminalModule extends ModuleApp {
  constructor(context) {
    super(context)
  }

  loadAssets() {
    require('jquery.terminal/css/jquery.terminal.min.css')
    require('jquery.terminal')

    window.jQuery = require('jquery')
  }

  loadStore() {
    return terminalStore
  }

  loadStoreInstance(context) {
    return terminalStoreInstance(context)
  }

  loadCommands({store}) {
    return {
      'test-jcubic': function () {
        this.echo('\nHello there!\n')
      },
      'console': function () {
        store.dispatch('core/window/windowCreate', 'WindowConsole');
      }
    }
  }
}