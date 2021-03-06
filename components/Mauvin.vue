<template>
<div id="mauvin-container" :class="classes">
  <div v-if="this.$store.state.mauvinSettings.stroke.activate" id="mauvin-stroke" ref="mauvinStroke"></div>
  <div id="mauvin" ref="mauvinCursor">
    <svg v-if="this.$store.state.mauvinSettings.progress.active" id="mauvin-progress" :height="size" :width="size">
      <circle :r="halfSize" cx="50%" cy="50%" fill="transparent" :stroke="color" :stroke-dasharray="this.$store.state.mauvinSettings.progress.dasharray" :stroke-dashoffset="scroll"></circle>
    </svg>
    <div id="mauvin-color" ref="mauvinColor"></div>
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
      RunMauvin: null,
      raf: null,
      wH: 0,
      bodyH: 0
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
      return parseInt(this.$store.state.mauvinSettings.stroke.borderWidth)
    },
    classes() {
      return {
        'cursor-hover': this.activate,
      };
    },
    halfSize() {
      return `${(Math.round(this.$store.state.mauvinSettings.mauvin.size) + 9)/2}px`
    },
    color() {
      return this.$store.state.mauvinSettings.progress.color;
    },
    strokeCursor() {
      return this.$store.state.mauvinSettings.stroke.activate;
    },
    elm() {
      return this.$store.state.mauvinSettings.elm
    },
    activate() {
      return this.$store.state.mauvinSettings.active;
    },
    size() {
      return `${Math.round(this.$store.state.mauvinSettings.mauvin.size) + 10}px`
    },
    scroll() {
      return (this.$store.state.global.scrollPos / (this.$data.bodyHeight - this.$data.wH)) * this.$store.state.mauvinSettings.progress.progressEndNum;
    },
    coordinates() {
      this.$store.commit('mauvinSettings/updateCoords', [this.$store.state.mauvinSettings.coords[0], this.$store.state.mauvinSettings.coords[1]]);
      return [this.$store.state.mauvinSettings.coords[0], this.$store.state.mauvinSettings.coords[1]];
    },
  },
  watch: {
    color() {
      return this.$store.state.mauvinSettings.progress.color;
    },
    strokeCursor() {
      this.settingMauvinsStrokeStyle();
      return this.$store.state.mauvinSettings.stroke.activate;
    },
    elm() {},
    activate() {},
    size() {
      return this.$store.state.mauvinSettings.mauvin.size;
    },
    scroll() {
      return this.$store.state.global.scrollPos;
    },
    coordinates() {
      this.$store.state.mauvinSettings.elmsData.forEach((elm, i, arr) => {
        /// Updates List of Elements object of data
        this.disperseMouseData(i, arr, elm.node);
      });
    }
  },
  methods: {
    setAttributes(el, attrs) {
      Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
    },
    pythagoreanTheorem(elm) {
      let element = elm.getBoundingClientRect();
      let distance = {
        x: (element.left + element.width / 2) - this.coordinates[0],
        y: (element.top + element.height / 2) - this.coordinates[1]
      };
      return Math.sqrt(distance.x * distance.x + distance.y * distance.y).toFixed(0);
    },
    angle(elm) {
      let element = elm.getBoundingClientRect();
      let distance = {
        x: (element.left + element.width / 2) - this.coordinates[0],
        y: (element.top + element.height / 2) - this.coordinates[1]
      };
      return Math.atan2(distance.x, distance.y)
    },

    disperseMouseData(i, arr, elm) {
      // Apply Data to element
      this.setAttributes(elm, {
        'data-mauvin-pythagoreanTheorem': this.pythagoreanTheorem(elm),
        'data-mauvin-index': i,
        'data-mauvin-inProxy': (elm.dataset.emitdistance !== undefined) ? parseInt(this.pythagoreanTheorem(elm)) <= parseInt(elm.dataset.emitdistance) : 'proxyoff'
      });
      //Developer Tool
      if (this.$store.state.mauvinSettings.showCursorsProxyNum && elm.querySelector('.pythagoreantheorem')) {
        elm.querySelector('.pythagoreantheorem').innerHTML = Math.round(elm.dataset.mauvinPythagoreantheorem);
      }
    },

    settingMauvinsStrokeStyle() {
      // Setting Style Options On Mauvin's Stroke Border
      if (this.$store.state.mauvinSettings.stroke.activate) {
        setTimeout(() => {
          const mauvinStroke = document.querySelector('#mauvin-stroke');
          mauvinStroke.style.setProperty('--style', this.$store.state.mauvinSettings.stroke.borderStyle);
          mauvinStroke.style.setProperty('--color', this.$store.state.mauvinSettings.stroke.color);
          mauvinStroke.style.setProperty('--stroke', this.$store.state.mauvinSettings.stroke.borderWidth + "px");
          mauvinStroke.style.setProperty('--mauvinStrokeRadius', this.$store.state.mauvinSettings.stroke.borderRaidus);
          document.querySelector('#mauvin-stroke-real').style.setProperty('--color', this.$store.state.mauvinSettings.stroke.color);
        }, 1)
      }
    },
    settingMauvinStyle() {
      const mauvin = this.$refs.mauvinCursor
      // Setting Style Options On Mauvin
      mauvin.style.setProperty('--color', this.$store.state.mauvinSettings.mauvin.color);
      mauvin.style.setProperty('--mauvinRadius', this.$store.state.mauvinSettings.mauvin.borderRaidus);
      mauvin.style.setProperty('--width', this.$store.state.mauvinSettings.mauvin.size);

      this.settingMauvinsStrokeStyle();
    },

    onMouseMove(e) {
      this.$store.commit('mauvinSettings/updateCoords', [e.clientX, e.clientY]);
      this.mauvinMovement()
    },
    onMouseEnter(e) {
      this.$store.commit('mauvinSettings/elmData', e.target.dataset);
      this.$store.commit('mauvinSettings/activate', true);
    },
    onMouseLeave(e) {
      this.$store.commit('mauvinSettings/elmData', '');
      this.$store.commit('mauvinSettings/deactivate', false);
    },

    progressScale(e) {
      this.$data.bodyHeight = document.querySelector('body').offsetHeight
      this.$data.wH = window.innerHeight;
    },

    getMagnetProxy(elm, width, height) {
      let distance;
      if (elm.dataset.emitdistance) {
        distance = elm.dataset.emitdistance * 2;
      } else if (distance === undefined) {
        distance = (height < width) ? width : height;
        distance = distance / 33;
      }
      return distance;
    },

    magnetTween(elm) {
      if (elm.querySelectorAll('.meg').length > 0) {
        TweenMax.to(elm.querySelector('.meg'), this.$store.state.mauvinSettings.magnet.speed, {
          x: -((Math.sin(this.angle(elm)) * this.pythagoreanTheorem(elm)) / 2),
          y: -((Math.cos(this.angle(elm)) * this.pythagoreanTheorem(elm)) / 2),
        });
      }

    },
    magnetTweenReset(elm) {
      if (elm.querySelectorAll('.meg').length > 0) {
        TweenMax.to(elm.querySelector('.meg'), this.$store.state.mauvinSettings.magnet.speed, {
          x: 0,
          y: 0,
        });
      }
    },

    closestToMauvin(elms) {
      let holdProxyNums = [];
      this.$store.state.mauvinSettings.magnetElms.forEach((item) => {
        this.setAttributes(item, {
          'closest-to-mauvin': false,
        });
        holdProxyNums.push({
          distance: parseInt(item.dataset.mauvinPythagoreantheorem), /// Must parse number floating causes issues
          index: item.dataset.index,
          elm: item
        });
      });

      let c = holdProxyNums.reduce((prev, curr) => prev.distance < curr.distance ? prev : curr);
      this.setAttributes(c.elm, {
        'closest-to-mauvin': true,
      });
      this.$store.commit('mauvinSettings/closestElement', c);
    },

    magnetize() {
      this.$store.state.mauvinSettings.magnetElms.forEach((elm) => {
        if (this.$store.state.mauvinSettings.effectAllElementsInArea && this.$store.state.mauvinSettings.magnetElms.length >= 2) {
          this.closestToMauvin()
          // console.log(elm.dataset)
          if (elm.dataset.mauvinInproxy === "true") {
            this.magnetTween(elm);
          } else {
            this.magnetTweenReset(elm);
          }
        }
      });
    },

    mauvinTween() {
      TweenMax.to(this.$refs.mauvinCursor, this.$store.state.mauvinSettings.mauvin.speed, {
        x: this.coordinates[0] - (this.$store.state.mauvinSettings.mauvin.size / 2),
        y: this.coordinates[1] - (this.$store.state.mauvinSettings.mauvin.size / 2),
        width: this.$store.state.mauvinSettings.mauvin.size,
        height: this.$store.state.mauvinSettings.mauvin.size,
      });
    },
    mauvinMovement() {
      this.$store.commit('mauvinSettings/cursorMoving', true);
      clearTimeout(this.$store.state.mauvinSettings.mauvin.clearMovingActionTime);
      this.$store.commit('mauvinSettings/addMovment', setTimeout(() => {
        this.$store.commit('mauvinSettings/cursorMoving', false);
        this.$store.commit('mauvinSettings/cursorDirectionX', 'center');
        this.$store.commit('mauvinSettings/cursorDirectionY', 'center');
      }, this.$store.state.mauvinSettings.mauvin.settlingDown));
    },
    mauvinDirection() {
      if (this.coordinates[1] < this.$store.state.mauvinSettings.mauvin.oldY) {
        this.$store.commit('mauvinSettings/cursorDirectionY', 'up');
      } else if (this.coordinates[1] > this.$store.state.mauvinSettings.mauvin.oldY) {
        this.$store.commit('mauvinSettings/cursorDirectionY', 'down');
      }
      this.$store.commit('mauvinSettings/oldCoordsY', this.coordinates[1]);

      if (this.coordinates[0] < this.$store.state.mauvinSettings.mauvin.oldX) {
        this.$store.commit('mauvinSettings/cursorDirectionX', 'left');
      } else if (this.coordinates[0] > this.$store.state.mauvinSettings.mauvin.oldX) {
        this.$store.commit('mauvinSettings/cursorDirectionX', 'right');
      }
      this.$store.commit('mauvinSettings/oldCoordsX', this.coordinates[0]);
    },

    // Mauvin Moving
    createStrokeMauvin() {
      if (this.$store.state.mauvinSettings.stroke.activate) {
        let size = this.$store.state.mauvinSettings.stroke.size + (this.$store.state.mauvinSettings.mauvin.size);
        TweenMax.to(this.$refs.mauvinStroke, this.$store.state.mauvinSettings.stroke.speed, {
          y: (this.coordinates[1] - (size / 2)),
          x: (this.coordinates[0] - (size / 2)),
          width: size,
          height: size,
        });
      }
    },
    startMauvin() {
      this.$data.RunMauvin = () => {
        this.mauvinCharacter();

        this.mauvinTween();
        this.mauvinDirection();

        this.createStrokeMauvin();

        this.magnetize();
        this.$data.raf = requestAnimationFrame(this.$data.RunMauvin);
      }
      this.$data.RunMauvin();
    },

    // Developer Tool
    showMauvinsProxy() {
      if (this.$store.state.mauvinSettings.showCursorsProxyNum) {
        const filterOutNoneDev = this.$store.state.mauvinSettings.elms.filter(obj => {
          return obj.dataset.dev
        });
        filterOutNoneDev.forEach((elm, i) => {
          let cursorProxyData = document.createElement("div");
          cursorProxyData.className = 'pythagoreantheorem show';
          cursorProxyData.innerHTML = Math.round(elm.dataset.mauvinPythagoreantheorem);
          elm.appendChild(cursorProxyData);
        })
      }
    },
    createProxyTrigger(elmArr) {
      if (elmArr.length > 0) {
        const filterOutNoneDev = elmArr.filter(obj => {
          return obj.dataset.dev
        });
        filterOutNoneDev.forEach((elm) => {
          if (elm.dataset.emitdistance !== undefined) {
            let magnetSize = document.createElement("div");
            magnetSize.className = 'proxy-trigger';
            magnetSize.style.height = `${this.getMagnetProxy(elm, elm.getBoundingClientRect().width, elm.getBoundingClientRect().height)}px`;
            magnetSize.style.width = `${this.getMagnetProxy(elm, elm.getBoundingClientRect().width, elm.getBoundingClientRect().height)}px`;
            elm.appendChild(magnetSize);
          }
        });
      }
    },
    /// Delete
    mauvinCharacter() {
      if (this.$store.state.mauvinSettings.mauvin.activate) {
        TweenMax.to('#mauvin-left, #mauvin-right', 1, {
          scale: 1.5
        });
      } else {
        TweenMax.to('#mauvin-left, #mauvin-right', 1, {
          scale: 1
        });
      }

      if (this.$store.state.mauvinSettings.mauvin.moving) {
        if (this.$store.state.mauvinSettings.mauvin.direction.x === 'right') {
          TweenMax.to('#mauvin-person', 2, {
            x: 20,
            y: 0,
            rotation: 12,
          });
          TweenMax.to('#mauvin-left #mauvin-eye, #mauvin-right #mauvin-eye', 1, {
            x: 20,
          });
        }
        if (this.$store.state.mauvinSettings.mauvin.direction.x === 'left') {
          TweenMax.to('#mauvin-person', 2, {
            x: -20,
            rotation: -22,
          });
          TweenMax.to('#mauvin-left #mauvin-eye,#mauvin-right #mauvin-eye', 1, {
            x: -20,
          });
        }
        if (this.$store.state.mauvinSettings.mauvin.direction.y === 'up') {
          TweenMax.to('#mauvin-person', 2, {
            y: -50,
          });
          TweenMax.to('#mauvin-left #mauvin-eye, #mauvin-right #mauvin-eye', 1, {
            y: -20,
          });
        }
        if (this.$store.state.mauvinSettings.mauvin.direction.y === 'down') {
          TweenMax.to('#mauvin-person', 2, {
            y: -50,
            rotation: -22,
          });
          TweenMax.to('#mauvin-left #mauvin-eye, #mauvin-right #mauvin-eye', 1, {
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
      document.querySelector('#grid').style.setProperty('--bgy', `${-(this.coordinates[0] - (this.$store.state.mauvinSettings.mauvin.size / 2))}px`);
      document.querySelector('#grid').style.setProperty('--bgx', `${-(this.coordinates[1] - (this.$store.state.mauvinSettings.mauvin.size / 2))}px`);

      document.querySelectorAll('.magnetic-info').forEach((elm) => {
        elm.style.setProperty('--bgy', `${-(this.coordinates[0] - (this.$store.state.mauvinSettings.mauvin.size / 2))}px`);
      })

      document.querySelectorAll('.magnetic-info').forEach((elm) => {
        elm.style.setProperty('--bgx', `${-(this.coordinates[1] - (this.$store.state.mauvinSettings.mauvin.size / 2))}px`);
      });

      if (document.querySelector('#mauvin-person') < 0) {}
    },
  },
  mounted: function() {
    document.querySelector('body').style.cursor = "none";

    if (!this.touchevents) {
      // Stroke Mouse Listener
      document.querySelector('body').addEventListener('mousemove', (e) => this.onMouseMove(e));
      window.addEventListener('resize', (e) => this.progressScale(e));

      this.$data.bodyHeight = document.querySelector('body').offsetHeight
      this.$data.wH = window.innerHeight;
      // Setting Muavins Styles
      this.settingMauvinStyle();
      // Grab Elements
      this.$store.commit('mauvinSettings/addingElements', [...document.querySelectorAll('[data-mauvin-hover]')]);
      // Grab Magnet
      this.$store.commit('mauvinSettings/addingMagnetElements', [...document.querySelectorAll('[data-mauvin-magnet]')]);

      // let's Grab elements that are needed
      if (this.$store.state.mauvinSettings.elms.length > 0) {
        // Add Mouse Listeners to grab elements
        this.$store.state.mauvinSettings.elms.forEach((elm, i) => {
          elm.addEventListener('mouseenter', (e) => this.onMouseEnter(e));
          elm.addEventListener('mouseleave', (e) => this.onMouseLeave(e));
          // Form Data array about grab elements
          this.$store.commit('mauvinSettings/addingElementsData', {
            index: i,
            node: elm,
            data: elm.dataset,
          });
        });


        // Developer helper tool
        this.showMauvinsProxy();
        this.createProxyTrigger(this.$store.state.mauvinSettings.magnetElms);

      }
      // Start Cursor
      this.startMauvin();
    }
  },
  beforeDestroy: function() {
    document.querySelector('body').removeEventListener('mousemove', (e) => this.onMouseMove(e));
    this.$store.state.mauvinSettings.elms.forEach((elm, i) => {
      elm.removeEventListener('mouseout', this.onMouseLeave);
      elm.removeEventListener('mouseover', this.onMouseEnter);
    });
    if (this.$store.state.mauvinSettings.showMagnetProxy) window.removeEventListener('resize', this.updateMagnetProxy(this.$store.state.mauvinSettings.elms));
    // Remove RAF
    cancelAnimationFrame(this.$data.raf);
  }
};
</script>
<style lang="scss">
#mauvin-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    pointer-events: none;

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
    }

    #mauvin-stroke {
        position: absolute;
        will-change: transform;
        border: var(--stroke) var(--style) var(--color);
        border-radius: var(--mauvinStrokeRadius);
    }

    #mauvin-progress {
        position: absolute;
        left: -5px;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        display: flex;
        text-align: center;

    }
}

