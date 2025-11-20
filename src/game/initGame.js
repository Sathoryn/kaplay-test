import initKaplay from './kaplayCtx';

export default function initGame(elementRef, setCounter) {
  const k = initKaplay(elementRef);

  k.camPos();
  k.loadSprite('background', './background.jpg'); //vite knows that bakground is in public
  k.loadSprite('frog', './Run.png', {
    sliceX: 12,
    sliceY: 1,
    anims: {
      run: {
        from: 0,
        to: 11,
        loop: true
      }
    }
  });

  k.scene('game', () => {
    const FLOOR_HEIGHT = 600;

    k.loadSprite('mushroom', './Mushroom-Run.png', {
      sliceX: 8,
      sliceY: 1,
      anims: {
        run: {
          from: 0,
          to: 7,
          loop: true
        }
      }
    });

    k.add([k.sprite('background'), k.pos(0), k.scale(2)]);

    k.add([k.rect(2000, 50), k.area(), k.pos(0, 590), k.opacity(0), k.body({ isStatic: true })]);

    const player = k.add([
      k.sprite('frog', { anim: 'run' }),
      k.area({
        shape: new k.Rect(k.vec2(0, 0), 20, 25)
      }),
      k.body(),
      k.pos(100, FLOOR_HEIGHT),
      k.anchor('bot'),
      k.scale(3),
      'player',
      { speed: 500, direction: k.vec2(0, 0) }
    ]);

    function spawnShroom() {
      k.add([
        k.sprite('mushroom', { anim: 'run' }),

        k.body(),
        k.pos(1300, FLOOR_HEIGHT),
        k.anchor('bot'),
        k.area({
          shape: new k.Rect(k.vec2(0, 0), 20, 25)
        }),
        k.scale(3),
        'mushroom',
        k.move(player.pos.angle(1000, FLOOR_HEIGHT), 400),
        k.offscreen({ destroy: true })
      ]);
      k.wait(k.rand(0.7, 3), spawnShroom);
    }

    spawnShroom();

    k.setGravity(4000);

    player.onCollide('mushroom', () => {
      k.destroy(player);
      k.go('gameover');
    });

    player.onUpdate(() => {
      setCounter(score => score + 1);

      player.direction.x = 0;
      player.direction.y = 0;
      if (k.isKeyDown('d')) player.direction.x += 1;
      if (k.isKeyDown('a')) player.direction.x -= 1;

      k.onKeyPress('space', () => {
        if (player.isGrounded()) {
          player.jump(1500);
        }
      });

      player.move(player.direction.scale(player.speed));
    });
  });

  k.scene('gameover', () => {
    k.add([k.sprite('background'), k.pos(0), k.scale(2)]);
  });

  k.go('game');
}
