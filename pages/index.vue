<template>
<div id="home-page" data-scroll-container :class="introClasses">
  <section id="intro-section" data-scroll-section>
    <div id="grid-container">
      <div id="grid"></div>
    </div>

    <div id="settings-container">
      <div id="margin-logo"></div>
      <div class="setting data-container">
        <div id="data">
          <h4>Mauvin's Global Data</h4>
          <ul>
            <li>
              <span>Position X:</span> <span class="data">{{this.$store.state.mouseSettings.coords[0]}}</span>
            </li>
            <li>
              <span>Position Y:</span> <span class="data">{{this.$store.state.mouseSettings.coords[1]}}</span>
            </li>
            <li>
              <span>Direction X:</span> <span class="data">{{this.$store.state.mouseSettings.mauvin.direction.x}}</span>
            </li>
            <li>
              <span>Direction Y:</span> <span class="data">{{this.$store.state.mouseSettings.mauvin.direction.y}}</span>
            </li>

            <li>
              <span>Settling Down:</span> <span class="data">{{this.$store.state.mouseSettings.mauvin.settlingDown}}</span>
            </li>
            <li>
              <span>Moving:</span> <span class="data">{{this.$store.state.mouseSettings.mauvin.moving}}</span>
            </li>
            <li>
              <span>Speed:</span> <span class="data">{{this.$store.state.mouseSettings.mauvin.speed}}</span>
            </li>
            <li>
              <span>Size: </span><span class="data">{{mauvinsSize}}</span>
            </li>
            <li>
              <span>Color: </span><span class="data">{{this.$store.state.mouseSettings.mauvin.color}}</span>
            </li>
          </ul>
        </div>
        <div id="data">
          <h4>Stroke</h4>
          <ul>
            <li>
              <span>Turn Stroke on: </span> <span class="data">{{this.$store.state.mouseSettings.strokeCursor}}</span>
            </li>
            <li>
              <span>Stroke Size:</span> <span class="data">{{mauvinsStrokeSize}}</span>
            </li>
            <li>
              <span>Stroke Color:</span> <span class="data">{{this.$store.state.mouseSettings.stroke.borderColor}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="setting rangeSlider">
        <h5>Cursor Size</h5>
        <veeno v-model="mauvinsSize" :handles="2" :range="{ 'min': 1, 'max': 5 }"></veeno>
        <div class="num">{{mauvinsSize}}</div>
      </div>
      <div class="setting">
        <h5>Cursor Color</h5>
        <div class="color-dot-container mauvin">
          <div :style="{backgroundColor: 'red'}" data-color="red" class="color-dot"></div>
          <div :style="{backgroundColor: 'green'}" data-color="green" class="color-dot"></div>
          <div :style="{backgroundColor: '#8f008d'}" data-color="#8f008d" class="color-dot"></div>
          <div :style="{backgroundColor: '#00728f'}" data-color="#00728f" class="color-dot"></div>
        </div>
      </div>
      <div class="setting">
        <h5>Stroke Border</h5>
        <div class="toggle-container toggle js-toggle-stroke">
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
        <div class="color-dot-container stroke">
          <div :style="{backgroundColor: 'red'}" data-color="red" class="color-dot"></div>
          <div :style="{backgroundColor: 'green'}" data-color="green" class="color-dot"></div>
          <div :style="{backgroundColor: '#8f008d'}" data-color="#8f008d" class="color-dot"></div>
          <div :style="{backgroundColor: '#00728f'}" data-color="#00728f" class="color-dot"></div>
        </div>
      </div>
      <div class="setting rangeSlider">
        <h5>Cursor Sroke Size</h5>
        <veeno v-model="mauvinsStrokeSize" :handles="20" :range="{ 'min': 0, 'max': 35 }">
        </veeno>
        <div class="num">{{mauvinsStrokeSize}}</div>
      </div>
    </div>
    <div id="moving-action" :style="`transform: scale(${(mauvinsSize / 5) * 1.2});`">
      <div id="mauvin-stroke-real" v-if="this.$store.state.mouseSettings.stroke.strokeCursor"> </div>
      <div id="mauvin-person" ref="mauvin-person">
        <mauvinBody />
        <div id="mauvin-left">
          <div id="mauvin-eye" ref="mauvin-left-eye"></div>
        </div>
        <div id="mauvin-right">
          <div id="mauvin-eye" ref="mauvin-right-eye"></div>
        </div>
      </div>
    </div>

  </section>
  <section id="code-section" data-scroll-section>
    <div id="mauvins-content" class="text-center">
      <p>
        Mauvin is a custom cursor for Vue.js project that provide custom cursor features giving you access to a modest array of tools to help get your work done faster.
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
import mauvinBody from '../components/mauvinBody';

export default {
  components: {
    veeno,
    mauvinBody
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
  computed: {
    strokeCursor() {},
  },
  watch: {
    strokeCursor() {},
    mauvinsSize(val) {
      this.$store.commit('mouseSettings/character', val);
    },
    mauvinsStrokeSize(val) {
      // this.$store.commit('mouseSettings/strokeCursorSize', val);
    },
  },
  destroyed: function() {},
  mounted: function() {
    document.querySelector('.js-toggle-stroke').addEventListener('click', () => {
      document.querySelector('.js-toggle-stroke').classList.toggle('is-on');
      this.$store.commit('mouseSettings/strokeCursor', this.$store.state.mouseSettings.stroke.strokeCursor);
      // console.log(this.$store.state.mouseSettings.stroke.strokeCursor)
    });

    // document.querySelector('js-toggle-stroke').addEventListener('click', () => {
    //   document.querySelector('js-toggle-stroke').classList.toggle('is-on');
    //   // this.$store.commit('mouseSettings/strokeCursor', true);
    // });



    document.querySelector('.color-dot-container.mauvin').addEventListener('click', (e) => {
      if (typeof e.target.dataset.color !== 'undefined') {
        this.$store.commit('mouseSettings/cursorColor', e.target.dataset.color);
        document.querySelector('#mauvin-color').style.setProperty('--color', e.target.dataset.color);
      }
    })

    document.querySelector('.color-dot-container.stroke').addEventListener('click', (e) => {
      if (typeof e.target.dataset.color !== 'undefined') {
        this.$store.commit('mouseSettings/strokeCursorColor', e.target.dataset.color);
        document.querySelector('#mauvin-stroke').style.setProperty('--color', e.target.dataset.color);
        document.querySelector('#mauvin-stroke-real').style.setProperty('--color', this.$store.state.mouseSettings.stroke.borderColor);

      }
    })

    this.animateIn(this.finishedAnimating);
  },
  created: function() {},
  methods: {
    finishedAnimating: function() {
      this.locomotiveScrollInit();
    },
  }
};
</script>
<style src="./index.scss" lang="scss" scoped>

</style>
