export const state = () => ({
  coords: [-30, -30],
  elm: {
    data: {}
  },
  elms: [],
  elmsData: [],
  devElements: [],
  effectAllElementsInArea: true,
  showCursorsProxyNum: true,
  mauvin: {
    activate: false,
    closestElement: {},
    moving: false,
    clearMovingActionTime: {},
    speed: 0.2,
    settlingDown: 250,
    color: '#FFE433',
    size: 10,
    borderRaidus: '50%',
    oldX: 0,
    oldY: 0,
    direction: {
      y: '',
      x: ''
    },
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
  magnetElms: [],
  magnet: {
    speed: 0.2,
    showMagnetProxy: false,
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
    state.mauvin.clearMovingActionTime = val;
  },
  cursorMoving (state, val) {
    state.mauvin.moving = val;
  },
  activate (state, val) {
    state.mauvin.activate = val;
  },
  deactivate (state, val) {
    state.mauvin.activate = val;
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
  closestElement(state,val) {
    state.mauvin.closestElement = val;
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
  elmData (state, val) {
    state.elm.data = val;
  },
  showTrigger (state, val) {
    state.showCursorsProxyNum = val;
  },
};
