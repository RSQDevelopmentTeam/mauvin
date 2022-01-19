<template>
<div id="home-page" :class="introClasses">
  <div class="pb-64 lg:pb-128">
    <div data-scroll-section class="grid grid-cols-12 gap-8 lg:gap-32 mx-8 lg:mx-64 mb-64 lg:mb-128">
      <div class="col-span-12 lg:col-span-12">
        <div id="project-content">
          <div v-for="item, i in items" class="project-one-blist" data-mauvin-hover :data-mauvinBackgroundImage="item.img" :data-mauvinsExpandingSize="item.size" :data-mauvinsEmitsDistances="item.distance">
            <img data-magnet class="img" :src="item.img" alt="img">
          </div>
        </div>
      </div>
    </div>
    <div data-scroll-section class="grid grid-cols-12 gap-8 lg:gap-32 mx-8 lg:mx-64 mb-64 lg:mb-128">
      <div data-scroll data-scroll-speed="4" class="col-span-12 lg:col-span-9 order-2 lg:order-1">
        <div class="slider bg-gray aspect-w-16 aspect-h-9">
          slider
        </div>
      </div>
      <div class="col-span-12 lg:col-span-3 order-1 lg:order-2">
        <ScrollAnimation el="h3" axis="x" distance="100" duration="2000" bezier=".23,1,.32,1" delay="150">
          hargo
        </ScrollAnimation>
      </div>
    </div>
    <div data-scroll-section class="grid grid-cols-12 gap-8 lg:gap-32 mx-8 lg:mx-64 mb-64 lg:mb-128">
      <div class="col-span-12 lg:col-span-3">
        hargo
      </div>
      <div class="col-span-12 lg:col-span-9">
        <div class="slider bg-gray aspect-w-16 aspect-h-9">
          slider
        </div>
      </div>
    </div>
    <div data-scroll-section class="grid grid-cols-12 gap-8 lg:gap-32 mx-8 lg:mx-64 mt-64 lg:mt-128">
      <div class="col-span-12 lg:col-span-9 order-2 lg:order-1">
        <div class="slider bg-gray aspect-w-16 aspect-h-9">
          slider
        </div>
      </div>
      <div class="col-span-12 lg:col-span-3 order-1 lg:order-2">
        hargo
      </div>
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
      }]
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
<style src="./index.scss" lang="scss" scoped></style>
