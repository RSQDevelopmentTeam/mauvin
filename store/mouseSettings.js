export const state = () => ({
  dotCursor: true,
  mauvin: {
    speed: 0.2,
    color: 'blue',
    size: 10,
    borderRaidus: '50%',
  },
  strokeCursor: false,
  stroke: {
    speed: 0.4,
    size: 25,
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRaidus: '50%',
  },
});

export const mutations = {
  cursorColor (state, val) {
    state.mauvin.color = val;
  },
  cursorSize (state, val) {
    state.mauvin.size = val;
  },
  speed (state, val) {
    state.speed = val;
  },
  strokeCursor (state, val) {
    state.strokeCursor = !state.strokeCursor;
  },
  strokeCursorColor (state, val) {
    state.stroke.borderColor = val;
  },
  strokeCursorSize (state, val) {
    state.stroke.size = val;
  },
};
