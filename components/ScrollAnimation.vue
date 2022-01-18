<template>
  <component
    :is="el"
    v-observe-visibility="{callback: visibilityChanged}"
    class="animate"
    :class="[visible ? 'visible' : '']"
    :style="{transform: startPosition, transition: transitionVal}"
  >
    <slot />
  </component>
</template>
<script>

export default {
  mixins: [],
  props: {
    el: {
      type: String,
      default: '',
      required: false
    },
    axis: {
      type: String,
      default: '',
      required: false
    },
    distance: {
      type: String,
      default: '',
      required: false
    },
    duration: {
      type: String,
      default: '',
      required: false
    },
    bezier: {
      type: String,
      default: '',
      required: false
    },
    delay: {
      type: String,
      default: '',
      required: false
    },
    callback: {
      type: Function,
      default: null,
      required: false
    }
  },
  data () {
    return {
      visible: false,
      lastScrollTop: 0,
      scrollDir: null,
      visibleAboveFold: false
    };
  },
  computed: {
    scrollPos: function () {
      return this.$store.state.global.scrollPos;
    },
    startPosition () {
      const xVal = this.axis === 'x' ? this.distance : 0;
      const yVal = this.axis === 'y' ? this.distance : 0;
      return `translateX(${xVal}px) translateY(${yVal}px)`;
    },
    transitionVal () {
      const dur = this.duration ? this.duration : 300;
      const bezier = this.bezier ? ` cubic-bezier(${this.bezier})` : '';
      const delay = this.delay ? ` ${this.delay}ms` : '';

      if (this.$data.visible) {
        return `opacity ${dur}ms${bezier}${delay}, transform ${dur}ms${bezier}${delay}`;
      } else {
        return '';
      }
    }
  },
  watch: {
    visible: function (newVal) {
      if (this.callback) {
        this.callback(newVal);
      }
    },
    scrollPos: function () {
      const st = this.$store.state.global.scrollPos;
      if (st > this.$data.lastScrollTop) {
        this.$data.scrollDir = 'down';
      } else {
        this.$data.scrollDir = 'up';
      }
      this.$data.lastScrollTop = st <= 0 ? 0 : st;
    }
  },
  mounted () {},
  destroyed () {},
  methods: {
    visibilityChanged (isVisible) {
      if (isVisible && this.$data.scrollDir === 'down' && !this.$data.visibleAboveFold) {
        this.$data.visible = true;
      } else if (!isVisible && this.$data.scrollDir === 'up' && !this.$data.visibleAboveFold) {
        this.$data.visible = false;
      } else if (isVisible) {
        this.$data.visible = true;
        if (!this.$data.scrollDir) {
          this.$data.visibleAboveFold = true;
        }
        // if this condition is met 'visible' needs to be set to true, on load
        // need to then set a flag so that it does not reset when scrolling
        // when resizing the page we will need to check if that flag should be removed so that it may animate accordingly if below the fold
      }
    }
  },
};
</script>

<style lang="scss" scoped>
  .animate {
    opacity: 0;

    &.visible {
      opacity: 1;
      transform: translateX(0) translateY(0) !important;
    }
  }
</style>
