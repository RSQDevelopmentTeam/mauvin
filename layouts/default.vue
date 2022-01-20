<template>
<div id="app" data-scroll-container :class="[{'touchevents': touchevents, 'no-touchevents': !touchevents }, `${browserClass}`]">
  <!-- <Nav /> -->
  <CursorDot />
  <nuxt />
</div>
</template>

    <script>
    // import touchevents from '~/mixins/touchevents';
    import Nav from '~/components/Nav';
    import CursorDot from '~/components/CursorDot';

    export default {
      components: {
        Nav,
        CursorDot,

      },
      mixins: [],
      data() {
        return {
          browserClass: 'this.$ua.browser()'
        };
      },
      computed: {
        touchevents() {
          return this.$store.state.global.touchevents;
        },
        // navBarReady() {
        //   return this.$store.state.global.navBarReady;
        // },
        // fromServer: function () {
        //   return this.$store.state.global.fromServer;
        // }
      },
      watch: {
        // $route () {
        //   document.body.classList.add('out');
        // },
        // fromServer (newVal) {
        //   if (!newVal) {
        //     this.$nuxt.$emit('startLoco');
        //   }
        // }
      },
      created: function() {},
      mounted: function () {
        // Check for touchevents
        if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
          this.$store.commit('global/setTouchEvents', true);
        }
        this.$nuxt.$emit('stopLoco');
        window.addEventListener('resize', this.onResize);
        document.body.addEventListener('transitionend', this.bodyEnd);
        this.onResize();
        this.onOrientationChange();
        window.addEventListener('orientationchange', this.onOrientationChange);
      },
      destroyed: function () {
        window.removeEventListener('resize', this.onResize);
        window.removeEventListener('orientationchange', this.onOrientationChange);
      },
      methods: {
        onResize () {
          this.$store.commit('global/setViewportHeight', window.innerHeight);
        },
        onOrientationChange: function () {
          if (window.orientation === 0 || window.orientation === 180) {
            document.body.classList.remove('landscape');
            this.$el.parentElement.style.height = '';
            setTimeout(() => {
              this.$nuxt.$emit('updateLoco');
              this.$store.commit('global/setViewportHeight', window.innerHeight);
            }, 100);
          } else {
            if (this.touchevents) {
              document.body.classList.add('landscape');
              setTimeout(() => {
                this.$el.parentElement.style.height = `${this.$store.state.global.viewportHeight}px`;
              }, 100);
            }
          }
        },
        bodyEnd (e) {
          if (e.target === document.body) {
            document.body.classList.remove('out');
            this.$nuxt.$emit('animateIn');
          }
        }
      }
    };
    </script>

    <style lang="scss">
    // @import '@/assets/scss/imports';
    #app {}
    </style>
