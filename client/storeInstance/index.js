import 'jquery.terminal/css/jquery.terminal.min.css'
import '../assets/jquery.terminal.scss'
import 'jquery.terminal'

window.jQuery = require('jquery')

export default function ({terminal}) {
  return {
    state: {
      instance: null
    },

    getters: {
      instance(state) {
        return state.instance
      }
    },

    mutations: {
      SET_INSTANCE(state, instance) {
        state.instance = instance
      }
    },

    actions: {
      create({commit}, consoleId) {
        // initialize jQuery Terminal
        const terminalElement = window.jQuery(`#${consoleId}`);

        // create jQuery Terminal
        const terminalInstance = terminalElement.terminal(
          terminal.commands,
          {
            greetings: terminal.greetings,
            prompt: '> ',
            checkArity: false,
            onCommandNotFound: () => false,
            keydown: () => {
              // eslint-disable-next-line no-prototype-builtins
              if (terminal.events && terminal.events.hasOwnProperty('keydown')) {
                // run each keydown event
                if (terminal.events['keydown'].length > 0) {
                  terminal.events['keydown'].forEach(event => event(terminalInstance))
                }
              }
            }
          }
        );

        // unfocus it
        terminalInstance.focus(false)

        // set instance
        commit('SET_INSTANCE', terminalInstance)
      },
      destroy({getters}) {
        getters['instance'].destroy()
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