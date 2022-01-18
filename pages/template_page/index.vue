<template>
  <div id="template-page" :class="introClasses">
    <div class="grid grid-cols-1 gap-8 lg:gap-32 mx-8 lg:mx-64 mb-128">
      <div class="col-span-12 2xl:col-span-4">
        <h1>Template</h1>
      </div>
    </div>

  </div>
</template>

<script>
// mixins
import introAnimation from '~/mixins/introAnimation.js';
import meta from '~/mixins/meta.js';
import locoControls from '~/mixins/locoControls.js';
// components


export default {
  components: {},
  mixins: [
    introAnimation,
    meta,
    locoControls
  ],
  // Data from API / CMS
  async asyncData ({ from }) {
    // Pull data from external API here

    return {
      from,
      seo_title: 'Custom page title',
      seo_description: 'Custom page description',
      seo_og_image: 'custom/page/og/image.png'
    };
  },
  // data specific to the page and not from the API / CMS
  data () {
    return {
      scroll: null
    };
  },
  computed: {},
  watch: {},
  destroyed: function () {},
  mounted: function () {
    this.animateIn(this.finishedAnimating);
  },
  created: function () {},
  methods: {
    finishedAnimating: function () {
      this.locomotiveScrollInit();
    }
  }
};
</script>
<style src="./index.scss" lang="scss" scoped></style>
