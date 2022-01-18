export const state = () => ({
  touchevents: false,
  viewportHeight: 0,
  fromServer: true,
  scrollPos: 0,
});

export const mutations = {
  setTouchEvents(state, val) {
    state.touchevents = val;
  },
  setViewportHeight(state, val) {
    state.viewportHeight = val;
  },
  setFromServer(state, val) {
    state.fromServer = val;
  },
  updateScrollPos (state, val) {
    state.scrollPos = val;
  }
}
