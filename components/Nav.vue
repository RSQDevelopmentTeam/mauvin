<template>
<div v-if="ready" id="nav">
  <div class="grid grid-cols-2 items-center gap-8 lg:gap-32 mx-8 lg:mx-64 mb-64 py-64 lg:py-64">
    <div id="logo"></div>
    <div class="flex justify-end">
      <ul class="flex">
        <li class="mx-8">
          <a href="#about">Github</a>
        </li>
        <li class="mx-8">
          <a href="#instruction">Contact Us</a>
        </li>
      </ul>
    </div>
  </div>
</div>
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
  width: 100%;

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
