<template>
<div id="mauvin-container" :class="classes">
  <div v-if="this.$data.strokeCursor" id="mauvin-stroke" ref="mauvinStroke"></div>
  <div id="mauvin" ref="mauvinCursor">
    <div v-if="this.$data.dotCursor" id="mauvin-color" ref="mauvinColor"></div>
    <div v-if="this.$data.imageCursor" id="mauvin-image" ref="mauvinImage" :style="{ backgroundImage: 'url(' + this.$data.image.src + ')' }"></div>
    <div v-if="this.$data.sayHi" class="mauvin-message">Hi I'm Mauvin</div>
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
        content: null,
        borderRaidus: '50%',
      },
      strokeCursor: true,
      stroke: {
        speed: 0.4,
        size: 25,
        borderColor: 'red',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRaidus: '50%',
      },
      magnet: {
        speed: 0.2,
      },
      imageCursor: true,
      image: {
        src: '/img/default.jpg',
        borderRaidus: '50%'
      },
      floatCursor: false,
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
    floatUp() {
      let size = Math.random() * 20;
      let circle = document.createElement('div');
      circle.className = 'floatUp'
      circle.style.left = this.mCoords[0] + "px";
      circle.style.top = this.mCoords[1] + "px";
      circle.style.width = 10 + size + "px";
      circle.style.height = 10 + size + "px";
      document.querySelector('body').appendChild(circle);
      setTimeout(function() {
        circle.remove();
      }, 2000);
    },
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
    createStroke() {
      let size = this.stroke.size + (this.cursor.size);
      TweenMax.to(this.$refs.mauvinStroke, this.$data.stroke.speed, {
        y: (this.mCoords[1] - (size / 2)),
        x: (this.mCoords[0] - (size / 2)),
        width: size,
        height: size,
      });
    },
    onMouseEnter(e) {
      this.$store.commit('mouseStatus/elm', e.target);
      this.$store.commit('mouseStatus/activate', true);
      this.$data.mauvin.size = (e.target.dataset.mauvinsexpandingsize) ? e.target.dataset.mauvinsexpandingsize : this.$data.mauvin.size
      if (this.$data.imageCursor) this.$data.image.src = e.target.dataset.mauvincontent;
    },
    onMouseLeave(e) {
      this.$store.commit('mouseStatus/elm', '');
      this.$store.commit('mouseStatus/deactivate', false);
      if (this.$data.imageCursor) this.$data.image.src = '/img/default.jpg';
      this.$data.mauvin.size = this.$data.mauvin.defualtSize;
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
    showMauvinLocation() {
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
    sayHello() {
      if (this.$data.sayHi) {
        TweenMax.to('.mauvin-message', 0.2, {
          opacity: 1,
          scale: 1,
        });
        setTimeout(() => {
          TweenMax.to('.mauvin-message', 0.2, {
            opacity: 0,
            scale: 0.3,
          });
        }, 2500)
      }
    },
    startMauvin() {
      this.$data.RunMauvin = () => {

        // this.middleCircle(elm)
        // Mauvin
        TweenMax.to(this.$refs.mauvinCursor, this.$data.mauvin.speed, {
          x: this.mCoords[0] - (this.cursor.size / 2),
          y: this.mCoords[1] - (this.cursor.size / 2),
          width: this.cursor.size,
          height: this.cursor.size,
        });
        // Mauvin's Border Stroke
        if (this.$data.strokeCursor) this.createStroke()

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

        if (this.$data.floatCursor) this.floatUp();

        this.$data.raf = requestAnimationFrame(this.$data.RunMauvin);
      }
      this.$data.RunMauvin();
    },
  },
  mounted: function() {
    if (!this.touchevents) {
      let mauvin = this.$refs.mauvinCursor
      let mauvinStroke = this.$refs.mauvinStroke;
      let mauvinImage = this.$refs.mauvinImage;
      // Stroke Mouse Listener
      document.querySelector('body').addEventListener('mousemove', (e) => this.onMouseMove(e));
      // Setting Style Options On Mauvin
      mauvin.style.setProperty('--color', this.$data.mauvin.color);
      mauvin.style.setProperty('--mauvinRadius', this.$data.mauvin.borderRaidus);
      // Setting Style Options On Mauvin's Stroke Border

      if (this.$data.strokeCursor) {
        mauvinStroke.style.setProperty('--style', this.$data.stroke.borderStyle);
        mauvinStroke.style.setProperty('--color', this.$data.stroke.borderColor);
        mauvinStroke.style.setProperty('--stroke', this.$data.stroke.borderWidth + "px");
        mauvinStroke.style.setProperty('--mauvinStrokeRadius', this.$data.stroke.borderRaidus);
        mauvinStroke.style.setProperty('--height', this.$data.stroke.size + "px");
        mauvinStroke.style.setProperty('--width', this.$data.stroke.size + "px");
      }
      // Setting Style Options On Mauvin's Image
      if (this.$data.imageCursor) {
        mauvinImage.style.setProperty('--mauvinImageRadius', this.$data.image.borderRaidus);
      }
      // Grab Elements
      this.$data.elms = [...document.querySelectorAll('[data-mauvin-hover]')];
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
        if (this.$data.showCursorsProxyNum) this.showMauvinLocation();
        // Developer helper tool
        if (this.$data.showMagnetProxy) {
          window.addEventListener('resize', () => this.updateMangetProxy(this.$data.elms));
          this.createMagnetProxy(this.$data.elms);
        }
      }

      // Start Cursor
      this.startMauvin();

      //introduction
      this.sayHello();
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
body {
    cursor: none;
}
#mauvin-container {
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
        width: var(--width);
        height: var(--height);
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
    background-color: var(--color);
    pointer-events: none;
    font-size: 16px;
}

.floatUp {
    position: absolute;
    height: 10px;
    width: 10px;
    border-radius: 50px;
    pointer-events: none;
    background: red;
    transform: translate(-50%, -50%);
    animation: blow 40s linear infinite;
}

@keyframes blow {
    0% {
        transform: translate(-50%, -50%);
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -1000%);
        opacity: 0;
    }
}

// Hello Message
.mauvin-message {
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
