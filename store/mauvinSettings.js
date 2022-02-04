export const state = () => ({
  coords: [-30, -30],
  dotCursor: true,
  elms: [],
  elmsData: [],
  magnetElms: [],
  magnet: {
    speed: 0.2,
    showMagnetProxy: false,
  },
  mauvin: {
    moving: false,
    movingActionTime: {},
    speed: 0.2,
    settlingDown: 250,
    color: '#FFE433',
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
    strokeCursor: false,
    speed: 0.4,
    size: 20,
    color: '#FFE433',
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
    state.stroke.strokeCursor = !state.stroke.strokeCursor;
  },
  strokeCursorColor (state, val) {
    state.stroke.color = val;
  },
  strokeCursorSize (state, val) {
    state.stroke.size = val;
  },
  addingElements(state, val) {
    state.elms = val;
  },
  addingElementsData(state, val) {
    state.elmsData.push(val);
  },
  addingMagnetElements(state, val) {
    state.magnetElms = val;
  },
};