<template>
  <div id="about-page" :class="introClasses" class="pb-64 lg:pb-128">
    <div data-scroll-section class="hero grid grid-cols-12 gap-8 lg:gap-32 mx-8 lg:mx-64 mb-64">
      <div data-scroll data-scroll-repeat class="col-span-12 2xl:col-span-4">
        <h1>Headline</h1>
      </div>
      <div data-scroll data-scroll-repeat class="col-span-12 2xl:col-span-8">
        <ScrollAnimation
          el="p"
          axis="y"
          distance="60"
          duration="1000"
          bezier=".23,1,.32,1"
          delay="150"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ScrollAnimation>
      </div>
    </div>
    <TwoColumn
      :left-columns="6"
      :right-columns="6"
      mobile-break="xl"
      margin-bottom="mb-64 lg:mb-128"
    >
      <template #left>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </template>
      <template #right>
        <img src="/img/photo-1485217988980-11786ced9454.jpeg">
      </template>
    </TwoColumn>

    <TwoColumn
      :left-columns="8"
      :right-columns="4"
      mobile-break="xl"
      margin-bottom="mb-64 lg:mb-128"
    >
      <template #left>
        <img src="/img/photo-1497032628192-86f99bcd76bc.jpeg">
      </template>
      <template #right>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </template>
    </TwoColumn>

    <TwoColumn
      :left-columns="4"
      :right-columns="8"
      mobile-break="xl"
      margin-bottom="mb-64 lg:mb-128"
    >
      <template #left>
        <h3>Aliquip ex ea commodo consequat</h3>
      </template>
      <template #right>
        <img src="/img/photo-1533090161767-e6ffed986c88.jpeg" alt="">
      </template>
    </TwoColumn>

    <div data-scroll-section class="grid grid-cols-12 gap-8 lg:gap-32 mx-8 lg:mx-64 mb-64 lg:mb-128">
      <div data-scroll data-scroll-repeat class="col-span-12 2xl:col-span-6">
        <ScrollAnimation
          el="p"
          axis="y"
          distance="60"
          duration="1000"
          bezier=".23,1,.32,1"
          delay="150"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ScrollAnimation>
      </div>
      <div data-scroll data-scroll-repeat class="col-span-12 2xl:col-span-6">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>

    <div data-scroll-section class="grid grid-cols-12 gap-8 lg:gap-32 mx-8 lg:mx-64 mb-64 lg:mb-128">
      <div class="col-span-12 2xl:col-span-6">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
      <div class="col-span-12 2xl:col-span-6">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>
    <div data-scroll-section class="grid grid-cols-12 gap-8 lg:gap-32 mx-8 lg:mx-64 mb-64 lg:mb-128">
      <div class="col-span-12 2xl:col-span-6">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
      <div class="col-span-12 2xl:col-span-6">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>
    <div data-scroll-section class="grid grid-cols-12 gap-8 lg:gap-32 mx-8 lg:mx-64 mb-64 lg:mb-128">
      <div class="col-span-12 2xl:col-span-6">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
      <div class="col-span-12 2xl:col-span-6">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>
    <div data-scroll-section class="grid grid-cols-12 gap-8 lg:gap-32 mx-8 lg:mx-64 mb-64">
      <div class="col-span-12 2xl:col-span-4">
        <h1>Headline</h1>
      </div>
      <div class="col-span-12 2xl:col-span-8">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>
    <div data-scroll-section class="grid grid-cols-12 gap-8 lg:gap-32 mx-8 lg:mx-64 mb-64 lg:mb-128">
      <div class="col-span-12 2xl:col-span-6">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
      <div class="col-span-12 2xl:col-span-6">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
import TwoColumn from '~/components/TwoColumn';

export default {
  components: {
    TwoColumn
  },
  mixins: [
    introAnimation,
    meta,
    locoControls
  ],
  // Data from API / CMS
  async asyncData ({ from }) {
    // Prismic example is commented out below, do not forget to pass needed data into the return object

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
    };
  },
  computed: {},
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
<style src="./about.scss" lang="scss"></style>
