<template>
  <transition name="nav">
    <div v-if="ready" id="nav">
      <div data-scroll-section class="grid grid-cols-2 gap-8 lg:gap-32 mx-8 lg:mx-64 mb-128 py-64 lg:py-128">
        <div class="font-serif text-base">
          <nuxt-link to="/">Logo</nuxt-link>
        </div>
        <div class="flex justify-end">
          <ul class="flex">
            <li class="mx-8"><nuxt-link to="/about">About</nuxt-link></li>
            <li class="mx-8"><nuxt-link to="/template_page">Template</nuxt-link></li>
            <li class="mx-8"><a href="">link 3</a></li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// mixins

// components

export default {
  components: {},
  mixins: [],
  data () {
    return {
      ready: false
    };
  },
  computed: {},
  watch: {},
  destroyed: function () {},
  mounted: function () {
    this.$data.ready = true;
  },
  created: function () {},
  methods: {}
};
</script>
<style>
  #nav {
    &.nav-enter-active {
      opacity: 0;
      transform: translateY(-60px);
    }
    &.nav-enter-to {
      opacity: 1;
      transform: translateY(0px);
      transition: opacity 500ms, transform 700ms;
      transition-delay: 500ms;
      transition-timing-function: cubic-bezier(.16,.5,.47,1)
    }
  }
</style>
