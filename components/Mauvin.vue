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
      moving: false,
      movingActionTime: {},
      stopMovingActionTime: 250,
      elms: [],
      elmsData: [],
      magnetElms: [],
      sayHi: false,
      showMagnetProxy: false,
      showCursorsProxyNum: false,
      dotCursor: true,
      mauvin: {
        speed: 0.2,
        color: 'blue',
        size: 10,
        defualtSize: 30,
        content: null,
        borderRaidus: '50%',
        oldX: 0,
        oldY: 0,
        direction: {
          y: '',
          x: ''
        }
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
    gooey() {
      let o = document.querySelector('.box').getBoundingClientRect();
      TweenMax.to('.dot', this.$data.magnet.speed, {
        x: this.mCoords[0],
        y: this.mCoords[1],
      });
    },
    eyesFollow() {
      const eye1 = document.querySelector('#mauvin-left #mauvin-eye');
      const eye2 = document.querySelector('#mauvin-right #mauvin-eye');
      window.addEventListener('mousemove', (evt) => {
        const x = -(window.innerWidth / 2 - evt.pageX) / 120;
        const y = -(window.innerHeight / 2 - evt.pageY) / 50;
        eye1.style.transform = `translateY(${y}px) translateX(${x}px)`;
        eye2.style.transform = `translateY(${y}px) translateX(${x}px)`;
      });
    },
    detectMouseMovement() {
      this.$data.moving = true;
      clearTimeout(this.$data.movingActionTime);
      this.$data.movingActionTime = setTimeout(() => {
        this.$data.moving = false;
        this.$data.direction = '';
      }, this.$data.stopMovingActionTime);
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
      this.detectMouseMovement();
      this.mauvinDirection();
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
    createStroke() {
      if (this.$data.strokeCursor) {
        let size = this.stroke.size + (this.cursor.size);
        TweenMax.to(this.$refs.mauvinStroke, this.$data.stroke.speed, {
          y: (this.mCoords[1] - (size / 2)),
          x: (this.mCoords[0] - (size / 2)),
          width: size,
          height: size,
        });
      }
    },
    mauvinDirection() {
      if (this.mCoords[1] < this.$data.mauvin.oldY) {
        this.$data.mauvin.direction.y = "up"
      } else if (this.mCoords[1] > this.$data.mauvin.oldY) {
        this.$data.mauvin.direction.y = "down"
      }
      this.$data.mauvin.oldY = this.mCoords[1];

      if (this.mCoords[0] < this.$data.mauvin.oldX) {
        this.$data.mauvin.direction.x = "left"
      } else if (this.mCoords[0] > this.$data.mauvin.oldX) {
        this.$data.mauvin.direction.x = "right"
      }
      this.$data.mauvin.oldX = this.mCoords[0];
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
    updateMagnetProxy(elm) {
      elm.forEach((elm) => {
        elm.querySelector('.magnetic-size').style.height = `${this.getMagnetProxy(elm,elm.getBoundingClientRect().width, elm.getBoundingClientRect().height)}px`;
        elm.querySelector('.magnetic-size').style.width = `${this.getMagnetProxy(elm,elm.getBoundingClientRect().width, elm.getBoundingClientRect().height)}px`;
      })
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
    settingMauvinStyle() {
      const mauvin = this.$refs.mauvinCursor
      const mauvinStroke = this.$refs.mauvinStroke;
      const mauvinImage = this.$refs.mauvinImage;
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
    },
    mauvinTween() {
      TweenMax.to(this.$refs.mauvinCursor, this.$data.mauvin.speed, {
        x: this.mCoords[0] - (this.cursor.size / 2),
        y: this.mCoords[1] - (this.cursor.size / 2),
        width: this.cursor.size,
        height: this.cursor.size,
      });
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
        // if (this.$data.moving) {
        //   if (this.$data.mauvin.direction.x === 'right') {
        //     TweenMax.to('#mauvin-person', 2, {
        //       x: 30,
        //       y: 0,
        //       rotation: 12,
        //     });
        //     TweenMax.to('#mauvin-left #mauvin-eye', 1, {
        //       x: 320,
        //     });
        //     TweenMax.to('#mauvin-right #mauvin-eye', 1, {
        //       x: 320,
        //     });
        //   } else if (this.$data.mauvin.direction.x === 'left') {
        //     TweenMax.to('#mauvin-person', 2, {
        //       x: -30,
        //       y: 0,
        //       rotation: -22,
        //     });
        //     TweenMax.to('#mauvin-left #mauvin-eye', 1, {
        //       x: -320,
        //     });
        //     TweenMax.to('#mauvin-right #mauvin-eye', 1, {
        //       x: -320,
        //     });
        //   }
        //   document.querySelector('#moving-action').classList.add('move');
        // } else {
        //   TweenMax.to('#mauvin-person', 2, {
        //     x: 0,
        //     y: 0,
        //     rotation: 0,
        //   });
        //   document.querySelector('#moving-action').classList.remove('move');
        // }

        TweenMax.to('.inside', this.$data.mauvin.speed, {
          x: -(this.mCoords[0] - (this.cursor.size / 2)),
          y: -(this.mCoords[1] - (this.cursor.size / 2)),
        });

        this.mauvinTween();
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
    if (this.$data.showMagnetProxy) window.removeEventListener('resize', this.updateMagnetProxy(this.$data.elms));
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
    background-color: red;
    color: white;
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
