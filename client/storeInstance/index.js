import xtermStoreInstance from './integrations/xterm.storeInstance';
import jQueryTerminalStoreInstance from './integrations/jQueryTerminal.storeInstance';

export default ({ store, terminal }) => {
  switch (store.getters['terminal/instanceMode']) {
    case 'xterm':
      return xtermStoreInstance({terminal})
    case 'jquery.terminal':
    default:
      return jQueryTerminalStoreInstance({terminal})
  }
}


