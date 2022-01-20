<template>
<div id="home-page" :class="introClasses">
  <div class="mauvin-intro">
    <div class="ball"></div>
    <div data-scroll-section class="grid grid-cols-12 gap-8 lg:gap-32 mx-8 lg:mx-64 mb-64 lg:mb-128">
      <div v-for="item, i in items" class="project-one-blist col-span-2 lg:col-span-2" data-mauvin-hover :data-mauvinContent="item.img" :data-mauvinsExpandingSize="item.size" :data-mauvinsEmitsDistances="item.distance">
        <img data-magnet class="img" :src="item.img" alt="img">
      </div>
    </div>
    <!--
    <div data-scroll-section class="grid grid-cols-12 gap-8 lg:gap-32 mx-8 lg:mx-64 mb-64 lg:mb-128"> -->

  </div>
</div>
</div>
</template>

<script>
// mixins
import introAnimation from '~/mixins/introAnimation.js';
import meta from '~/mixins/meta.js';
import locoControls from '~/mixins/locoControls.js';

export default {
  components: {},
  mixins: [
    introAnimation,
    meta,
    locoControls
  ],
  // Data from API / CMS
  async asyncData({
    from
  }) {
    // Prismic example is commented out below, do not forget to pass needed data into the return object

    return {
      from,
      seo_title: 'Custom page title',
      seo_description: 'Custom page description',
      seo_og_image: 'custom/page/og/image.png'
    };
  },
  // data specific to the page and not from the API / CMS
  data() {
    return {
      scroll: null,
      items: [{
          img: '/img/cat.jpg',
          size: 65,
          distance: 100,
        },
        {
          img: '/img/image.jpg',
          size: 65,
          distance: 100,
        }
      ]
    };
  },
  computed: {},
  watch: {},
  destroyed: function() {},
  mounted: function() {
    this.animateIn(this.finishedAnimating);
  },
  created: function() {},
  methods: {
    finishedAnimating: function() {
      this.locomotiveScrollInit();
    }
  }
};
</script>
<style src="./index.scss" lang="scss" scoped>

</style>
