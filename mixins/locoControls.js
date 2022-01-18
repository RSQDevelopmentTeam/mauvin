export default {
  data () {
    return {
      scroll: null
    };
  },

  destroyed: function () {
    this.$data.scroll.destroy();
  },

  methods: {
    locomotiveScrollInit () {
      this.$data.scroll = new this.$LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        smartphone: {
          smooth: true,
          direction: 'vertical',
          multiplier: 9
        },
        tablet: {
          smooth: true,
          direction: 'vertical',
          multiplier: 9
        }
      });

      this.$data.scroll.on('scroll', (args) => {
        this.$store.commit('global/updateScrollPos', args.scroll.y);
      });
    }
  }
};
