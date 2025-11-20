import kaplay from 'kaplay';

export default function initKaplay() {
  return kaplay({
    width: 641*2,
    height: 360*2,
    letterbox: true,
    global: false,
    debug: true, // TODO: put back to false in prod
    debugKey: 'f1',
    canvas: document.getElementById('game'),
    pixelDensity: devicePixelRatio,
    crisp:true,
    maxFPS:60
  });
}
