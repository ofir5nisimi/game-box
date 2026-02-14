/**
 * ParticleBackground — Animated Canvas Background
 *
 * Full-screen canvas behind all content with floating shapes:
 * stars, circles, triangles, diamonds in randomized palette colors.
 * Uses requestAnimationFrame for smooth 60fps animation.
 *
 * Not a Component subclass — manages its own canvas lifecycle
 * since it doesn't use innerHTML-based rendering.
 */

// ─── Shape Types ────────────────────────────────────────────

type ShapeType = 'star' | 'circle' | 'triangle' | 'diamond';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    rotation: number;
    rotationSpeed: number;
    opacity: number;
    color: string;
    shape: ShapeType;
    depth: number; // 0-1, affects size and speed (parallax)
}

// ─── Configuration ──────────────────────────────────────────

const isMobile = (): boolean => window.innerWidth <= 768;
const PARTICLE_COUNT_DESKTOP = 35;
const PARTICLE_COUNT_MOBILE = 15;
const PARTICLE_COUNT = isMobile() ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;

const COLORS = [
    '#e94560',  // primary red
    '#ff6b81',  // primary light
    '#9b59b6',  // fun purple
    '#c39bd3',  // fun light
    '#f39c12',  // math orange
    '#2ecc71',  // english green
    '#ffd93d',  // accent yellow
    '#55efc4',  // english light
];
const SHAPES: ShapeType[] = ['star', 'circle', 'triangle', 'diamond'];

export class ParticleBackground {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private particles: Particle[] = [];
    private animationId: number | null = null;
    private isRunning = false;

    constructor(private container: HTMLElement) {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'particle-bg';
        const ctx = this.canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Canvas 2D context not supported');
        }
        this.ctx = ctx;
    }

    // ─── Lifecycle ──────────────────────────────────────────────

    /** Mount the canvas and start the animation loop */
    mount(): void {
        this.container.prepend(this.canvas);
        this.resize();
        this.createParticles();
        this.isRunning = true;
        this.animate();

        window.addEventListener('resize', this.handleResize);
    }

    /** Stop the animation and remove the canvas */
    unmount(): void {
        this.isRunning = false;
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        window.removeEventListener('resize', this.handleResize);
        this.canvas.remove();
    }

    // ─── Private ──────────────────────────────────────────────

    private handleResize = (): void => {
        this.resize();
    };

    private resize(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    private createParticles(): void {
        this.particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const depth = 0.3 + Math.random() * 0.7; // 0.3 – 1.0
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: (8 + Math.random() * 16) * depth,
                speedX: (Math.random() - 0.5) * 0.3 * depth,
                speedY: -(0.1 + Math.random() * 0.3) * depth, // drift upward
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.01,
                opacity: (0.1 + Math.random() * 0.25) * depth,
                color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
                shape: SHAPES[Math.floor(Math.random() * SHAPES.length)]!,
                depth,
            });
        }
    }

    private animate = (): void => {
        if (!this.isRunning) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const p of this.particles) {
            this.updateParticle(p);
            this.drawParticle(p);
        }

        this.animationId = requestAnimationFrame(this.animate);
    };

    private updateParticle(p: Particle): void {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Wrap around edges
        if (p.y < -p.size) {
            p.y = this.canvas.height + p.size;
            p.x = Math.random() * this.canvas.width;
        }
        if (p.x < -p.size) p.x = this.canvas.width + p.size;
        if (p.x > this.canvas.width + p.size) p.x = -p.size;
    }

    private drawParticle(p: Particle): void {
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);
        this.ctx.globalAlpha = p.opacity;
        this.ctx.fillStyle = p.color;

        switch (p.shape) {
            case 'circle':
                this.drawCircle(p.size);
                break;
            case 'star':
                this.drawStar(p.size);
                break;
            case 'triangle':
                this.drawTriangle(p.size);
                break;
            case 'diamond':
                this.drawDiamond(p.size);
                break;
        }

        this.ctx.restore();
    }

    private drawCircle(size: number): void {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        this.ctx.fill();
    }

    private drawStar(size: number): void {
        const spikes = 5;
        const outerRadius = size / 2;
        const innerRadius = outerRadius * 0.4;

        this.ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (i * Math.PI) / spikes - Math.PI / 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.closePath();
        this.ctx.fill();
    }

    private drawTriangle(size: number): void {
        const h = (size * Math.sqrt(3)) / 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -h / 2);
        this.ctx.lineTo(-size / 2, h / 2);
        this.ctx.lineTo(size / 2, h / 2);
        this.ctx.closePath();
        this.ctx.fill();
    }

    private drawDiamond(size: number): void {
        const half = size / 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -half);
        this.ctx.lineTo(half * 0.6, 0);
        this.ctx.moveTo(0, -half);
        this.ctx.lineTo(-half * 0.6, 0);
        this.ctx.lineTo(0, half);
        this.ctx.lineTo(half * 0.6, 0);
        this.ctx.closePath();
        this.ctx.fill();
    }
}
