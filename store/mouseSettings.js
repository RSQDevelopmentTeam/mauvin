export const state = () => ({
  coords: [-30, -30],
  dotCursor: true,
  mauvin: {
    moving: false,
    movingActionTime: {},
    speed: 0.2,
    settlingDown: 250,
    color: 'green',
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
  stroke: {
    strokeCursor: true,
    speed: 0.4,
    size: 25,
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRaidus: '50%',
  },
  character: {
    size: 30
  }
});

export const mutations = {
  character(state, val) {
    state.character.size = val;
  },
  oldCoordsX(state, val) {
    state.mauvin.oldX = val;
  },
  oldCoordsY(state, val) {
    state.mauvin.oldY = val;
  },
  updateCoords (state, val) {
    state.coords = val;
  },
  addMovment(state, val) {
    state.mauvin.movingActionTime = val;
  },
  cursorMoving (state, val) {
    state.mauvin.moving = val;
  },
  settlingDown (state, val) {
    state.mauvin.settlingDown = val;
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
