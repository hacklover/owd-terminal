import {Module} from '@owd-client/core'

import terminalStore from './store'
import terminalStoreInstance from './storeInstance/index';

export default class TerminalModule extends Module {
  constructor(context) {
    super(context)
  }

  loadStore() {
    return terminalStore
  }

  loadStoreInstance(context) {
    return terminalStoreInstance(context)
  }

  loadCommands({store}) {
    return {
      'help': function () {
        this.echo('\nHello there!\n')
      },
      'console': function () {
        store.dispatch('core/windows/windowCreate', 'WindowConsole');
      }
    }
  }
}