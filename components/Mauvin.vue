<template>
<div id="mauvin-container" :class="classes">
  <div v-if="this.$store.state.mouseSettings.stroke.strokeCursor" id="mauvin-stroke" ref="mauvinStroke"></div>
  <div id="mauvin" ref="mauvinCursor">
    <div v-if="this.$store.state.mouseSettings.dotCursor" id="mauvin-color" ref="mauvinColor"></div>
    <div v-if="this.$data.imageCursor" id="mauvin-image" ref="mauvinImage" :style="{ backgroundImage: 'url(' + this.$data.image.src + ')' }"></div>
  </div>
</div>
</template>
<script>
import {
  TweenMax,
} from 'gsap';
import touchevents from '~/mixins/touchevents';
export default {
  props: {},
  mixins: [
    touchevents
  ],
  data() {
    return {
      coords: [-30, -30],
      elms: [],
      elmsData: [],
      magnetElms: [],
      showMagnetProxy: false,
      showCursorsProxyNum: false,
      magnet: {
        speed: 0.2,
      },
      imageCursor: false,
      image: {
        src: '/img/default.jpg',
        borderRaidus: '50%'
      },
      floatCursor: true,
      floatingCursor: {
        speed: 0.4,
        size: 25,
        borderColor: 'red',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRaidus: '50%',
      },
      effectAllElementsInArea: false,
      RunMauvin: null,
      raf: null
    };
  },
  computed: {
    touchevents() {
      return (
        'ontouchstart' in window ||
        navigator.MaxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    },
    getStrokeWidth() {
      return parseInt(this.$store.state.mouseSettings.stroke.borderWidth)
    },
    coordinates() {
      this.$store.commit('mouseSettings/updateCoords', [this.$store.state.mouseSettings.coords[0], this.$store.state.mouseSettings.coords[1]]);
      return [this.$store.state.mouseSettings.coords[0], this.$store.state.mouseSettings.coords[1]];
    },
    activate() {
      return this.$store.state.mouseSettings.active;
    },
    classes() {
      return {
        'cursor-hover': this.activate,
      };
    },
    elm() {
      return this.$store.state.mouseSettings.elm
    },
    cursorImage() {
      return this.$store.state.mouseSettings.cursorImage;
    },
    strokeCursor() {
      return this.$store.state.mouseSettings.stroke.strokeCursor;

    },
  },
  watch: {
    strokeCursor(oldVal, newVal) {
      this.settingMauvinsStrokeStyle();
      return this.$store.state.mouseSettings.stroke.strokeCursor;

    },
    elm() {},
    activate() {},

    coordinates() {
      this.$data.elmsData.forEach((elm, i, arr) => {
        /// Updates List of Elements object of data
        this.disperseMouseData(i, arr, elm.node);
      });
    }
  },
  methods: {
    setAttributes(el, attrs) {
      Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
    },
    hypotenuse(elm) {
      let element = elm.getBoundingClientRect();
      let distance = {
        x: (element.left + element.width / 2) - this.coordinates[0],
        y: (element.top + element.height / 2) - this.coordinates[1]
      };
      return Math.sqrt(distance.x * distance.x + distance.y * distance.y);
    },
    angle(elm) {
      let element = elm.getBoundingClientRect();
      let distance = {
        x: (element.left + element.width / 2) - this.coordinates[0],
        y: (element.top + element.height / 2) - this.coordinates[1]
      };
      return Math.atan2(distance.x, distance.y)
    },
    closestToCursor(elms) {
      let holdProxyNums = [];
      elms.forEach((item) => {
        holdProxyNums.push({
          Cost: parseInt(item.dataset.hypotenuse), /// Must parse number floating causes issues
          elm: item
        });
      });
      return holdProxyNums.reduce((prev, curr) => prev.Cost < curr.Cost ? prev : curr);
    },
    settingMauvinsStrokeStyle() {
      // Setting Style Options On Mauvin's Stroke Border
      if (this.$store.state.mouseSettings.stroke.strokeCursor) {
        setTimeout(() => {
          const mauvinStroke = document.querySelector('#mauvin-stroke');
          mauvinStroke.style.setProperty('--style', this.$store.state.mouseSettings.stroke.borderStyle);
          mauvinStroke.style.setProperty('--color', this.$store.state.mouseSettings.stroke.borderColor);
          mauvinStroke.style.setProperty('--stroke', this.$store.state.mouseSettings.stroke.borderWidth + "px");
          mauvinStroke.style.setProperty('--mauvinStrokeRadius', this.$store.state.mouseSettings.stroke.borderRaidus);
          document.querySelector('#mauvin-stroke-real').style.setProperty('--color', this.$store.state.mouseSettings.stroke.borderColor);
        }, 1)

      }
    },
    settingMauvinStyle() {
      const mauvin = this.$refs.mauvinCursor
      const mauvinImage = this.$refs.mauvinImage;
      // Setting Style Options On Mauvin
      mauvin.style.setProperty('--color', this.$store.state.mouseSettings.mauvin.color);
      mauvin.style.setProperty('--mauvinRadius', this.$store.state.mouseSettings.mauvin.borderRaidus);

      this.settingMauvinsStrokeStyle();
      // Setting Style Options On Mauvin's Image
      if (this.$data.imageCursor) {
        mauvinImage.style.setProperty('--mauvinImageRadius', this.$data.image.borderRaidus);
      }
    },
    disperseMouseData(i, arr, elm) {
      // Apply Data to element
      this.setAttributes(elm, {
        'data-hypotenuse': this.hypotenuse(elm),
        'data-index': i,
        'data-inProxy': (elm.dataset.mauvinsemitsdistances) ? this.hypotenuse(elm) <= elm.dataset.mauvinsemitsdistances : 'proxyoff'
      });
      // Developer Tool
      if (this.$data.showCursorsProxyNum) elm.querySelector('.hypotenuse').innerHTML = Math.round(elm.dataset.hypotenuse);
    },
    onMouseMove(e) {
      this.$store.commit('mouseSettings/updateCoords', [e.clientX, e.clientY]);
      this.mauvinMovement()
    },
    onMouseEnter(e) {
      this.$store.commit('mouseSettings/elm', e.target);
      this.$store.commit('mouseSettings/activate', true);
      // this.$store.commit('mouseSettings/cursorSize', (e.target.dataset.mauvinsexpandingsize) ? e.target.dataset.mauvinsexpandingsize : this.$store.state.mouseSettings.mauvin.size);
      if (this.$data.imageCursor) this.$data.image.src = e.target.dataset.mauvincontent;
    },
    onMouseLeave(e) {
      this.$store.commit('mouseSettings/elm', '');
      this.$store.commit('mouseSettings/deactivate', false);
      if (this.$data.imageCursor) this.$data.image.src = '/img/default.jpg';
      // this.$store.commit('mouseSettings/cursorSize', this.$store.state.mouseSettings.mauvin.defualtSize);
    },

    showMauvinLocation() {
      if (this.$data.showCursorsProxyNum && this.$data.magnetElms > 0) {
        if (document.querySelectorAll('.hypotenuse').length !== this.$data.elms.length) {
          this.$data.elms.forEach((elm, i) => {
            let cursorProxyData = document.createElement("div");
            cursorProxyData.className = 'hypotenuse';
            cursorProxyData.innerHTML = Math.round(elm.dataset.hypotenuse);
            elm.appendChild(cursorProxyData);
          })
        }
      }
    },
    createMagnetProxy(elm) {
      if (document.querySelectorAll('.magnetic-size').length !== this.$data.elms.length) {
        elm.forEach((elm) => {
          if (elm.dataset.mauvinsemitsdistances !== undefined) {
            let magnetSize = document.createElement("div");
            magnetSize.className = 'magnetic-size';
            magnetSize.style.height = `${this.getMagnetProxy(elm, elm.getBoundingClientRect().width, elm.getBoundingClientRect().height)}px`;
            magnetSize.style.width = `${this.getMagnetProxy(elm, elm.getBoundingClientRect().width, elm.getBoundingClientRect().height)}px`;
            elm.appendChild(magnetSize);
          }
        });
      }
    },
    getMagnetProxy(elm, width, height) {
      let distance;
      if (elm.dataset.mauvinsemitsdistances) {
        distance = elm.dataset.mauvinsemitsdistances * 2;
      } else if (distance === undefined) {
        distance = (height < width) ? width : height;
        distance = distance / 33;
      }
      return distance;
    },
    updateMagnetProxy(elm) {
      elm.forEach((elm) => {
        elm.querySelector('.magnetic-size').style.height = `${this.getMagnetProxy(elm,elm.getBoundingClientRect().width, elm.getBoundingClientRect().height)}px`;
        elm.querySelector('.magnetic-size').style.width = `${this.getMagnetProxy(elm,elm.getBoundingClientRect().width, elm.getBoundingClientRect().height)}px`;
      })
    },

    magnetTween(elm) {
      TweenMax.to(elm.querySelector('[data-magnet]'), this.$data.magnet.speed, {
        x: -((Math.sin(this.angle(elm)) * this.hypotenuse(elm)) / 2),
        y: -((Math.cos(this.angle(elm)) * this.hypotenuse(elm)) / 2),
      });
    },
    magnetTweenReset(elm) {
      TweenMax.to(elm.querySelector('[data-magnet]'), this.$data.magnet.speed, {
        x: 0,
        y: 0,
      });
    },
    magnetize() {
      this.$data.elms.forEach((elm) => {
        if (!this.$data.effectAllElementsInArea && this.$data.magnetElms > 0) {
          let closestToCursor = this.closestToCursor(this.$data.elms);
          if (closestToCursor.elm === elm && elm.dataset.inproxy === "true") {
            this.magnetTween(elm);
          } else {
            this.magnetTweenReset(elm);
          }
        } else {
          if (elm.dataset.inproxy === "true") {
            this.magnetTween(elm);
          } else {
            this.magnetTweenReset(elm);
          }
        }
      });
    },

    mauvinTween() {
      TweenMax.to(this.$refs.mauvinCursor, this.$store.state.mouseSettings.mauvin.speed, {
        x: this.coordinates[0] - (this.$store.state.mouseSettings.mauvin.size / 2),
        y: this.coordinates[1] - (this.$store.state.mouseSettings.mauvin.size / 2),
        width: this.$store.state.mouseSettings.mauvin.size,
        height: this.$store.state.mouseSettings.mauvin.size,
      });
    },
    mauvinMovement() {
      this.$store.commit('mouseSettings/cursorMoving', true);
      clearTimeout(this.$store.state.mouseSettings.mauvin.movingActionTime);
      this.$store.commit('mouseSettings/addMovment', setTimeout(() => {
        this.$store.commit('mouseSettings/cursorMoving', false);
        this.$store.commit('mouseSettings/cursorDirectionX', 'center');
        this.$store.commit('mouseSettings/cursorDirectionY', 'center');
      }, this.$store.state.mouseSettings.mauvin.settlingDown));
    },
    mauvinDirection() {
      if (this.coordinates[1] < this.$store.state.mouseSettings.mauvin.oldY) {
        this.$store.commit('mouseSettings/cursorDirectionY', 'up');
      } else if (this.coordinates[1] > this.$store.state.mouseSettings.mauvin.oldY) {
        this.$store.commit('mouseSettings/cursorDirectionY', 'down');
      }
      this.$store.commit('mouseSettings/oldCoordsY', this.coordinates[1]);

      if (this.coordinates[0] < this.$store.state.mouseSettings.mauvin.oldX) {
        this.$store.commit('mouseSettings/cursorDirectionX', 'left');
      } else if (this.coordinates[0] > this.$store.state.mouseSettings.mauvin.oldX) {
        this.$store.commit('mouseSettings/cursorDirectionX', 'right');
      }
      this.$store.commit('mouseSettings/oldCoordsX', this.coordinates[0]);

      // this.$store.commit('mouseSettings/cursorDirectionX', this.$store.state.mouseSettings.mauvin.direction.x);
      // this.$store.commit('mouseSettings/cursorDirectionY', this.$store.state.mouseSettings.mauvin.direction.y);

    },

    createStroke() {
      if (this.$store.state.mouseSettings.stroke.strokeCursor) {
        let size = this.$store.state.mouseSettings.stroke.size + (this.$store.state.mouseSettings.mauvin.size);
        TweenMax.to(this.$refs.mauvinStroke, this.$store.state.mouseSettings.stroke.speed, {
          y: (this.coordinates[1] - (size / 2)),
          x: (this.coordinates[0] - (size / 2)),
          width: size,
          height: size,
        });
      }
    },

    mauvinCharacter() {
      if (this.$store.state.mouseSettings.mauvin.moving) {
        if (this.$store.state.mouseSettings.mauvin.direction.x === 'right') {
          TweenMax.to('#mauvin-person', 2, {
            x: 20,
            y: 0,
            rotation: 12,
          });
          TweenMax.to('#mauvin-left #mauvin-eye', 1, {
            x: 20,
          });
          TweenMax.to('#mauvin-right #mauvin-eye', 1, {
            x: 20,
          });
        }
        if (this.$store.state.mouseSettings.mauvin.direction.x === 'left') {
          TweenMax.to('#mauvin-person', 2, {
            x: -20,
            rotation: -22,
          });
          TweenMax.to('#mauvin-left #mauvin-eye', 1, {
            x: -20,
          });
          TweenMax.to('#mauvin-right #mauvin-eye', 1, {
            x: -20,
          });
        }
        if (this.$store.state.mouseSettings.mauvin.direction.y === 'up') {
          TweenMax.to('#mauvin-person', 2, {
            y: -50,
          });
          TweenMax.to('#mauvin-left #mauvin-eye', 1, {
            y: -20,
          });
          TweenMax.to('#mauvin-right #mauvin-eye', 1, {
            y: -20,
          });
        }
        if (this.$store.state.mouseSettings.mauvin.direction.y === 'down') {
          TweenMax.to('#mauvin-person', 2, {
            y: -50,
            rotation: -22,
          });
          TweenMax.to('#mauvin-left #mauvin-eye', 1, {
            y: 20,
          });
          TweenMax.to('#mauvin-right #mauvin-eye', 1, {
            y: 20,
          });
        }
        document.querySelector('#moving-action').classList.add('move');
      } else {
        TweenMax.to('#mauvin-person', 2, {
          x: 0,
          y: 0,
          rotation: 0,
        });
        TweenMax.to(['#mauvin-left #mauvin-eye', '#mauvin-right #mauvin-eye'], 1, {
          x: 0,
          y: 0,
        });

        document.querySelector('#moving-action').classList.remove('move');
      }
      document.querySelector('#grid').style.setProperty('--bgy', `${-(this.coordinates[0] - (this.$store.state.mouseSettings.mauvin.size / 2))}px`);
      document.querySelector('#grid').style.setProperty('--bgx', `${-(this.coordinates[1] - (this.$store.state.mouseSettings.mauvin.size / 2))}px`);
    },

    startMauvin() {
      this.$data.RunMauvin = () => {
        this.mauvinCharacter();
        this.mauvinTween();
        this.mauvinDirection();

        this.createStroke();

        // this.magnetize();
        this.$data.raf = requestAnimationFrame(this.$data.RunMauvin);
      }
      this.$data.RunMauvin();
    },
  },
  mounted: function() {
    if (!this.touchevents) {
      // Stroke Mouse Listener
      document.querySelector('body').addEventListener('mousemove', (e) => this.onMouseMove(e));
      // Setting Muavins Styles
      this.settingMauvinStyle();
      // Grab Elements
      this.$data.elms = [...document.querySelectorAll('[data-mauvin-hover]')];
      // Grab magnet
      this.$data.magnetElms = [...document.querySelectorAll('[data-magnet]')];

      // let's Grab elements that are needed
      if (this.$data.elms.length > 0) {
        // Add Mouse Listners to grab elements
        this.$data.elms.forEach((elm, i) => {
          elm.addEventListener('mouseenter', (e) => this.onMouseEnter(e));
          elm.addEventListener('mouseleave', (e) => this.onMouseLeave(e));
          // Form Data array about grab elements
          this.$data.elmsData.push({
            index: i,
            node: elm,
            data: elm.dataset,
          });
        });
        // Developer helper tool
        this.showMauvinLocation();
        // Developer helper tool
        if (this.$data.showMagnetProxy && this.$data.magnetElms > 0) {
          window.addEventListener('resize', () => this.updateMagnetProxy(this.$data.elms));
          this.createMagnetProxy(this.$data.elms);
        }
      }
      // Start Cursor
      this.startMauvin();

    }
  },
  beforeDestroy: function() {
    document.querySelector('body').removeEventListener('mousemove', (e) => this.onMouseMove(e));
    this.$data.elms.forEach((elm, i) => {
      elm.removeEventListener('mouseout', this.onMouseLeave);
      elm.removeEventListener('mouseover', this.onMouseEnter);
    });
    if (this.$data.showMagnetProxy) window.removeEventListener('resize', this.updateMagnetProxy(this.$data.elms));
    // Remove RAF
    cancelAnimationFrame(this.$data.raf);
  }
};
</script>
<style lang="scss">
$size: 10px;
body {
    // cursor: none;
}
#mauvin-container {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    pointer-events: none;
    top: 0;
    left: 0;

    * {
        pointer-events: none;

    }

    #mauvin {
        position: absolute;
        will-change: transform;
        #mauvin-color {
            position: absolute;
            width: 100%;
            height: 100%;
            margin: auto;
            border-radius: var(--mauvinRadius);
            background-color: var(--color);
        }
        #mauvin-image {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: var(--mauvinImageRadius);
            background-image: no-repeat;
            background-size: cover;
            z-index: 9999;
        }
    }
    #mauvin-stroke {
        position: absolute;
        will-change: transform;
        border: var(--stroke) var(--style) var(--color);
        border-radius: var(--mauvinStrokeRadius);
    }
}

// Attributes in proxy
[data-inproxy='true'] {
    border: 5px solid var(--color);
}

[data-mauvin-hover] {
    position: relative;

    [data-magnet] {
        width: 100%;
        height: 100%;
        transition: transform 200ms ease-out;
    }
}

// Developer Tool
.magnetic-size {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    border-radius: 50%;
    border: 1px dashed var(--color);
    z-index: 1;
    pointer-events: none;
    animation: magnetic-size 120s infinite;
}

@keyframes magnetic-size {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

// Developer Tool
.hypotenuse {
    position: absolute;
    top: 0;
    left: 0;
    padding: 5px 10px;
    background-color: red;
    color: white;
    pointer-events: none;
    font-size: 16px;
}
</style>
