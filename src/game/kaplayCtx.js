import kaplay from 'kaplay';

export default function initKaplay(elementRef) {
  return kaplay({
    width: 641 * 2,
    height: 360 * 2,
    global: false,
    debug: true, // TODO: put back to false in prod
    debugKey: 'f1',
    canvas: elementRef.current,
    pixelDensity: devicePixelRatio,
    crisp: true,
    maxFPS: 60
  });
}
