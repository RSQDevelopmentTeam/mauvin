<template>
<div id="home-page" :class="introClasses">
  <section id="intro-section" data-scroll-section>
    <div id="settings-container">
      <div class="setting rangeSlider">
        <h5>Cursor Size</h5>
        <veeno v-model="mauvinsSize" :handles="5" :range="{ 'min': 0, 'max': 35 }"></veeno>
        <div class="num">{{mauvinsSize}}</div>
      </div>
      <div class="setting">
        <h5>Cursor Color</h5>
        <div class="color-dot-container">
          <div class="color-dot active red"></div>
          <div class="color-dot red"></div>
          <div class="color-dot red"></div>
          <div class="color-dot red"></div>
          <div class="color-dot red"></div>
        </div>
      </div>
      <div class="setting">
        <h5>Stroke Border</h5>
        <div class="toggle-container toggle">
          <div class="toggle__handle"></div>
          <div class="toggle-section">
            <div class="mauvin-toggle-dot">
              <div class="dot"></div>
            </div>
          </div>
          <div class="toggle-section">
            <div class="mauvin-toggle-stroke">
              <div class="dot"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="setting">
        <h5>Stroke Border Color</h5>
        <div class="color-dot-container">
          <div class="color-dot active red"></div>
          <div class="color-dot red"></div>
          <div class="color-dot red"></div>
          <div class="color-dot red"></div>
          <div class="color-dot red"></div>
        </div>
      </div>
      <div class="setting rangeSlider">
        <h5>Cursor Sroke Size</h5>
        <veeno v-model="mauvinsStrokeSize" :handles="20" :range="{ 'min': 0, 'max': 35 }">
        </veeno>
        <div class="num">{{mauvinsStrokeSize}}</div>
      </div>
    </div>
    <div id="mauvin-hold">
      <div id="grid">
        <div class="inside"></div>
      </div>
      <div id="moving-action">
        <div id="mauvin-person" ref="mauvin-person">
          <div id="mauvin-left" data-mauvin-hover>
            <div id="mauvin-eye" ref="mauvin-left-eye" data-magnet></div>
          </div>
          <div id="mauvin-right" data-mauvin-hover>
            <div id="mauvin-eye" ref="mauvin-right-eye" data-magnet></div>
          </div>
        </div>
      </div>
      <!-- <div id="mauvins-shadow"></div> -->
    </div>

    <div id="mauvins-content" class="text-center">
      <div id="margin-logo"></div>

      <h2>Cursor Component For Vue</h2>
      <p>
        Mauvin is a custom cursor for Vue.js project that provide custom cursor features giving you access to a modest array of tools to help get your work done faster. This set current includes 5 options to hit the ground running.
      </p>
    </div>
  </section>
  <section id="code-section" data-scroll-section>
    <div id="mauvins-content" class="text-center">
      <h1>Mauvin</h1>
      <div id="logo">d</div>
      <h2>Cursor Component For Vue</h2>
      <p>
        Mauvin is a custom cursor for Vue.js project that provide custom cursor features giving you access to a modest array of tools to help get your work done faster. This set current includes 5 options to hit the ground running.
      </p>
    </div>
  </section>
</div>
</template>

<script>
// mixins

import introAnimation from '~/mixins/introAnimation.js';
import meta from '~/mixins/meta.js';
import locoControls from '~/mixins/locoControls.js';
// you probably need to import built-in style
import veeno from 'veeno'
import 'nouislider/distribute/nouislider.min.css';

export default {
  components: {
    veeno
  },
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
      value: 5,
      mauvinsSize: 5,
      mauvinsStrokeSize: 10,
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
    const toggle = document.querySelectorAll('.toggle');
    toggle.forEach((elm, i) => {
      elm.addEventListener('click', () => elm.classList.toggle('is-on'));
    });

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