// .meg {
//     position: absolute;
//     margin: auto;
//     left: 0;
//     right: 0;
//     top: 0;
//     bottom: 0;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-wrap: nowrap;
//     align-content: center;
//     z-index: 33;
// }

// Attributes in proxy
[data-mauvin-inProxy='true'] {
    background-color: red;
}
[closest-to-mauvin='true'] {
    position: relative;
    &:after {
        content: 'Closest';
        position: absolute;
        right: 0;
        bottom: 0;
        color: black;
        font-size: 15px;
        padding: 4px 10px;
        background-color: beige;
        border-radius: 0 0 0 0;
        will-change: transform;
    }
}
@keyframes float {
    0% {
        box-shadow: 0 5px 15px 0 rgba(0,0,0,0.6);
        transform: translatey(0px);
    }
    50% {
        box-shadow: 0 25px 15px 0 rgba(0,0,0,0.2);
        transform: translatey(-6px);
    }
    100% {
        box-shadow: 0 5px 15px 0 rgba(0,0,0,0.6);
        transform: translatey(0px);
    }
}
// Developer Tool
.pythagoreantheorem {
    position: absolute;
    top: 0;
    left: 0;
    padding: 5px 10px;
    background-color: beige;
    color: black;
    pointer-events: none;
    font-size: 16px;
    display: none;
    &.show {
        display: block;
    }
    &:before {
        content: 'Distance';
        position: absolute;
        top: -30px;
        left: -89px;
        padding: 4px 10px;
        background-color: beige;
        border-radius: 15px 15px 0 15px;
        animation: float 9s ease-in-out infinite;
        will-change: transform;
    }
}

// Developer Tool
.proxy-trigger {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    z-index: 1;
    pointer-events: none;

    &:before {
        content: 'Trigger Proxy';
        position: absolute;
        top: 0;
        right: -112px;
        padding: 4px 10px;
        background-color: beige;
        border-radius: 15px 15px 15px 0;
        animation: float 9s ease-in-out infinite;
        will-change: transform;
    }

    &:after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        animation: proxy-trigger 20s infinite;
        border-radius: 50%;
        border: 1px dashed beige;
    }
}

@keyframes proxy-trigger {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
