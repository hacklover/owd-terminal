# Terminal module for OWD Client
> A terminal for your Open Web Desktop client

<p>
    <a href="https://github.com/owdproject/owd-client/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg" /></a>
    <a href="https://github.com/owdproject/owd-client"><img src="https://img.shields.io/badge/owd-client-3A9CB6" /></a>
    <a href="https://github.com/topics/owd-modules"><img src="https://img.shields.io/badge/owd-modules-888" /></a>
    <a href="https://hacklover.net/patreon"><img src="https://img.shields.io/badge/become-a%20patron-orange" alt="Become a Patron" /></a>
    <a href="https://hacklover.net/discord"><img src="https://img.shields.io/badge/chat-on%20discord-7289da.svg" alt="Join us on Discord" /></a>
</p>

## Demo
[Try it out](https://hacklover.net/client), just click on the console icon on the left menu

## Overview
It's based on [jQuery Terminal](https://github.com/jcubic/jquery.terminal) because I use this library from the beginning of hacklover.net;
Open Web Desktop is designed to support multiple terminals, other libraries like xterm and vue-terminal may be implemented later.

## Quick install
- Copy the content of the `client` module folder into `owd-client/src/modules/terminal`
- Copy the content of the `client/config` config folder into `owd-client/config`
- Install each module dependency manually with `npm install <dependency>`
- Add the reference of this module into `owd-client/config/modules.json`

## Add commands
OWD Client globally supports terminal commands. You can define them from any OWD module by adding the method `loadCommands()` to the `module.class.js` file like this:

```js
loadCommands({store}) {
  return {
    'test': function (...args) {  
      this.echo('it works bruh')
    }
  }
}
```

## Dependencies
- jquery.terminal

## Compatibility
- Open Web Desktop client v2.0.0-alpha.2

## License
This project is released under the [MIT License](LICENSE)