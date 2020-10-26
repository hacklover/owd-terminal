import 'xterm/css/xterm.css'

import { Terminal } from 'xterm';
import LocalEchoController from 'local-echo';

export default function ({terminal}) {
  return {
    state: {
      instance: null,
      localEcho: null
    },

    getters: {
      instance(state) {
        return state.instance
      },
      localEcho(state) {
        return state.localEcho
      }
    },

    mutations: {
      SET_INSTANCE(state, instance) {
        state.instance = instance
      },
      SET_LOCAL_ECHO(state, localEcho) {
        state.localEcho = localEcho
      }
    },

    actions: {
      async create({commit,dispatch}, consoleId) {
        const term = new Terminal();

        term.open(document.getElementById(consoleId));

        term.write(terminal.greetings.replace(/\n/g, '\n\r'))

        // Cannot read property 'on' of undefined
        // https://github.com/wavesoft/local-echo
        // todo dunno how to fix it

        const localEcho = new LocalEchoController();
        term.loadAddon(localEcho);

        // set instance
        commit('SET_INSTANCE', term)
        commit('SET_LOCAL_ECHO', localEcho)

        await dispatch('read')
      },
      destroy({getters}) {
        getters['instance'].destroy()
      },
      async read({getters,dispatch}) {
        await getters['localEcho'].read('> ')
          .then(async input => {
            const inputs = input.split(' ')

            if (input.length > 0) {
              if (terminal.existCommand(inputs[0])) {
                const commandName = inputs[0]
                inputs.shift()
                terminal.execCommand(commandName, inputs)
              }
            }

            await dispatch('read')
          })
          .catch(error => alert(`Error reading: ${error}`));
      },
      exec({getters}, command) {
        getters['instance'].exec(command)
      },
      reset({getters}) {
        getters['instance'].reset()
      },
      setInput({getters}, command) {
        getters['instance'].set_command(command)
      }
    }
  }
}