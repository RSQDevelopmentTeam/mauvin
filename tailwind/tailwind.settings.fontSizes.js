/*
 * Tailwind Font Size Settings
 */

const settings = require('./tailwind.settings')
// const fsMin = settings.typography.fontSizeMin
// const fsMax = settings.typography.fontSizeMax
// const msFactorMin = settings.typography.msFactorMin
// const msFactorMax = settings.typography.msFactorMax
// const screenMin = settings.screensRem.xs
// const screenMax = settings.screensRem['7xl']

const calcVWMobile = (val) => {
  const vwContext = remToPx(settings.screensRem['xs']) * 0.01

  return `${val / vwContext}vw`

}

const calcVWTablet = (val) => {
  const vwContext = remToPx(settings.screensRem['lg']) * 0.01

  return `${val / vwContext}vw`

}

const calcVW = (val) => {
  const vwContext = remToPx(settings.screensRem['7xl']) * 0.01

  return `${val / vwContext}vw`

}

const remToPx = (rem) => {
  return rem * 16
}

// Calc Min and Max Fontsize
// const calcMulti = (multiMin = 0, multiMax = null) => {
//   // 1600
//   // 16
//   // console.log('min', remToPx(fsMin * Math.pow(msFactorMin, multiMin)), 'max', remToPx(fsMax * Math.pow(msFactorMax, multiMax || multiMin)));
//   return {
//     fsMin: fsMin * Math.pow(msFactorMin, multiMin),
//     fsMax: fsMax * Math.pow(msFactorMax, multiMax || multiMin),
//   }
// }

// build the clamp property
// const clamp = (multiMin = 0, multiMax = null) => {
//   const _calcMulti = calcMulti(multiMin, multiMax || multiMin)
//   // console.log(_calcMulti);
//   const _fsMin = _calcMulti.fsMin
//   const _fsMax = _calcMulti.fsMax
//   return `clamp(${_fsMin}rem, calc(${_fsMin}rem + (${_fsMax} - ${_fsMin}) * ((100vw - ${screenMin}rem) / (${screenMax} - ${screenMin}))), ${_fsMax}rem)`
// }

module.exports = {
  '16-mobile': [calcVWMobile(16), { lineHeight: calcVWMobile(16) }],
  '18-mobile': [calcVWMobile(18), { lineHeight: calcVWMobile(18) }],
  '20-mobile': [calcVWMobile(20), { lineHeight: calcVWMobile(20) }],
  '22-mobile': [calcVWMobile(22), { lineHeight: calcVWMobile(22) }],
  '24-mobile': [calcVWMobile(24), { lineHeight: calcVWMobile(24) }],
  '26-mobile': [calcVWMobile(26), { lineHeight: calcVWMobile(26) }],
  '28-mobile': [calcVWMobile(28), { lineHeight: calcVWMobile(28) }],
  '30-mobile': [calcVWMobile(30), { lineHeight: calcVWMobile(30) }],
  '32-mobile': [calcVWMobile(32), { lineHeight: calcVWMobile(32) }],
  '34-mobile': [calcVWMobile(34), { lineHeight: calcVWMobile(34) }],
  '36-mobile': [calcVWMobile(36), { lineHeight: calcVWMobile(36) }],
  '38-mobile': [calcVWMobile(38), { lineHeight: calcVWMobile(38) }],
  '40-mobile': [calcVWMobile(40), { lineHeight: calcVWMobile(40) }],

  '16-tablet': [calcVWTablet(16), { lineHeight: calcVWTablet(16) }],
  '18-tablet': [calcVWTablet(18), { lineHeight: calcVWTablet(18) }],
  '20-tablet': [calcVWTablet(20), { lineHeight: calcVWTablet(20) }],
  '22-tablet': [calcVWTablet(22), { lineHeight: calcVWTablet(22) }],
  '24-tablet': [calcVWTablet(24), { lineHeight: calcVWTablet(24) }],
  '26-tablet': [calcVWTablet(26), { lineHeight: calcVWTablet(26) }],
  '28-tablet': [calcVWTablet(28), { lineHeight: calcVWTablet(28) }],
  '30-tablet': [calcVWTablet(30), { lineHeight: calcVWTablet(30) }],
  '32-tablet': [calcVWTablet(32), { lineHeight: calcVWTablet(32) }],
  '34-tablet': [calcVWTablet(34), { lineHeight: calcVWTablet(34) }],
  '36-tablet': [calcVWTablet(36), { lineHeight: calcVWTablet(36) }],
  '38-tablet': [calcVWTablet(38), { lineHeight: calcVWTablet(38) }],
  '40-tablet': [calcVWTablet(40), { lineHeight: calcVWTablet(40) }],

  16: [calcVW(16), { lineHeight: calcVW(16) }],
  18: [calcVW(18), { lineHeight: calcVW(18) }],
  20: [calcVW(20), { lineHeight: calcVW(20) }],
  22: [calcVW(22), { lineHeight: calcVW(22) }],
  24: [calcVW(24), { lineHeight: calcVW(24) }],
  26: [calcVW(26), { lineHeight: calcVW(26) }],
  28: [calcVW(28), { lineHeight: calcVW(28) }],
  30: [calcVW(30), { lineHeight: calcVW(30) }],
  32: [calcVW(32), { lineHeight: calcVW(32) }],
  34: [calcVW(34), { lineHeight: calcVW(34) }],
  36: [calcVW(36), { lineHeight: calcVW(36) }],
  38: [calcVW(38), { lineHeight: calcVW(38) }],
  40: [calcVW(40), { lineHeight: calcVW(40) }],
}
