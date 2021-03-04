export default function ({terminal}) {
  return {
    state: {
      instance: null
    },

    mutations: {
      SET_INSTANCE(state, instance) {
        state.instance = instance
      },
      SET_INSTANCE_FIT(state, localEcho) {
        state.instanceFit = localEcho
      },
      SET_INSTANCE_LOCAL_ECHO(state, localEcho) {
        state.instanceLocalEcho = localEcho
      }
    },

    actions: {
      /**
       * Color helper
       * todo move to owd-terminal module
       *
       * @param text
       * @param color
       * @param textFormat
       * @returns {string}
       */
      textColor(text, color, textFormat) {
        if (!this.validTextFormat.includes(textFormat)) {
          textFormat = ''
        } else {
          textFormat = '!' + textFormat
        }

        if (!this.validColors.includes(color)) {
          color = ''
        }

        return '[[' + textFormat + ';' + color + ';]' + text + ']'
      },

      async create({commit, rootGetters}, consoleId) {
        // initialize jQuery Terminal
        const terminalElement = window.jQuery(`#${consoleId}`);

        // create jQuery Terminal
        const terminalInstance = terminalElement.terminal(
          terminal.commands,
          {
            greetings: rootGetters['terminal-jcubic/greeting'].replace(/\n/g, '\n\r'),
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

        commit('SET_INSTANCE', terminalInstance)
      },
      destroy({state}) {
        state.instance.destroy()
      },
      exec({state}, command) {
        state.instance.exec(command)
      },
      reset({state}) {
        state.instance.reset()
      },
      setInput({state}, command) {
        state.instance.set_command(command)
      }
    }
  }
}