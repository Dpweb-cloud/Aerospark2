"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs";

export function AnimeHeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameMode, setGameMode] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [finalScore, setFinalScore] = useState(0);
  
  const isPlayingRef = useRef(false);
  const resetGameRef = useRef<(() => void) | null>(null);
  const startGameRef = useRef<(() => void) | null>(null);

  const handleStart = () => {
    setGameMode('playing');
    isPlayingRef.current = true;
    startGameRef.current?.();
  };

  const handleRestart = () => {
    setGameMode('playing');
    isPlayingRef.current = true;
    resetGameRef.current?.();
  };

  const handleStop = () => {
    setGameMode('idle');
    isPlayingRef.current = false;
    resetGameRef.current?.();
  };

  const handleMouseLeave = () => {
    if (gameMode === 'playing') {
      handleStop();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    let dpr = window.devicePixelRatio || 1;
    
    const resizeCanvas = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    let cx = width / 2;
    let cy = height / 2;
    let maxRadius = Math.min(width, height) * 0.42;
    let coneR = maxRadius * 0.25;
    
    const engineState = {
      fanRotation: 0,
      coreGlow: 0,
      isDamaged: false,
      damageTimer: 0,
      shakeX: 0,
      shakeY: 0
    };

    const gameState = {
      score: 0,
      strikes: 0,
      maxStrikes: 5,
      isBroken: false
    };

    const airflowParticles: any[] = [];
    const sparkParticles: any[] = [];
    
    for (let i = 0; i < 80; i++) {
      airflowParticles.push({
        angle: Math.random() * Math.PI * 2,
        distance: Math.random() * maxRadius * 1.5,
        speed: Math.random() * 3 + 1.5,
        length: Math.random() * 30 + 10,
        opacity: Math.random() * 0.6 + 0.1
      });
    }

    const targets: any[] = [];
    let frameCount = 0;

    const spawnTarget = () => {
      if (gameState.isBroken) return; 
      
      const spawnRadius = Math.max(width, height);
      const baseSpeed = 1.0 + (gameState.score * 0.15);
      
      targets.push({
        angle: Math.random() * Math.PI * 2,
        distance: spawnRadius,
        speed: baseSpeed + Math.random() * 1.5,
        size: Math.random() * 10 + 15,
        type: Math.random() > 0.5 ? 'bird' : 'debris',
        active: true
      });
    };

    const triggerDamage = () => {
      if (gameState.isBroken) return;
      
      gameState.strikes++;
      if (gameState.strikes >= gameState.maxStrikes) {
        gameState.isBroken = true;
        isPlayingRef.current = false;
        setGameMode('gameover');
        setFinalScore(gameState.score);
        fanAnim.pause(); 
      } else {
        engineState.isDamaged = true;
        engineState.damageTimer = 120;
      }
      
      for(let i=0; i < 40; i++) {
        const sparkAngle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 15 + 5;
        sparkParticles.push({
          x: Math.cos(sparkAngle) * coneR,
          y: Math.sin(sparkAngle) * coneR,
          vx: Math.cos(sparkAngle) * speed,
          vy: Math.sin(sparkAngle) * speed,
          life: 1.0,
          size: Math.random() * 4 + 2,
          type: 'spark'
        });
      }
    };

    const startGame = () => {
      gameState.score = 0;
      gameState.strikes = 0;
      gameState.isBroken = false;
      targets.length = 0;
      sparkParticles.length = 0;
      engineState.isDamaged = false;
      engineState.shakeX = 0;
      engineState.shakeY = 0;
    };
    
    startGameRef.current = startGame;

    resetGameRef.current = () => {
      startGame();
      fanAnim.play();
    };

    const handleCanvasClick = (e: MouseEvent) => {
      if (!isPlayingRef.current || gameState.isBroken) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left);
      const mouseY = (e.clientY - rect.top);

      targets.forEach(t => {
        if (!t.active) return;
        const tx = cx + Math.cos(t.angle) * t.distance;
        const ty = cy + Math.sin(t.angle) * t.distance;
        
        const dist = Math.hypot(mouseX - tx, mouseY - ty);
        if (dist < t.size + 25) { 
          t.active = false;
          gameState.score++;
          
          for(let i=0; i<15; i++) {
            const sparkAngle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 4 + 1;
            sparkParticles.push({
              x: Math.cos(t.angle) * t.distance,
              y: Math.sin(t.angle) * t.distance,
              vx: Math.cos(sparkAngle) * speed,
              vy: Math.sin(sparkAngle) * speed,
              life: 0.5,
              size: Math.random() * 5 + 3,
              type: 'debris'
            });
          }
        }
      });
    };
    canvas.addEventListener('mousedown', handleCanvasClick);

    const fanAnim = anime({
      targets: engineState,
      fanRotation: Math.PI * 2,
      duration: 4000,
      easing: 'linear',
      loop: true
    });

    anime({
      targets: engineState,
      coreGlow: 1,
      duration: 2000,
      direction: 'alternate',
      easing: 'easeInOutSine',
      loop: true
    });

    let animationId: number;

    const render = () => {
      const isDark = document.documentElement.classList.contains('dark');
      ctx.clearRect(0, 0, width, height);

      cx = width / 2;
      cy = height / 2;
      maxRadius = Math.min(width, height) * 0.42;
      coneR = maxRadius * 0.25;
      
      if (gameState.isBroken) {
        engineState.shakeX = (Math.random() - 0.5) * 12;
        engineState.shakeY = (Math.random() - 0.5) * 12;
        
        for(let i=0; i<4; i++) {
          sparkParticles.push({
            x: (Math.random() - 0.5) * coneR * 1.5,
            y: (Math.random() - 0.5) * coneR * 1.5,
            vx: (Math.random() - 0.5) * 4,
            vy: -Math.random() * 8 - 4,
            life: 1.0,
            size: Math.random() * 20 + 10,
            type: 'fire'
          });
        }
        for(let i=0; i<2; i++) {
          sparkParticles.push({
            x: (Math.random() - 0.5) * coneR * 2.5,
            y: (Math.random() - 0.5) * coneR * 2.5 - 20,
            vx: (Math.random() - 0.5) * 2,
            vy: -Math.random() * 4 - 2,
            life: 1.0,
            size: Math.random() * 30 + 20,
            type: 'smoke'
          });
        }
      } else if (engineState.isDamaged) {
        engineState.damageTimer--;
        engineState.shakeX = (Math.random() - 0.5) * 10;
        engineState.shakeY = (Math.random() - 0.5) * 10;
        if (engineState.damageTimer <= 0) {
          engineState.isDamaged = false;
          engineState.shakeX = 0;
          engineState.shakeY = 0;
        }
      }

      ctx.save();
      ctx.translate(cx + engineState.shakeX, cy + engineState.shakeY);

      // 1. THE VOID
      ctx.beginPath();
      ctx.arc(0, 0, maxRadius * 0.95, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? '#020205' : '#0a0a0f';
      ctx.fill();

      // Glowing core
      const glowGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, maxRadius * 0.8);
      const glowBase = isDark ? 20 : 10;
      const glowIntensity = glowBase + engineState.coreGlow * 15;
      
      if (gameState.isBroken || engineState.isDamaged) {
        glowGrad.addColorStop(0, `rgba(255, 40, 0, ${(glowIntensity + 40) / 100})`);
        glowGrad.addColorStop(1, 'rgba(255, 40, 0, 0)');
      } else {
        glowGrad.addColorStop(0, `rgba(0, 180, 255, ${glowIntensity / 100})`);
        glowGrad.addColorStop(1, 'rgba(0, 180, 255, 0)');
      }
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // 2. STATOR BLADES
      const numStators = 36;
      ctx.lineWidth = 3;
      for (let i = 0; i < numStators; i++) {
        const angle = (i * Math.PI * 2) / numStators;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * maxRadius * 0.2, Math.sin(angle) * maxRadius * 0.2);
        ctx.lineTo(Math.cos(angle) * maxRadius * 0.95, Math.sin(angle) * maxRadius * 0.95);
        
        const statorGrad = ctx.createLinearGradient(0, 0, Math.cos(angle) * maxRadius, Math.sin(angle) * maxRadius);
        statorGrad.addColorStop(0, isDark ? '#111' : '#333');
        statorGrad.addColorStop(1, isDark ? '#050505' : '#111');
        ctx.strokeStyle = statorGrad;
        ctx.stroke();
      }

      // 3. ROTOR BLADES
      const numBlades = 22;
      const stutter = (engineState.isDamaged || gameState.isBroken) ? (Math.random() * 0.1 - 0.05) : 0;
      const currentRotation = engineState.fanRotation + stutter;
      
      for (let i = 0; i < numBlades; i++) {
        ctx.save();
        ctx.rotate(currentRotation + (i * Math.PI * 2) / numBlades);
        
        const innerR = maxRadius * 0.2;
        const outerR = maxRadius * 0.94;
        const bladeTopW = maxRadius * 0.28;
        const bladeBotW = maxRadius * 0.08;
        
        ctx.beginPath();
        ctx.moveTo(innerR, -bladeBotW / 2);
        ctx.quadraticCurveTo(innerR + (outerR - innerR) * 0.6, -bladeTopW * 0.8, outerR, -bladeTopW / 2);
        ctx.arc(0, 0, outerR, Math.atan2(-bladeTopW / 2, outerR), Math.atan2(bladeTopW / 2, outerR));
        ctx.quadraticCurveTo(innerR + (outerR - innerR) * 0.6, bladeTopW * 0.2, innerR, bladeBotW / 2);
        ctx.closePath();

        const bladeGrad = ctx.createLinearGradient(innerR, -bladeTopW, outerR, bladeTopW);
        if (isDark) {
          bladeGrad.addColorStop(0, '#1a1a24');
          bladeGrad.addColorStop(0.5, '#3b4252');
          bladeGrad.addColorStop(1, '#0f111a');
        } else {
          bladeGrad.addColorStop(0, '#666');
          bladeGrad.addColorStop(0.5, '#aaa');
          bladeGrad.addColorStop(1, '#444');
        }
        
        ctx.fillStyle = bladeGrad;
        ctx.fill();
        
        ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.restore();
      }

      // 4. SPINNER CONE
      const coneGrad = ctx.createRadialGradient(-coneR * 0.3, -coneR * 0.3, 0, 0, 0, coneR);
      if (isDark) {
        coneGrad.addColorStop(0, '#4a5568');
        coneGrad.addColorStop(0.7, '#111');
        coneGrad.addColorStop(1, '#000');
      } else {
        coneGrad.addColorStop(0, '#e2e8f0');
        coneGrad.addColorStop(0.7, '#718096');
        coneGrad.addColorStop(1, '#2d3748');
      }

      ctx.beginPath();
      ctx.arc(0, 0, coneR, 0, Math.PI * 2);
      ctx.fillStyle = coneGrad;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(0, 0, coneR, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? '#2d3748' : '#cbd5e1';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.save();
      ctx.rotate(currentRotation); 
      ctx.beginPath();
      ctx.arc(0, 0, coneR * 0.5, 0, Math.PI * 0.8, false);
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)';
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(0, 0, coneR * 0.5, Math.PI, Math.PI * 1.8, false);
      ctx.stroke();
      ctx.restore();

      // 5. OUTER COWLING
      const cowlThickness = maxRadius * 0.15;
      const gradCowl = ctx.createRadialGradient(0, 0, maxRadius, 0, 0, maxRadius + cowlThickness);
      if (isDark) {
        gradCowl.addColorStop(0, '#0f172a');
        gradCowl.addColorStop(0.3, '#334155');
        gradCowl.addColorStop(1, '#020617');
      } else {
        gradCowl.addColorStop(0, '#cbd5e1');
        gradCowl.addColorStop(0.3, '#f1f5f9');
        gradCowl.addColorStop(1, '#94a3b8');
      }

      ctx.beginPath();
      ctx.arc(0, 0, maxRadius + cowlThickness, 0, Math.PI * 2);
      ctx.arc(0, 0, maxRadius, 0, Math.PI * 2, true);
      ctx.fillStyle = gradCowl;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(0, 0, maxRadius, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? '#475569' : '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 6. AIRFLOW PARTICLES
      airflowParticles.forEach(p => {
        p.distance -= p.speed;
        if (p.distance < coneR) {
          p.distance = maxRadius * 1.5;
          p.angle = Math.random() * Math.PI * 2;
        }

        const x = Math.cos(p.angle) * p.distance;
        const y = Math.sin(p.angle) * p.distance;
        const tailX = Math.cos(p.angle) * (p.distance + p.length);
        const tailY = Math.sin(p.angle) * (p.distance + p.length);

        const normalizedDist = (p.distance - coneR) / (maxRadius * 1.5 - coneR);
        const fade = Math.sin(normalizedDist * Math.PI); 

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = (gameState.isBroken || engineState.isDamaged)
          ? `rgba(255, 80, 0, ${p.opacity * fade})`
          : (isDark ? `rgba(0, 180, 255, ${p.opacity * fade})` : `rgba(0, 48, 135, ${p.opacity * fade})`);
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.stroke();
      });

      // 7. FIRE AND SPARKS
      for (let i = sparkParticles.length - 1; i >= 0; i--) {
        const p = sparkParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= (p.type === 'smoke' ? 0.015 : 0.03);

        if (p.life <= 0) {
          sparkParticles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        const sizeMultiplier = p.type === 'spark' ? p.life : (2.0 - p.life);
        ctx.arc(p.x, p.y, p.size * sizeMultiplier, 0, Math.PI * 2);
        
        if (p.type === 'fire') {
          ctx.fillStyle = `rgba(255, ${Math.random() * 100 + 50}, 0, ${p.life})`;
        } else if (p.type === 'smoke') {
          ctx.fillStyle = isDark ? `rgba(20, 20, 20, ${p.life * 0.6})` : `rgba(80, 80, 80, ${p.life * 0.4})`;
        } else if (p.type === 'debris') {
          ctx.fillStyle = `rgba(150, 150, 150, ${p.life})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 150, ${p.life})`;
        }
        ctx.fill();
      }

      ctx.restore(); 

      // 8. MINI-GAME TARGETS (Only if playing)
      frameCount++;
      if (isPlayingRef.current) {
        const spawnInterval = Math.max(20, 90 - (gameState.score * 2));
        if (frameCount % spawnInterval === 0 && !gameState.isBroken) {
          spawnTarget();
        }
      }

      ctx.save();
      ctx.translate(cx, cy);

      for (let i = targets.length - 1; i >= 0; i--) {
        const t = targets[i];
        if (!t.active) {
          targets.splice(i, 1);
          continue;
        }

        t.distance -= t.speed;

        if (t.distance <= coneR) {
          t.active = false;
          triggerDamage();
          targets.splice(i, 1);
          continue;
        }

        const tx = Math.cos(t.angle) * t.distance;
        const ty = Math.sin(t.angle) * t.distance;

        ctx.save();
        ctx.translate(tx, ty);
        ctx.rotate(t.angle + Math.PI / 2);
        
        ctx.beginPath();
        if (t.type === 'bird') {
          ctx.moveTo(-t.size, -t.size*0.5);
          ctx.quadraticCurveTo(-t.size*0.3, -t.size*1.2, 0, 0);
          ctx.quadraticCurveTo(t.size*0.3, -t.size*1.2, t.size, -t.size*0.5);
          ctx.quadraticCurveTo(0, t.size*0.8, -t.size, -t.size*0.5);
        } else {
          ctx.moveTo(-t.size, 0);
          ctx.lineTo(-t.size*0.5, -t.size);
          ctx.lineTo(t.size*0.8, -t.size*0.5);
          ctx.lineTo(t.size, t.size);
          ctx.lineTo(0, t.size*0.8);
        }
        ctx.closePath();
        
        ctx.fillStyle = isDark ? '#ff4444' : '#cc0000';
        ctx.fill();
        ctx.strokeStyle = isDark ? '#fff' : '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.restore();
      }
      ctx.restore();

      // 9. DRAW SCORE UI (Only if playing)
      if (isPlayingRef.current || gameState.isBroken) {
        ctx.font = "bold 16px Inter, sans-serif";
        ctx.textAlign = "left";
        ctx.fillStyle = isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)";
        
        const padding = 20;
        ctx.fillText(`PROTECTED: ${gameState.score}`, padding, padding + 16);
        
        ctx.fillStyle = gameState.strikes >= gameState.maxStrikes - 1 ? "#ff4444" : (isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)");
        ctx.fillText(`DAMAGE: ${gameState.strikes} / ${gameState.maxStrikes}`, padding, padding + 40);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener('mousedown', handleCanvasClick);
      cancelAnimationFrame(animationId);
      anime.remove(engineState);
    };
  }, []);

  return (
    <div 
      className="relative w-full h-[300px] md:h-[400px] lg:h-[600px] flex items-center justify-center group overflow-hidden"
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full transition-all duration-300 ${gameMode === 'playing' ? 'cursor-crosshair' : 'cursor-default'}`}
      />
      
      {/* Idle State - Play Button */}
      {gameMode === 'idle' && (
        <div className="absolute top-2 right-2 md:top-4 md:right-4 z-20">
          <button 
            onClick={handleStart}
            className="px-3 py-1.5 md:px-5 md:py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-bold rounded-full transition-all shadow-[0_0_15px_rgba(37,99,235,0.5)] hover:scale-105 active:scale-95 flex items-center gap-1.5 md:gap-2"
          >
            <span className="text-sm md:text-lg leading-none">▶</span> Play Mini-Game
          </button>
        </div>
      )}

      {/* Playing State - Stop Button */}
      {gameMode === 'playing' && (
        <div className="absolute top-2 right-2 md:top-4 md:right-4 z-20">
          <button 
            onClick={handleStop}
            className="px-3 py-1.5 md:px-5 md:py-2.5 bg-gray-500/80 hover:bg-gray-600/80 backdrop-blur-sm text-white text-xs md:text-sm font-bold rounded-full transition-all shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95 flex items-center gap-1.5 md:gap-2"
          >
            <span className="text-sm md:text-lg leading-none">■</span> Stop Game
          </button>
        </div>
      )}

      {/* HUD Hint */}
      {gameMode === 'playing' && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border border-border-subtle text-xs font-semibold text-text-secondary">
          Click the incoming birds and debris to protect the engine!
        </div>
      )}

      {/* Game Over Floating Overlay */}
      {gameMode === 'gameover' && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-in slide-in-from-top-4 duration-500">
          <div className="bg-background/90 backdrop-blur-xl px-8 py-5 rounded-3xl border border-red-500/40 text-center shadow-[0_20px_60px_rgba(255,0,0,0.3)] min-w-[300px]">
            <h2 className="text-3xl font-black text-red-600 dark:text-red-500 tracking-tight mb-1 drop-shadow-md">
              ENGINE FAILURE
            </h2>
            <p className="text-text-primary font-medium mb-6">
              Final Score: <span className="font-bold text-lg">{finalScore}</span> Destroyed
            </p>
            <div className="flex gap-3 justify-center w-full">
              <button 
                onClick={handleStop}
                className="px-5 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-full transition-all hover:scale-105 active:scale-95 flex-1"
              >
                Quit
              </button>
              <button 
                onClick={handleRestart}
                className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(220,38,38,0.4)] flex-1"
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
