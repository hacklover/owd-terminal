<template>
  <Window :title="data.title" :window="data">
    <div :id="storeName" class="terminal" />
  </Window>
</template>

<script>
  // jQuery Terminal integration

  import 'jquery.terminal/css/jquery.terminal.min.css'
  import Window from "@owd-client/core/src/components/window/Window";

  export default {
    name: "WindowConsole",
    components: {Window},
    data() {
      return {
        storeName: `${this.data.module.name}-${this.data.uniqueID}`
      }
    },
    props: {
      data: Object
    },
    watch: {
      // when window closes
      'data.storage.closed': function (val) {
        if (val === true) {
          this.instance.exec('reset')
        }
      }
    },
    computed: {
      instance() {
        return this.storeName ? this.$store.getters[this.storeName+'/instance'] : undefined
      },
    },
    mounted() {
      this.$store.dispatch(`${this.storeName}/terminalCreate`, this.storeName);
    }
  }
</script>

<style lang="scss">
  #app.is-windows {
    font-size: 14px;

    #window-console {
      .terminal {
        .cmd,
        .cmd div,
        .cmd span:not(.token):not(.emoji),
        .terminal,
        .terminal-output>:not(.raw) a,
        .terminal-output>:not(.raw) div,
        .terminal-output>:not(.raw) span:not(.token):not(.inverted):not(.error):not(.emoji) {
          font-size: 14px;
        }
      }
    }
  }

  #window-console {
    .v-progress-linear {
      top: initial;
    }

    .terminal {
      height: 100%;
      padding: 0;
      background: none;
      user-select: text;

      // spartan fix more width in console from mobile
      @media (max-width: 560px) {
        margin-right: -22%;
      }
      @media (max-width: 450px) {
        margin-right: -24.5%;
      }
      @media (max-width: 411px) {
        margin-right: -24%;
      }
      @media (max-width: 375px) {
        margin-right: -25%;
      }
      @media (max-width: 360px) {
        margin-right: -30%;
      }

      .cmd {
        margin: 0 0 2px 0;

        .cursor span span {
          width: 6px;
          height: 13px;
          margin: -1px 0 0 1px;
        }
      }

      &::-webkit-scrollbar {
        width: 8px;
        background: rgba(34, 34, 34, 0.3);
      }

      &::-webkit-scrollbar-thumb {
        width: auto;
        height: auto;
        padding: 4px;
        margin: 4px;
        background: rgba(51, 51, 51, 0.3);
      }

      .cmd,
      .cmd div,
      .cmd span:not(.token):not(.emoji),
      .terminal,
      .terminal-output > :not(.raw) a,
      .terminal-output > :not(.raw) div,
      .terminal-output > :not(.raw) span:not(.token):not(.inverted):not(.error):not(.emoji) {
        font-family: monospace, FreeMono;
        background: none;

        @media (max-width: 560px) {
          font-size: 10.5px;
          letter-spacing: -0.2px;
        }

        @media (max-width: 361px) {
          letter-spacing: -0.5px;
        }
      }

      .terminal-output {
        > :not(.raw) a[href] {
          color: #63696f;
        }

        > :not(.raw) a[href]:hover {
          background-color: #63696f;
        }
      }

      span[data-text="LIVE"] {
        position: relative;
        padding-left: 13px;

        &:before {
          position: absolute;
          top: 2px;
          left: 0;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #f5333d !important;
          content: '';
        }
      }

      .cursor.blink {
        background: none;
      }
    }
  }
</style>
