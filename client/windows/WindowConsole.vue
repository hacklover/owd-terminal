<template>
  <Window
    :window="window"
    @open="onOpen"
    @restore="onRestore"
  >
    <div :id="window.uniqueName" class="terminal" />
  </Window>
</template>

<script>
  import Window from "@owd-client/core/src/components/window/Window";

  export default {
    components: {Window},
    props: {
      window: Object
    },
    methods: {
      onOpen() {
        setTimeout(() => {
          this.$store.dispatch(`${this.window.uniqueName}/create`, this.window.uniqueName)
        }, 500)
      },
      onRestore() {
        this.$store.dispatch(`${this.window.uniqueName}/create`, this.window.uniqueName)
      }
    },
    mounted() {
      this.$store.dispatch(`${this.window.uniqueName}/create`, this.window.uniqueName)
    }
  }
</script>

<style lang="scss">
  .owd-window-console {
    .v-progress-linear {
      top: initial;
    }

    .terminal {
      height: 100%;
      padding: 12px;
      background: none;
      user-select: text;
      background: black;

      // spartan fixes, more width in console from mobile
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
        font-size: 12px;
        font-family: $fontMono;
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

      .cursor.blink {
        background: none;
      }
    }
  }
</style>
