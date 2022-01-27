export const state = () => ({
  dotCursor: true,
  mauvin: {
    moving: false,
    speed: 0.2,
    settlingDown: 250,
    color: 'red',
    size: 10,
    defualtSize: 30,
    borderRaidus: '50%',
    direction: {
      y: '',
      x: ''
    }
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
  cursorMoving (state, val) {
    state.mauvin.moving = val;
  },
  cursorSpeed (state, val) {
    state.mauvin.speed = val;
  },
  cursorSettlingDown (state, val) {
    state.mauvin.settlingDown = val;
  },
  cursorColor (state, val) {
    state.mauvin.color = val;
  },
  cursorSize (state, val) {
    state.mauvin.size = val;
  },
  cursorDirectionX (state, val) {
    state.mauvin.direction.x = val;
  },
  cursorDirectionY (state, val) {
    state.mauvin.direction.y = val;
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
