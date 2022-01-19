<template>
<div id="cursor-container" :class="classes">
  <div v-if="this.$data.strokeCursor" id="stroke" ref="stroke"></div>
  <div id="cursor" ref="cursor">
    <div v-if="this.$data.dotCursor" id="cursor-dot" ref="cursorDot" :style="{width: `${this.cursor.size}px`, height: `${this.cursor.size}px`}"></div>
    <div v-if="this.$data.imageCursor" id="cursor-bg" :style="{ backgroundImage: 'url(' + this.cursorImage + ')' }"></div>
    <div v-if="this.$data.sayHi" class="message">Hi I'm Mauvin</div>
  </div>
</div>
</template>
<script>
/*
Element

Select elements by using data-cursor-hover
Providing an background image for cursor  :data-img="item.img"
Change size of cursor :data-size="item.size"
Giving Proxy Distance :data-distance="item.distance"
Hypotenuse is the distance between center of element and cursor
InProxy Attbutes will be set to true if the elements is in distance givin

initial Mount

Select Body & add mouseMove Listener
Select Elements
Add mouseEnter & mouseLeave Listener to elements
Fire startCursor Function

Style

Element has [inproxy='true'] when cursor position is in proxy distance
*/
import {
  TweenMax,
  Elastic
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
      sayHi: true,
      showMagnetProxy: true,
      showCursorsProxyNum: true,
      dotCursor: true,
      mauvin: {
        speed: 0.2,
        color: 'blue',
        size: 10,
        defualtSize: 30,
      },
      strokeCursor: true,
      stroke: {
        speed: 0.4,
        size: 25,
        borderColor: 'red',
        borderStyle: 'dotted',
        borderWidth: 1
      },
      magnet: {
        speed: 0.2,
      },
      imageCursor: false,
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
      return parseInt(this.$data.stroke.borderWidth)
    },
    mCoords() {
      return [this.coords[0], this.coords[1]];
    },
    activate() {
      return this.$store.state.mouseStatus.active;
    },
    classes() {
      return {
        'cursor-hover': this.activate,
      };
    },
    elm() {
      return this.$store.state.mouseStatus.elm
    },
    cursor() {
      return {
        size: parseInt(this.$data.mauvin.size)
      };
    },
    cursorImage() {
      return this.$store.state.mouseStatus.cursorImage;
    }
  },
  watch: {
    elm() {},
    activate() {},
    mCoords() {
      this.$data.elmsData.forEach((elm, i, arr) => {
        /// Updates List of Elements object of data
        this.disperseMouseData(i, arr, elm.node);
      });
    }
  },
  methods: {
    middleCircle(elm) {
      let top = elm.getBoundingClientRect().top + (elm.getBoundingClientRect().height / 2);
      let left = elm.getBoundingClientRect().right - (elm.getBoundingClientRect().width / 2);
      let center = (position, mouse) => (1 - 0.1) * position + 0.1 * mouse;
      let x = center(left, this.mCoords[0]);
      let y = center(top, this.mCoords[1]);
      return {
        x: x,
        y: y
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
    onMouseMove(e) {
      this.$data.coords = [e.clientX, e.clientY];
      this.$store.commit('mouseStatus/updateCoords', [e.clientX, e.clientY]);
    },
    onMouseEnter(e) {
      this.$store.commit('mouseStatus/elm', e.target);
      this.$store.commit('mouseStatus/activate', true);
      this.$data.mauvin.size = (e.target.dataset.mauvinsexpandingsize) ? e.target.dataset.mauvinsexpandingsize : this.$data.mauvin.size
      if (this.$data.imageCursor) this.$store.commit('mouseStatus/addImages', e.target.dataset.mauvinbackgroundimage);
    },
    onMouseLeave(e) {
      this.$store.commit('mouseStatus/elm', '');
      this.$store.commit('mouseStatus/deactivate', false);
      if (this.$data.imageCursor) this.$store.commit('mouseStatus/addImages', '/img/default.jpg');
      this.$data.mauvin.size = this.$data.mauvin.defualtSize;
    },
    lerp(start, end, amt) {
      return (1 - amt) * start + amt * end
    },
    hypotenuse(elm) {
      let element = elm.getBoundingClientRect();
      let distance = {
        x: (element.left + element.width / 2) - this.mCoords[0],
        y: (element.top + element.height / 2) - this.mCoords[1]
      };
      return Math.sqrt(distance.x * distance.x + distance.y * distance.y);
    },
    angle(elm) {
      let element = elm.getBoundingClientRect();
      let distance = {
        x: (element.left + element.width / 2) - this.mCoords[0],
        y: (element.top + element.height / 2) - this.mCoords[1]
      };
      return Math.atan2(distance.x, distance.y)
    },
    setAttributes(el, attrs) {
      Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
    },
    showMauveLocation() {
      if (document.querySelectorAll('.hypotenuse').length !== this.$data.elms.length) {
        this.$data.elms.forEach((elm, i) => {
          let cursorProxyData = document.createElement("div");
          cursorProxyData.className = 'hypotenuse';
          cursorProxyData.innerHTML = Math.round(elm.dataset.hypotenuse);
          elm.appendChild(cursorProxyData);
        })
      }
    },
    createMagnetProxy(elm) {
      if (document.querySelectorAll('.magnetic-size').length !== this.$data.elms.length) {
        elm.forEach((elm) => {
          if (elm.dataset.mauvinsemitsdistances !== undefined) {
            let magnetSize = document.createElement("div");
            magnetSize.className = 'magnetic-size';
            magnetSize.style.height = `${this.getMangetProxy(elm, elm.getBoundingClientRect().width, elm.getBoundingClientRect().height)}px`;
            magnetSize.style.width = `${this.getMangetProxy(elm, elm.getBoundingClientRect().width, elm.getBoundingClientRect().height)}px`;
            elm.appendChild(magnetSize);
          }
        });
      }
    },
    updateMangetProxy(elm) {
      elm.forEach((elm) => {
        elm.querySelector('.magnetic-size').style.height = `${this.getMangetProxy(elm,elm.getBoundingClientRect().width, elm.getBoundingClientRect().height)}px`;
        elm.querySelector('.magnetic-size').style.width = `${this.getMangetProxy(elm,elm.getBoundingClientRect().width, elm.getBoundingClientRect().height)}px`;
      })
    },
    getMangetProxy(elm, width, height) {
      let distance;
      if (elm.dataset.mauvinsemitsdistances) {
        distance = elm.dataset.mauvinsemitsdistances * 2;
      } else if (distance === undefined) {
        distance = (height < width) ? width : height;
        distance = distance / 33;
      }
      return distance;
    },
    startMauvin() {
      this.$data.RunMauvin = () => {
        // Mauvin
        TweenMax.to(this.$refs.cursor, this.$data.mauvin.speed, {
          x: this.mCoords[0] - (this.cursor.size / 2),
          y: this.mCoords[1] - (this.cursor.size / 2),
          width: this.cursor.size,
          height: this.cursor.size,
        });
        // Mauvin's Border Stroke
        if (this.$data.strokeCursor) {
          let size = this.stroke.size + (this.cursor.size);
          TweenMax.to(this.$refs.stroke, this.$data.stroke.speed, {
            y: (this.mCoords[1] - (size / 2)),
            x: (this.mCoords[0] - (size / 2)),
            width: size,
            height: size,
          });
        }

        // console.log(this.stroke.size, this.cursor.size)
        if (this.$data.elms.length > 0) {
          // If element is in proxy and hovered over
          if (!this.$data.effectAllElementsInArea) {
            // Grab closest element
            let closestToCursor = this.closestToCursor(this.$data.elms);

            this.$data.elms.forEach((elm) => {
              if (closestToCursor.elm === elm && elm.dataset.inproxy === "true") {
                TweenMax.to(elm.querySelector('[data-magnet]'), this.$data.magnet.speed, {
                  x: -((Math.sin(this.angle(elm)) * this.hypotenuse(elm)) / 2),
                  y: -((Math.cos(this.angle(elm)) * this.hypotenuse(elm)) / 2),
                });
              } else {
                TweenMax.to(elm.querySelector('[data-magnet]'), this.$data.magnet.speed, {
                  x: 0,
                  y: 0,
                });
              }
            });
          } else {
            this.$data.elms.forEach((elm) => {
              if (elm.dataset.inproxy === "true") {
                TweenMax.to(elm.querySelector('[data-magnet]'), this.$data.magnet.speed, {
                  x: -((Math.sin(this.angle(elm)) * this.hypotenuse(elm)) / 2),
                  y: -((Math.cos(this.angle(elm)) * this.hypotenuse(elm)) / 2),
                });
              } else {
                TweenMax.to(elm.querySelector('[data-magnet]'), this.$data.magnet.speed, {
                  x: 0,
                  y: 0,
                });
              }
            });
          }
        }
        this.$data.raf = requestAnimationFrame(this.$data.RunMauvin);
      }
      this.$data.RunMauvin();
    },
  },
  mounted: function() {
    if (!this.touchevents) {
      // Stroke Mouse Listener
      document.querySelector('body').addEventListener('mousemove', (e) => this.onMouseMove(e));
      if (this.$data.sayHi) {
        TweenMax.to('.message', 0.2, {
          opacity: 1,
          scale: 1,
        });
        setTimeout(() => {
          TweenMax.to('.message', 0.2, {
            opacity: 0,
            scale: 0.3,
          });
        }, 2500)
      }



      this.$refs.cursorDot.style.setProperty('--color', this.$data.mauvin.color);

      if (this.$data.strokeCursor) {
        this.$refs.stroke.style.setProperty('--style', this.$data.stroke.borderStyle);
        this.$refs.stroke.style.setProperty('--color', this.$data.stroke.borderColor);
        this.$refs.stroke.style.setProperty('--stroke', this.$data.stroke.borderWidth + "px");
        this.$refs.stroke.style.setProperty('--height', this.$data.stroke.size + "px");
        this.$refs.stroke.style.setProperty('--width', this.$data.stroke.size + "px");
      }

      // Grab Elements
      this.$data.elms = [...document.querySelectorAll('[data-mauvin-hover]')];

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
        if (this.$data.showCursorsProxyNum) this.showMauveLocation();
        // Developer helper tool
        if (this.$data.showMagnetProxy) {
          window.addEventListener('resize', () => this.updateMangetProxy(this.$data.elms));
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
    if (this.$data.showMagnetProxy) window.removeEventListener('resize', this.updateMangetProxy(this.$data.elms));
    // Remove RAF
    cancelAnimationFrame(this.$data.raf);
  }
};
</script>

<style lang="scss">
$size: 10px;

*,
body,
html {
    cursor: none;
}
#cursor-container {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    pointer-events: none;
    top: 0;
    left: 0;

    // Js Vue Classes
    &.cursor-hover {
        height: $size + 10;
        width: $size + 10;
    }

    #cursor {
        position: absolute;
        #cursor-dot {
            position: absolute;
            width: 100%;
            height: 100%;
            margin: auto;
            border-radius: 50%;
            background-color: var(--color);
        }
        /// Image Cursor image
        #cursor-bg {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-repeat: none;
            background-size: cover;
        }
    }

    #stroke {
        position: absolute;
        width: var(--width);
        height: var(--height);
        border: var(--stroke) var(--style) var(--color);
        border-radius: 50%;
    }
}
//Developer Tool
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
//Developer Tool
.hypotenuse {
    position: absolute;
    top: 0;
    left: 0;
    padding: 5px 10px;
    background-color: var(--color);
    pointer-events: none;
}

/// Attributes in proxy
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

.message {
    font-size: 10px;
    position: absolute;
    box-shadow: 0 0 5px 1px #1c1c1c26;
    background-color: black;
    color: White;
    padding: 3px 5px;
    top: -20px;
    left: 20px;
    width: 80px;
    text-align: center;
    border-radius: 8px;
    opacity: 0;
    transform-origin: top left;
    z-index: 999999;
}
</style>
