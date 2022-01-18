<template>
  <div class="two-columns" data-scroll-section>
    <div class="grid grid-cols-12 gap-8 lg:gap-32 mx-8 lg:mx-64" :class="marginBottom">
      <div data-scroll class="col-span-12" :class="`${mobileBreak}:col-span-${leftColumns}`">
        <slot name="left" />
      </div>
      <div data-scroll class="col-span-12" :class="`${mobileBreak}:col-span-${rightColumns}`">
        <slot name="right" />
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
  props: {
    marginBottom: {
      type: String,
      default: ''
    },
    leftColumns: {
      type: Number,
      default: 6
    },
    rightColumns: {
      type: Number,
      default: 6
    },
    mobileBreak: {
      type: String,
      default: 'xl'
    }
  },
  data () {
    return {};
  },
  computed: {},
  watch: {},
  destroyed: function () {},
  mounted: function () {},
  created: function () {},
  methods: {}
};
</script>
<style>
  .two-columns {

  }
</style>
