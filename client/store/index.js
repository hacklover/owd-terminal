export default {
  state: {
    greeting: '',
    options: {}
  },

  getters: {
    greeting(state,rootState,rootGetters) {
      let greeting = state.greeting

      const client = rootGetters['core/client']

      // replace greeting app variables
      greeting = greeting.replace('{app-name}', client.title)
      greeting = greeting.replace('{app-version}', client.version)
      greeting = greeting.replace('{app-year}', new Date().getFullYear().toString())
      greeting = greeting.replace('{app-website}', client.website)

      // replace default command variable
      greeting = greeting.replace('{default-command}', 'help')

      return greeting
    }
  }
}