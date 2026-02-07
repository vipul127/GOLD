"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import Matter from "matter-js";
import { parsePath, getBounds } from "svg-path-commander";
import decomp from "poly-decomp";

// Define the Physics Context
const GravityContext = createContext<{
  registerBody: (id: string, body: Matter.Body, element: HTMLElement) => void;
  unregisterBody: (id: string) => void;
  engine: Matter.Engine | null;
} | null>(null);

export const useGravity = () => {
  const context = useContext(GravityContext);
  if (!context) {
    throw new Error("useGravity must be used within a Gravity provider");
  }
  return context;
};

interface GravityProps {
  children: React.ReactNode;
  gravity?: { x: number; y: number };
  debug?: boolean;
  resetOnResize?: boolean;
  grabCursor?: boolean;
  addTopWall?: boolean;
  autoStart?: boolean;
  className?: string;
}

export interface GravityRef {
  start: () => void;
  stop: () => void;
  reset: () => void;
}

export const Gravity = forwardRef<GravityRef, GravityProps>(
  (
    {
      children,
      gravity = { x: 0, y: 1 },
      debug = false,
      resetOnResize = true,
      grabCursor = true,
      addTopWall = true,
      autoStart = true,
      className = "",
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<Matter.Engine>(Matter.Engine.create());
    const runnerRef = useRef<Matter.Runner>(Matter.Runner.create());
    const renderRef = useRef<Matter.Render | null>(null);
    const bodiesMap = useRef<Map<string, { body: Matter.Body; element: HTMLElement }>>(new Map());
    const [isReady, setIsReady] = useState(false);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      start: () => {
        if (runnerRef.current && engineRef.current) {
          Matter.Runner.run(runnerRef.current, engineRef.current);
        }
      },
      stop: () => {
        if (runnerRef.current) {
          Matter.Runner.stop(runnerRef.current);
        }
      },
      reset: () => {
        // Implement reset logic: reposition bodies to their initial x/y
        // This requires storing initial positions in MatterBody
      },
    }));

    const registerBody = useCallback((id: string, body: Matter.Body, element: HTMLElement) => {
      bodiesMap.current.set(id, { body, element });
      Matter.World.add(engineRef.current.world, body);
    }, []);

    const unregisterBody = useCallback((id: string) => {
      const item = bodiesMap.current.get(id);
      if (item) {
        Matter.World.remove(engineRef.current.world, item.body);
        bodiesMap.current.delete(id);
      }
    }, []);

    useEffect(() => {
      if (!containerRef.current) return;

      const engine = engineRef.current;
      engine.gravity.x = gravity.x;
      engine.gravity.y = gravity.y;

      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;

      // Walls
      const ground = Matter.Bodies.rectangle(width / 2, height + 50, width, 100, { isStatic: true });
      const leftWall = Matter.Bodies.rectangle(-50, height / 2, 100, height, { isStatic: true });
      const rightWall = Matter.Bodies.rectangle(width + 50, height / 2, 100, height, { isStatic: true });
      const walls = [ground, leftWall, rightWall];
      
      if (addTopWall) {
        const topWall = Matter.Bodies.rectangle(width / 2, -50, width, 100, { isStatic: true });
        walls.push(topWall);
      }

      Matter.World.add(engine.world, walls);

      // Mouse constraint
      if (grabCursor) {
        const mouse = Matter.Mouse.create(containerRef.current);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.2,
            render: { visible: false },
          },
        });
        Matter.World.add(engine.world, mouseConstraint);
      }

      // Render for debug
      if (debug && canvasRef.current) {
        const render = Matter.Render.create({
          canvas: canvasRef.current,
          engine: engine,
          options: {
            width,
            height,
            wireframes: true,
            background: "transparent",
          },
        });
        renderRef.current = render;
        Matter.Render.run(render);
      }

      // Update Loop
      const update = () => {
        bodiesMap.current.forEach(({ body, element }) => {
          const { x, y } = body.position;
          const angle = body.angle;
          element.style.transform = `translate(${x - element.offsetWidth / 2}px, ${y - element.offsetHeight / 2}px) rotate(${angle}rad)`;
        });
        requestAnimationFrame(update);
      };

      if (autoStart) {
        Matter.Runner.run(runnerRef.current, engine);
        requestAnimationFrame(update);
      }

      setIsReady(true);

      return () => {
        Matter.Runner.stop(runnerRef.current);
        Matter.Engine.clear(engine);
        if (renderRef.current) {
          Matter.Render.stop(renderRef.current);
        }
      };
    }, [gravity.x, gravity.y, debug, grabCursor, addTopWall, autoStart]);

    return (
      <GravityContext.Provider value={{ registerBody, unregisterBody, engine: engineRef.current }}>
        <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
          {debug && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 pointer-events-none z-50"
            />
          )}
          {children}
        </div>
      </GravityContext.Provider>
    );
  }
);

Gravity.displayName = "Gravity";

interface MatterBodyProps {
  children: React.ReactElement;
  x?: number | string;
  y?: number | string;
  angle?: number;
  bodyType?: "rectangle" | "circle" | "svg";
  isDraggable?: boolean;
  sampleLength?: number;
  matterBodyOptions?: Matter.IBodyDefinition;
  className?: string;
}

export const MatterBody: React.FC<MatterBodyProps> = ({
  children,
  x = "50%",
  y = "50%",
  angle = 0,
  bodyType = "rectangle",
  isDraggable = true,
  sampleLength = 15,
  matterBodyOptions = {},
  className = "",
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const id = useRef(Math.random().toString(36).substr(2, 9));
  const { registerBody, unregisterBody } = useGravity();

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const parent = element.parentElement;
    if (!parent) return;

    const width = element.offsetWidth;
    const height = element.offsetHeight;

    // Calculate initial position
    let posX = typeof x === "string" ? (parseFloat(x) / 100) * parent.offsetWidth : x;
    let posY = typeof y === "string" ? (parseFloat(y) / 100) * parent.offsetHeight : y;

    let body: Matter.Body;

    if (bodyType === "circle") {
      body = Matter.Bodies.circle(posX, posY, Math.max(width, height) / 2, {
        ...matterBodyOptions,
        angle: (angle * Math.PI) / 180,
      });
    } else if (bodyType === "svg") {
      // Basic SVG support - this is complex, using a rectangle for now as a fallback
      // but ideally we'd use fromVertices
      body = Matter.Bodies.rectangle(posX, posY, width, height, {
        ...matterBodyOptions,
        angle: (angle * Math.PI) / 180,
      });
    } else {
      body = Matter.Bodies.rectangle(posX, posY, width, height, {
        ...matterBodyOptions,
        angle: (angle * Math.PI) / 180,
      });
    }

    registerBody(id.current, body, element);

    return () => {
      unregisterBody(id.current);
    };
  }, [registerBody, unregisterBody, x, y, angle, bodyType, matterBodyOptions]);

  return (
    <div
      ref={elementRef}
      className={`absolute top-0 left-0 will-change-transform ${!isDraggable ? "pointer-events-none" : "cursor-grab active:cursor-grabbing"} ${className}`}
      style={{ position: "absolute" }}
    >
      {children}
    </div>
  );
};
