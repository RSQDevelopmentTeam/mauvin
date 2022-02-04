<template>
<nav v-if="ready" id="nav">
  <div id="logo"></div>
</nav>
</template>

<script>
// mixins

// components

export default {
  components: {},
  mixins: [],
  data() {
    return {
      ready: false
    };
  },
  computed: {},
  watch: {},
  destroyed: function() {},
  mounted: function() {
    this.$data.ready = true;
  },
  created: function() {},
  methods: {}
};
</script>
<style>
#logo {
  height: 20px;
  width: 20px;
  background-color: red;
}

a {
  color: #fff;
}

#nav {
  position: absolute;
  display: flex;
  left: 0;
  max-width: 290px;
  height: 74px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 32px;
  z-index: 3;

  &.nav-enter-active {
    opacity: 0;
    transform: translateY(-60px);
  }

  &.nav-enter-to {
    opacity: 1;
    transform: translateY(0px);
    transition: opacity 500ms, transform 700ms;
    transition-delay: 500ms;
    transition-timing-function: cubic-bezier(.16, .5, .47, 1)
  }


}
</style>
