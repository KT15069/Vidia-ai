import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Lane = 0 | 1 | 2;

type ObstacleType = 'block' | 'barrier';

interface Obstacle {
  id: number;
  lane: Lane;
  z: number;
  type: ObstacleType;
}

interface Coin {
  id: number;
  lane: Lane;
  z: number;
}

const LANES: Lane[] = [0, 1, 2];
const GAME_SPEED_START = 0.34;
const MAX_SPEED = 0.85;
const LANE_WIDTH = 96;
const PLAYER_BASE_Y = 330;
const JUMP_DURATION = 680;
const SLIDE_DURATION = 540;

const RunnerGamePage: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [lane, setLane] = useState<Lane>(1);
  const [jumping, setJumping] = useState(false);
  const [sliding, setSliding] = useState(false);
  const [distance, setDistance] = useState(0);
  const [coinCount, setCoinCount] = useState(0);
  const [speed, setSpeed] = useState(GAME_SPEED_START);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [coins, setCoins] = useState<Coin[]>([]);

  const idCounter = useRef(0);
  const lastTick = useRef(0);
  const jumpTimeout = useRef<number | null>(null);
  const slideTimeout = useRef<number | null>(null);

  const resetGame = useCallback(() => {
    setGameOver(false);
    setStarted(true);
    setLane(1);
    setJumping(false);
    setSliding(false);
    setDistance(0);
    setCoinCount(0);
    setSpeed(GAME_SPEED_START);
    setObstacles([]);
    setCoins([]);
    idCounter.current = 0;
    lastTick.current = 0;
  }, []);

  const moveLane = useCallback((delta: -1 | 1) => {
    setLane((current) => {
      const next = current + delta;
      if (next < 0 || next > 2) return current;
      return next as Lane;
    });
  }, []);

  const jump = useCallback(() => {
    if (jumping || sliding || !started || gameOver) return;
    setJumping(true);
    if (jumpTimeout.current) window.clearTimeout(jumpTimeout.current);
    jumpTimeout.current = window.setTimeout(() => setJumping(false), JUMP_DURATION);
  }, [gameOver, jumping, sliding, started]);

  const slide = useCallback(() => {
    if (sliding || jumping || !started || gameOver) return;
    setSliding(true);
    if (slideTimeout.current) window.clearTimeout(slideTimeout.current);
    slideTimeout.current = window.setTimeout(() => setSliding(false), SLIDE_DURATION);
  }, [gameOver, jumping, sliding, started]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!started && event.code === 'Space') {
        event.preventDefault();
        resetGame();
        return;
      }

      if (gameOver && event.code === 'Space') {
        event.preventDefault();
        resetGame();
        return;
      }

      if (!started || gameOver) return;

      switch (event.code) {
        case 'ArrowLeft':
        case 'KeyA':
          moveLane(-1);
          break;
        case 'ArrowRight':
        case 'KeyD':
          moveLane(1);
          break;
        case 'ArrowUp':
        case 'KeyW':
        case 'Space':
          event.preventDefault();
          jump();
          break;
        case 'ArrowDown':
        case 'KeyS':
          slide();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (jumpTimeout.current) window.clearTimeout(jumpTimeout.current);
      if (slideTimeout.current) window.clearTimeout(slideTimeout.current);
    };
  }, [gameOver, jump, moveLane, resetGame, slide, started]);

  useEffect(() => {
    if (!started || gameOver) return;

    let frameId = 0;

    const tick = (time: number) => {
      if (!lastTick.current) lastTick.current = time;
      const delta = Math.min(time - lastTick.current, 40);
      lastTick.current = time;

      const step = (delta / 16.67) * speed;
      setDistance((prev) => prev + step * 3.2);
      setSpeed((prev) => Math.min(MAX_SPEED, prev + step * 0.00022));

      setObstacles((prev) => {
        const moved = prev
          .map((obstacle) => ({ ...obstacle, z: obstacle.z - step * 2.5 }))
          .filter((obstacle) => obstacle.z > -120);

        const farthest = moved.reduce((max, obstacle) => Math.max(max, obstacle.z), 0);
        const spawnChance = Math.random();

        if (farthest < 650 && spawnChance > 0.86) {
          moved.push({
            id: idCounter.current++,
            lane: LANES[Math.floor(Math.random() * LANES.length)],
            z: 980,
            type: Math.random() > 0.35 ? 'block' : 'barrier',
          });
        }

        return moved;
      });

      setCoins((prev) => {
        const moved = prev.map((coin) => ({ ...coin, z: coin.z - step * 3 })).filter((coin) => coin.z > -80);
        const farthest = moved.reduce((max, coin) => Math.max(max, coin.z), 0);

        if (farthest < 500 && Math.random() > 0.79) {
          moved.push({
            id: idCounter.current++,
            lane: LANES[Math.floor(Math.random() * LANES.length)],
            z: 1000,
          });
        }

        return moved;
      });

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frameId);
      lastTick.current = 0;
    };
  }, [gameOver, speed, started]);

  useEffect(() => {
    if (!started || gameOver) return;

    setCoins((prev) => {
      const next: Coin[] = [];
      let collected = 0;

      for (const coin of prev) {
        const isNearPlayer = coin.z < 90 && coin.z > -20;
        if (coin.lane === lane && isNearPlayer && !sliding) {
          collected += 1;
          continue;
        }
        next.push(coin);
      }

      if (collected > 0) {
        setCoinCount((count) => count + collected);
      }

      return next;
    });

    for (const obstacle of obstacles) {
      const isNearPlayer = obstacle.z < 95 && obstacle.z > -35;
      if (!isNearPlayer || obstacle.lane !== lane) continue;

      const hitsBlock = obstacle.type === 'block' && !jumping;
      const hitsBarrier = obstacle.type === 'barrier' && !sliding;
      if (hitsBlock || hitsBarrier) {
        setGameOver(true);
        setStarted(false);
        break;
      }
    }
  }, [coins, gameOver, jumping, lane, obstacles, sliding, started]);

  const score = useMemo(() => Math.floor(distance) + coinCount * 12, [coinCount, distance]);

  const playerStyle = {
    left: `calc(50% + ${(lane - 1) * LANE_WIDTH}px - 28px)`,
    bottom: `${jumping ? 168 : PLAYER_BASE_Y - (sliding ? 18 : 0)}px`,
    height: sliding ? 42 : 82,
    width: 56,
  } as const;

  return (
    <div style={styles.page}>
      <div style={styles.game}>
        <div style={styles.hud}>
          <div>Score: {score}</div>
          <div>Distance: {Math.floor(distance)} m</div>
          <div>Coins: {coinCount}</div>
          <div>Speed: {(speed * 100).toFixed(0)}%</div>
        </div>

        <div style={styles.skyGlow} />
        <div style={styles.road}>
          <div style={styles.laneDivider} />
          <div style={{ ...styles.laneDivider, left: '66.66%' }} />
        </div>

        {[...Array(11)].map((_, i) => (
          <div
            key={`stripe-${i}`}
            style={{
              ...styles.stripe,
              transform: `translateZ(${i * 100}px) translateY(${Math.sin(i) * 2}px)`,
              opacity: 1 - i / 11,
            }}
          />
        ))}

        {obstacles.map((obstacle) => {
          const sizeScale = Math.max(0.4, 1.2 - obstacle.z / 950);
          const obstacleTop = 300 + (obstacle.z / 1000) * 200;
          const leftOffset = (obstacle.lane - 1) * LANE_WIDTH;

          return (
            <div
              key={obstacle.id}
              style={{
                ...styles.obstacle,
                left: `calc(50% + ${leftOffset}px - ${24 * sizeScale}px)`,
                top: `${obstacleTop}px`,
                width: `${48 * sizeScale}px`,
                height: `${obstacle.type === 'block' ? 60 : 34 * sizeScale}px`,
                borderRadius: obstacle.type === 'block' ? 10 : 26,
                background: obstacle.type === 'block' ? '#f97316' : '#14b8a6',
                boxShadow: obstacle.type === 'block' ? '0 0 18px rgba(249, 115, 22, 0.55)' : '0 0 18px rgba(20, 184, 166, 0.55)',
              }}
            />
          );
        })}

        {coins.map((coin) => {
          const sizeScale = Math.max(0.3, 1.1 - coin.z / 1000);
          const top = 280 + (coin.z / 950) * 225;
          const leftOffset = (coin.lane - 1) * LANE_WIDTH;
          return (
            <div
              key={coin.id}
              style={{
                ...styles.coin,
                left: `calc(50% + ${leftOffset}px - ${16 * sizeScale}px)`,
                top: `${top}px`,
                width: `${32 * sizeScale}px`,
                height: `${32 * sizeScale}px`,
              }}
            />
          );
        })}

        <div style={{ ...styles.player, ...playerStyle }} />

        {!started && !gameOver && (
          <div style={styles.overlay}>
            <h1 style={styles.title}>Neon Rail Runner</h1>
            <p style={styles.subtitle}>Inspired by endless-runner gameplay with fully original visuals.</p>
            <p style={styles.instructions}>Move: A/D or ←/→ · Jump: W/↑/Space · Slide: S/↓</p>
            <button style={styles.button} onClick={resetGame}>Start Run</button>
          </div>
        )}

        {gameOver && (
          <div style={styles.overlay}>
            <h2 style={styles.title}>Run Over</h2>
            <p style={styles.subtitle}>Final score: {score}</p>
            <p style={styles.instructions}>Press Space or use the button to run again.</p>
            <button style={styles.button} onClick={resetGame}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'radial-gradient(circle at top, #1e1b4b, #020617 58%)',
    color: '#f8fafc',
    fontFamily: 'Inter, system-ui, sans-serif',
    padding: 24,
  },
  game: {
    position: 'relative',
    width: 'min(920px, 100vw - 30px)',
    height: 'min(610px, 90vh)',
    borderRadius: 22,
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'linear-gradient(180deg, #0f172a, #030712 72%)',
    boxShadow: '0 25px 80px rgba(8, 47, 73, 0.55)',
  },
  hud: {
    position: 'absolute',
    top: 14,
    left: 14,
    zIndex: 4,
    display: 'grid',
    gap: 4,
    fontWeight: 600,
    background: 'rgba(2, 6, 23, 0.6)',
    backdropFilter: 'blur(6px)',
    border: '1px solid rgba(148, 163, 184, 0.4)',
    borderRadius: 12,
    padding: '10px 12px',
    fontSize: 14,
  },
  skyGlow: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at 50% 12%, rgba(56, 189, 248, 0.28), transparent 44%)',
  },
  road: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: 0,
    width: 420,
    height: '78%',
    background: 'linear-gradient(180deg, #111827, #020617)',
    clipPath: 'polygon(20% 0%, 80% 0%, 96% 100%, 4% 100%)',
    borderTop: '1px solid rgba(255,255,255,0.12)',
  },
  laneDivider: {
    position: 'absolute',
    left: '33.33%',
    top: 0,
    bottom: 0,
    width: 2,
    background: 'linear-gradient(to bottom, rgba(59,130,246,0.4), rgba(168,85,247,0.72))',
    opacity: 0.85,
  },
  stripe: {
    position: 'absolute',
    left: 'calc(50% - 20px)',
    bottom: 90,
    width: 40,
    height: 8,
    borderRadius: 8,
    background: 'rgba(125, 211, 252, 0.8)',
    boxShadow: '0 0 10px rgba(125, 211, 252, 0.7)',
  },
  player: {
    position: 'absolute',
    borderRadius: 14,
    background: 'linear-gradient(180deg, #f43f5e, #be123c)',
    boxShadow: '0 0 16px rgba(244, 63, 94, 0.5)',
    zIndex: 3,
    transition: 'left 90ms linear, bottom 120ms ease-out, height 100ms linear',
  },
  obstacle: {
    position: 'absolute',
    zIndex: 2,
    transition: 'top 70ms linear',
  },
  coin: {
    position: 'absolute',
    borderRadius: '50%',
    background: 'radial-gradient(circle at 35% 35%, #fef08a, #eab308)',
    boxShadow: '0 0 14px rgba(250, 204, 21, 0.6)',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    zIndex: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    textAlign: 'center',
    background: 'linear-gradient(180deg, rgba(2,6,23,0.68), rgba(2,6,23,0.9))',
    padding: 24,
  },
  title: {
    margin: 0,
    fontSize: 'clamp(2rem, 4vw, 3rem)',
  },
  subtitle: {
    margin: 0,
    color: '#bae6fd',
    fontSize: 18,
  },
  instructions: {
    margin: 0,
    color: '#dbeafe',
    opacity: 0.9,
  },
  button: {
    marginTop: 8,
    padding: '12px 20px',
    border: 'none',
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 16,
    background: 'linear-gradient(90deg, #22d3ee, #6366f1)',
    color: '#0f172a',
    cursor: 'pointer',
  },
};

export default RunnerGamePage;
