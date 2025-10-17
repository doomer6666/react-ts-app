import React, { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Cubes.css';

interface Gap {
  row: number;
  col: number;
}
interface Duration {
  enter: number;
  leave: number;
}

export interface CubesProps {
  gridSize?: number;
  cubeSize?: number;
  maxAngle?: number;
  radius?: number;
  easing?: string;
  duration?: Duration;
  cellGap?: number | Gap;
  borderStyle?: string;
  faceColor?: string;
  shadow?: boolean | string;
  autoAnimate?: boolean;
  rippleOnClick?: boolean;
  rippleColor?: string;
  rippleSpeed?: number;
  children?: React.ReactNode;
  trackGlobalEvents?: boolean;
}

const Cubes: React.FC<CubesProps> = ({
  gridSize = 10,
  cubeSize,
  maxAngle = 45,
  radius = 3,
  easing = 'power3.out',
  duration = { enter: 0.3, leave: 0.6 },
  cellGap,
  borderStyle = '1px solid #fff',
  faceColor = '#060010',
  shadow = false,
  autoAnimate = true,
  rippleOnClick = true,
  rippleColor = '#fff',
  rippleSpeed = 2,
  children,
  trackGlobalEvents = false,
}) => {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userActiveRef = useRef(false);
  const simPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const simTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const simRAFRef = useRef<number | null>(null);

  const colGap =
    typeof cellGap === 'number'
      ? `${cellGap}px`
      : (cellGap as Gap)?.col !== undefined
        ? `${(cellGap as Gap).col}px`
        : '5%';
  const rowGap =
    typeof cellGap === 'number'
      ? `${cellGap}px`
      : (cellGap as Gap)?.row !== undefined
        ? `${(cellGap as Gap).row}px`
        : '5%';

  const enterDur = duration.enter;
  const leaveDur = duration.leave;

  const tiltAt = useCallback(
    (rowCenter: number, colCenter: number) => {
      if (!sceneRef.current) return;
      sceneRef.current
        .querySelectorAll<HTMLDivElement>('.cube')
        .forEach((cube) => {
          const r = +(cube.dataset.row || '0');
          const c = +(cube.dataset.col || '0');
          const dist = Math.hypot(r - rowCenter, c - colCenter);
          if (dist <= radius) {
            const pct = 1 - dist / radius;
            const angle = pct * maxAngle;
            gsap.to(cube, {
              duration: enterDur,
              ease: easing,
              overwrite: true,
              rotateX: -angle,
              rotateY: angle,
            });
          } else {
            gsap.to(cube, {
              duration: leaveDur,
              ease: 'power3.out',
              overwrite: true,
              rotateX: 0,
              rotateY: 0,
            });
          }
        });
    },
    [radius, maxAngle, enterDur, leaveDur, easing],
  );

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (!sceneRef.current) return;
      userActiveRef.current = true;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

      const rect = sceneRef.current.getBoundingClientRect();
      const cellW = rect.width / gridSize;
      const cellH = rect.height / gridSize;

      let relativeX, relativeY;

      if (trackGlobalEvents) {
        relativeX = e.clientX - rect.left;
        relativeY = e.clientY - rect.top;
      } else {
        relativeX = e.clientX;
        relativeY = e.clientY;
      }

      const colCenter = relativeX / cellW;
      const rowCenter = relativeY / cellH;

      if (
        !trackGlobalEvents ||
        (colCenter >= 0 &&
          colCenter <= gridSize &&
          rowCenter >= 0 &&
          rowCenter <= gridSize)
      ) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() =>
          tiltAt(rowCenter, colCenter),
        );
      }

      idleTimerRef.current = setTimeout(() => {
        userActiveRef.current = false;
      }, 3000);
    },
    [gridSize, tiltAt, trackGlobalEvents],
  );

  const resetAll = useCallback(() => {
    if (!sceneRef.current) return;
    sceneRef.current.querySelectorAll<HTMLDivElement>('.cube').forEach((cube) =>
      gsap.to(cube, {
        duration: leaveDur,
        rotateX: 0,
        rotateY: 0,
        ease: 'power3.out',
      }),
    );
  }, [leaveDur]);

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!sceneRef.current) return;
      e.preventDefault();
      userActiveRef.current = true;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

      const rect = sceneRef.current.getBoundingClientRect();
      const cellW = rect.width / gridSize;
      const cellH = rect.height / gridSize;

      const touch = e.touches[0];

      let relativeX, relativeY;

      if (trackGlobalEvents) {
        relativeX = touch.clientX - rect.left;
        relativeY = touch.clientY - rect.top;
      } else {
        relativeX = touch.clientX;
        relativeY = touch.clientY;
      }

      const colCenter = relativeX / cellW;
      const rowCenter = relativeY / cellH;

      if (
        !trackGlobalEvents ||
        (colCenter >= 0 &&
          colCenter <= gridSize &&
          rowCenter >= 0 &&
          rowCenter <= gridSize)
      ) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() =>
          tiltAt(rowCenter, colCenter),
        );
      }

      idleTimerRef.current = setTimeout(() => {
        userActiveRef.current = false;
      }, 3000);
    },
    [gridSize, tiltAt, trackGlobalEvents],
  );

  const onTouchStart = useCallback(() => {
    userActiveRef.current = true;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!sceneRef.current) return;
    resetAll();
  }, [resetAll]);

  const checkPointerOutside = useCallback(
    (e: PointerEvent) => {
      if (!sceneRef.current) return;
      const rect = sceneRef.current.getBoundingClientRect();

      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        resetAll();
      }
    },
    [resetAll],
  );

  const onClick = useCallback(
    (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
      if (!rippleOnClick || !sceneRef.current) return;

      const rect = sceneRef.current.getBoundingClientRect();
      const cellW = rect.width / gridSize;
      const cellH = rect.height / gridSize;

      let clientX, clientY;

      if ('clientX' in e) {
        // MouseEvent
        clientX = e.clientX;
        clientY = e.clientY;
      } else if ('touches' in e && e.touches[0]) {
        // TouchEvent
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        return;
      }

      let relativeX, relativeY;

      if (trackGlobalEvents) {
        relativeX = clientX - rect.left;
        relativeY = clientY - rect.top;
      } else {
        relativeX = clientX;
        relativeY = clientY;
      }

      const colHit = Math.floor(relativeX / cellW);
      const rowHit = Math.floor(relativeY / cellH);

      if (
        !trackGlobalEvents ||
        (colHit >= 0 && colHit < gridSize && rowHit >= 0 && rowHit < gridSize)
      ) {
        const baseRingDelay = 0.15;
        const baseAnimDur = 0.3;
        const baseHold = 0.6;

        const spreadDelay = baseRingDelay / rippleSpeed;
        const animDuration = baseAnimDur / rippleSpeed;
        const holdTime = baseHold / rippleSpeed;

        const rings: Record<number, HTMLDivElement[]> = {};
        sceneRef.current
          .querySelectorAll<HTMLDivElement>('.cube')
          .forEach((cube) => {
            const r = +(cube.dataset.row || '0');
            const c = +(cube.dataset.col || '0');
            const dist = Math.hypot(r - rowHit, c - colHit);
            const ring = Math.round(dist);
            if (!rings[ring]) rings[ring] = [];
            rings[ring].push(cube);
          });

        Object.keys(rings)
          .map(Number)
          .sort((a, b) => a - b)
          .forEach((ring) => {
            const delay = ring * spreadDelay;
            const faces = rings[ring].flatMap((cube) =>
              Array.from(cube.querySelectorAll<HTMLElement>('.cube-face')),
            );

            gsap.to(faces, {
              backgroundColor: rippleColor,
              duration: animDuration,
              delay,
              ease: 'power3.out',
            });
            gsap.to(faces, {
              backgroundColor: faceColor,
              duration: animDuration,
              delay: delay + animDuration + holdTime,
              ease: 'power3.out',
            });
          });
      }
    },
    [
      rippleOnClick,
      gridSize,
      faceColor,
      rippleColor,
      rippleSpeed,
      trackGlobalEvents,
    ],
  );

  useEffect(() => {
    if (!autoAnimate || !sceneRef.current) return;
    simPosRef.current = {
      x: Math.random() * gridSize,
      y: Math.random() * gridSize,
    };
    simTargetRef.current = {
      x: Math.random() * gridSize,
      y: Math.random() * gridSize,
    };
    const speed = 0.02;
    const loop = () => {
      if (!userActiveRef.current) {
        const pos = simPosRef.current;
        const tgt = simTargetRef.current;
        pos.x += (tgt.x - pos.x) * speed;
        pos.y += (tgt.y - pos.y) * speed;
        tiltAt(pos.y, pos.x);
        if (Math.hypot(pos.x - tgt.x, pos.y - tgt.y) < 0.1) {
          simTargetRef.current = {
            x: Math.random() * gridSize,
            y: Math.random() * gridSize,
          };
        }
      }
      simRAFRef.current = requestAnimationFrame(loop);
    };
    simRAFRef.current = requestAnimationFrame(loop);
    return () => {
      if (simRAFRef.current != null) {
        cancelAnimationFrame(simRAFRef.current);
      }
    };
  }, [autoAnimate, gridSize, tiltAt]);

  useEffect(() => {
    const targetElement = trackGlobalEvents ? document : sceneRef.current;
    if (!targetElement) return;

    const pointerMoveHandler = (e: PointerEvent) => onPointerMove(e);
    const resetAllHandler = () => resetAll();
    const clickHandler = (e: MouseEvent) => onClick(e);
    const touchMoveHandler = (e: TouchEvent) => onTouchMove(e);
    const touchStartHandler = () => onTouchStart();
    const touchEndHandler = () => onTouchEnd();

    if (trackGlobalEvents) {
      document.addEventListener('pointermove', pointerMoveHandler);
      document.addEventListener('click', clickHandler);
      document.addEventListener('touchmove', touchMoveHandler, {
        passive: false,
      });
      document.addEventListener('touchstart', touchStartHandler, {
        passive: true,
      });
      document.addEventListener('touchend', touchEndHandler, { passive: true });

      document.addEventListener('pointermove', checkPointerOutside);

      return () => {
        document.removeEventListener('pointermove', pointerMoveHandler);
        document.removeEventListener('click', clickHandler);
        document.removeEventListener('touchmove', touchMoveHandler);
        document.removeEventListener('touchstart', touchStartHandler);
        document.removeEventListener('touchend', touchEndHandler);
        document.removeEventListener('pointermove', checkPointerOutside);

        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      };
    } else {
      const el = sceneRef.current;
      if (!el) return;

      el.addEventListener('pointermove', pointerMoveHandler);
      el.addEventListener('pointerleave', resetAllHandler);
      el.addEventListener('click', clickHandler);
      el.addEventListener('touchmove', touchMoveHandler, { passive: false });
      el.addEventListener('touchstart', touchStartHandler, { passive: true });
      el.addEventListener('touchend', touchEndHandler, { passive: true });

      return () => {
        el.removeEventListener('pointermove', pointerMoveHandler);
        el.removeEventListener('pointerleave', resetAllHandler);
        el.removeEventListener('click', clickHandler);
        el.removeEventListener('touchmove', touchMoveHandler);
        el.removeEventListener('touchstart', touchStartHandler);
        el.removeEventListener('touchend', touchEndHandler);

        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      };
    }
  }, [
    onPointerMove,
    resetAll,
    onClick,
    onTouchMove,
    onTouchStart,
    onTouchEnd,
    checkPointerOutside,
    trackGlobalEvents,
  ]);

  const renderCubes = () => {
    const cubes = [];
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        cubes.push(
          <div key={`${r}-${c}`} className="cube" data-row={r} data-col={c}>
            <div className="cube-face cube-face--top" />
            <div className="cube-face cube-face--bottom" />
            <div className="cube-face cube-face--left" />
            <div className="cube-face cube-face--right" />
            <div className="cube-face cube-face--front" />
            <div className="cube-face cube-face--back" />
          </div>,
        );
      }
    }
    return cubes;
  };

  const sceneStyle: React.CSSProperties = {
    gridTemplateColumns: cubeSize
      ? `repeat(${gridSize}, ${cubeSize}px)`
      : `repeat(${gridSize}, 1fr)`,
    gridTemplateRows: cubeSize
      ? `repeat(${gridSize}, ${cubeSize}px)`
      : `repeat(${gridSize}, 1fr)`,
    columnGap: colGap,
    rowGap: rowGap,
  };

  const wrapperStyle = {
    '--cube-face-border': borderStyle,
    '--cube-face-bg': faceColor,
    '--cube-face-shadow':
      shadow === true ? '0 0 6px rgba(0,0,0,.5)' : shadow || 'none',
    '--depth': '0.5em',
  } as React.CSSProperties;

  return (
    <div className="default-animation" style={wrapperStyle}>
      <div
        ref={sceneRef}
        className="default-animation--scene"
        style={sceneStyle}
      >
        {renderCubes()}
      </div>

      {/* Контейнер для контента */}
      {children && <div className="default-animation--content">{children}</div>}
    </div>
  );
};

export default Cubes;
