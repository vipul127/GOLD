/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer, Decal } from '@react-three/drei';
import {
    BallCollider,
    CuboidCollider,
    Physics,
    RigidBody,
    useRopeJoint,
    useSphericalJoint,
    RigidBodyProps
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

// --- CONFIGURATION ---
// Adjust these values to change the ribbon lengths manually
const SHORT_BAND_START_Y = 6; // Increased length for top cards
const LONG_BAND_START_Y = 6.8;   // Decreased length for bottom cards

// --- DECAL CONFIGURATION ---
// Scale: [x (negative for horizontal flip), y, z]
const DECAL_SCALE: [number, number, number] = [-0.716, 1.13, 0.15];
// Position: [x, y, z] - Adjust y to move image up/down, z to project on back face
const DECAL_POSITION: [number, number, number] = [0, 0.585, 0.08];
// Rotation: [x, y, z] - Rotate to project on back face
const DECAL_ROTATION: [number, number, number] = [0, Math.PI, 0];

interface LanyardProps {
    position?: [number, number, number];
    gravity?: [number, number, number];
    fov?: number;
    transparent?: boolean;
}

// Stable array - defined once outside component to prevent useMemo invalidation
const CARD_TEXTURES = [
    'https://res.cloudinary.com/dft3midee/image/upload/v1770887799/1_hjzda4.png',
    'https://res.cloudinary.com/dft3midee/image/upload/v1770890700/6_xwvzvq.png',
    'https://res.cloudinary.com/dft3midee/image/upload/v1770887803/2_v9g43f.png',
    'https://res.cloudinary.com/dft3midee/image/upload/v1770887799/7_dbqdbn.png',
    'https://res.cloudinary.com/dft3midee/image/upload/v1770887799/3_fyil1l.png',
    'https://res.cloudinary.com/dft3midee/image/upload/v1770887799/8_wowpsw.png',
    'https://res.cloudinary.com/dft3midee/image/upload/v1770887798/4_vyfywu.png',
    'https://res.cloudinary.com/dft3midee/image/upload/v1770887800/9_l8eljg.png',
    'https://res.cloudinary.com/dft3midee/image/upload/v1770887798/5_f6nnxs.png',
    'https://res.cloudinary.com/dft3midee/image/upload/v1770887802/10_c861hx.png'
];

const CARD_COUNT = 10;
const CARD_SPACING = 0.87;

export default function Lanyard({
    position = [0, 0, 40],
    gravity = [0, -40, 0],
    fov = 20,
    transparent = false
}: LanyardProps) {
    const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' && window.innerWidth < 768);
    const [visibleCards, setVisibleCards] = useState<number>(0);
    const [isInView, setIsInView] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = (): void => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Detect when component comes into view
    useEffect(() => {
        if (!wrapperRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isInView) {
                        setIsInView(true);
                    }
                });
            },
            { threshold: 0.2 } // Trigger when 20% of component is visible
        );

        observer.observe(wrapperRef.current);

        return () => observer.disconnect();
    }, [isInView]);

    // Stagger card appearance - only after component is in view
    useEffect(() => {
        if (!isInView) return; // Don't start until visible

        const delay = 1000; // ms between each card appearance

        const timers: NodeJS.Timeout[] = [];
        for (let i = 0; i <= CARD_COUNT; i++) {
            const timer = setTimeout(() => {
                setVisibleCards(i);
            }, i * delay);
            timers.push(timer);
        }

        return () => timers.forEach(t => clearTimeout(t));
    }, [isInView]); // Only trigger when isInView changes to true

    return (
        <div className="lanyard-wrapper" ref={wrapperRef}>
            <Canvas
                camera={{ position, fov }}
                dpr={[1, isMobile ? 1.5 : 2]}
                gl={{ alpha: transparent }}
                onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
            >
                <ambientLight intensity={Math.PI} />
                <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60} key="physics-world">
                    <CardsRenderer visibleCards={visibleCards} isMobile={isMobile} />
                </Physics>
                <Environment blur={0.75}>
                    <Lightformer intensity={1} color="gold" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[50, 0.1, 1]} />
                    <Lightformer intensity={1} color="gold" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[50, 0.1, 1]} />
                    <Lightformer intensity={1} color="gold" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[50, 0.1, 1]} />
                    <Lightformer intensity={3} color="gold" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[50, 10, 1]} />
                </Environment>
            </Canvas>
        </div>
    );
}

// Component that lives inside Canvas and can use R3F hooks
function CardsRenderer({ visibleCards, isMobile }: { visibleCards: number; isMobile: boolean }) {
    // Pre-load ALL textures once - this hook needs to be inside Canvas
    const preloadedTextures = useTexture(CARD_TEXTURES);

    // Fix texture color space and properties to prevent overexposure
    useEffect(() => {
        preloadedTextures.forEach((texture) => {
            if (texture) {
                texture.colorSpace = THREE.SRGBColorSpace; // Correct color space
                texture.needsUpdate = true;
            }
        });
    }, [preloadedTextures]);

    const renderedCards = useMemo(() => {
        return Array.from({ length: CARD_COUNT }).map((_, i) => {
            const x = (i - (CARD_COUNT - 1) / 2) * CARD_SPACING;
            // Stagger Z to prevent collision/z-fighting
            const z = i % 2 === 0 ? 0 : -0.1;
            const rotation = Math.PI + Math.PI / 2;
            const preloadedTexture = preloadedTextures[i]; // Use pre-loaded texture

            // Only render if this card should be visible
            const isVisible = i < visibleCards;
            if (!isVisible) return null;

            // Alternate between Short and Long
            if (i % 2 === 0) {
                return <ShortBand key={`short-${i}`} isMobile={isMobile} x={x} z={z} rotation={rotation} userTexture={preloadedTexture} />;
            } else {
                return <LongBand key={`long-${i}`} isMobile={isMobile} x={x} z={z} rotation={rotation} userTexture={preloadedTexture} />;
            }
        });
    }, [visibleCards, isMobile, preloadedTextures]);

    return <>{renderedCards}</>;
}

interface BandProps {
    maxSpeed?: number;
    minSpeed?: number;
    isMobile?: boolean;
    x?: number;
    z?: number;
    rotation?: number;
    userTexture?: any; // Pre-loaded texture from parent
}

// ------ SHARED LOGIC ------

const useBandLogic = ({ maxSpeed = 50, minSpeed = 0, isMobile = false, pointCount = 5 }) => {
    const band = useRef<any>(null);
    const fixed = useRef<any>(null);
    const card = useRef<any>(null);
    const vec = new THREE.Vector3();
    const ang = new THREE.Vector3();
    const rot = new THREE.Vector3();
    const dir = new THREE.Vector3();

    // Exact number of points for curve
    const [curve] = useState(() => new THREE.CatmullRomCurve3(
        new Array(pointCount).fill(0).map(() => new THREE.Vector3())
    ));
    const [dragged, drag] = useState<false | THREE.Vector3>(false);
    const [hovered, hover] = useState(false);

    useEffect(() => {
        if (hovered) {
            document.body.style.cursor = dragged ? 'grabbing' : 'grab';
            return () => { document.body.style.cursor = 'auto'; };
        }
    }, [hovered, dragged]);

    return { band, fixed, card, vec, ang, rot, dir, curve, dragged, drag, hovered, hover };
};

const segmentProps: any = {
    type: 'dynamic' as RigidBodyProps['type'],
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4
};

// ------ SHORT BAND (4 segments -> 5 points) ------
function ShortBand({ isMobile = false, x = 0, z = 0, rotation = 0, userTexture }: BandProps) {
    // Points: Fixed, J1, J2, J3, J4 (Total 5)
    const { band, fixed, card, vec, ang, rot, dir, curve, dragged, drag, hovered, hover } = useBandLogic({ isMobile, pointCount: 5 });
    const j1 = useRef<any>(null);
    const j2 = useRef<any>(null);
    const j3 = useRef<any>(null);
    const j4 = useRef<any>(null);

    const cardGLB = '/lanyard/card.glb';
    const lanyardTexture = '/lanyard/lanyard.png';
    const { nodes, materials } = useGLTF(cardGLB) as any;
    const texture = useTexture(lanyardTexture);

    // userTexture is now pre-loaded and passed from parent - no individual loading needed

    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j3, j4, [[0, 0, 0], [0, 0, 0], 1]);
    useSphericalJoint(j4, card, [[0, 0, 0], [0, 1.25, 0]]);

    useFrame((state, delta) => {
        if (dragged && typeof dragged !== 'boolean') {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));
            [card, j1, j2, j3, j4, fixed].forEach(ref => ref.current?.wakeUp());
            if (card.current) {
                card.current.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
            }
        }
        if (fixed.current && j1.current && j2.current && j3.current && j4.current && band.current) {
            [j1, j2, j3, j4].forEach(ref => {
                if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
                const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
                ref.current.lerped.lerp(ref.current.translation(), delta * (0 + clampedDistance * 50));
            });

            // Curve points: J4 -> J3 -> J2 -> J1 -> Fixed
            curve.points[0].copy(j4.current.translation());
            curve.points[1].copy(j3.current.lerped);
            curve.points[2].copy(j2.current.lerped);
            curve.points[3].copy(j1.current.lerped);
            curve.points[4].copy(fixed.current.translation());

            band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));

            if (card.current) {
                ang.copy(card.current.angvel());
                rot.copy(card.current.rotation());
                card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
            }
        }
    });

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    if (!nodes?.card?.geometry) return null;

    const startY = SHORT_BAND_START_Y;

    return (
        <>
            <RigidBody ref={fixed} position={[x, startY, z]} {...segmentProps} type={'fixed' as RigidBodyProps['type']} />
            <RigidBody position={[x, startY - 0.5, z]} ref={j1} {...segmentProps} sleeping={true} type={'dynamic' as RigidBodyProps['type']}><BallCollider args={[0.1]} /></RigidBody>
            <RigidBody position={[x, startY - 1.0, z]} ref={j2} {...segmentProps} sleeping={true} type={'dynamic' as RigidBodyProps['type']}><BallCollider args={[0.1]} /></RigidBody>
            <RigidBody position={[x, startY - 1.5, z]} ref={j3} {...segmentProps} sleeping={true} type={'dynamic' as RigidBodyProps['type']}><BallCollider args={[0.1]} /></RigidBody>
            <RigidBody position={[x, startY - 2.0, z]} ref={j4} {...segmentProps} sleeping={true} type={'dynamic' as RigidBodyProps['type']}><BallCollider args={[0.1]} /></RigidBody>

            <RigidBody position={[x, startY - 2.5, z]} rotation={[0, rotation, 0]} ref={card} {...segmentProps} sleeping={true} type={dragged ? 'kinematicPosition' : 'dynamic'}>
                <CuboidCollider args={[0.7, 1.05, 0.01]} />
                <group scale={2} position={[0, -1.2, -0.05]} rotation={[0, 0, 0]}
                    onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}
                    onPointerUp={(e: any) => { e.target.releasePointerCapture(e.pointerId); drag(false); }}
                    onPointerDown={(e: any) => { e.target.setPointerCapture(e.pointerId); drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))); }}>
                    <mesh geometry={nodes.card.geometry}>
                        <meshPhysicalMaterial map={materials.base.map} map-anisotropy={16} clearcoat={1} roughness={0.9} metalness={0.8} />
                        {userTexture && (
                            <Decal position={DECAL_POSITION} rotation={DECAL_ROTATION} scale={DECAL_SCALE}>
                                <meshStandardMaterial
                                    map={userTexture}
                                    map-anisotropy={16}
                                    transparent
                                    polygonOffset
                                    polygonOffsetFactor={-1}
                                    roughness={1}
                                    metalness={0}
                                />
                            </Decal>
                        )}
                    </mesh>
                    <mesh geometry={nodes.clip.geometry} material={materials.metal} />
                    <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
                </group>
            </RigidBody>
            <mesh ref={band}><meshLineGeometry /><meshLineMaterial color="white" depthTest={false} resolution={[1000, 1000]} useMap map={texture} repeat={[-3, 1]} lineWidth={0.7} /></mesh>
        </>
    );
}

// ------ LONG BAND (7 segments -> 8 points) ------
function LongBand({ isMobile = false, x = 0, z = 0, rotation = 0, userTexture }: BandProps) {
    // Points: Fixed, J1..J7 (Total 8)
    const { band, fixed, card, vec, ang, rot, dir, curve, dragged, drag, hovered, hover } = useBandLogic({ isMobile, pointCount: 8 });
    const j1 = useRef<any>(null);
    const j2 = useRef<any>(null);
    const j3 = useRef<any>(null);
    const j4 = useRef<any>(null);
    const j5 = useRef<any>(null);
    const j6 = useRef<any>(null);
    const j7 = useRef<any>(null);

    const cardGLB = '/lanyard/card.glb';
    const lanyardTexture = '/lanyard/lanyard.png';
    const { nodes, materials } = useGLTF(cardGLB) as any;
    const texture = useTexture(lanyardTexture);

    // userTexture is now pre-loaded and passed from parent - no individual loading needed

    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j3, j4, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j4, j5, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j5, j6, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j6, j7, [[0, 0, 0], [0, 0, 0], 1]);
    useSphericalJoint(j7, card, [[0, 0, 0], [0, 1.25, 0]]);

    useFrame((state, delta) => {
        if (dragged && typeof dragged !== 'boolean') {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));
            [card, j1, j2, j3, j4, j5, j6, j7, fixed].forEach(ref => ref.current?.wakeUp());
            if (card.current) {
                card.current.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
            }
        }
        if (fixed.current && j1.current && j2.current && j3.current && j4.current && j5.current && j6.current && j7.current && band.current) {
            [j1, j2, j3, j4, j5, j6, j7].forEach(ref => {
                if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
                const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
                ref.current.lerped.lerp(ref.current.translation(), delta * (0 + clampedDistance * 50));
            });

            // Curve points: J7 -> J6 ... -> Fixed
            curve.points[0].copy(j7.current.translation());
            curve.points[1].copy(j6.current.lerped);
            curve.points[2].copy(j5.current.lerped);
            curve.points[3].copy(j4.current.lerped);
            curve.points[4].copy(j3.current.lerped);
            curve.points[5].copy(j2.current.lerped);
            curve.points[6].copy(j1.current.lerped);
            curve.points[7].copy(fixed.current.translation());

            band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));

            if (card.current) {
                ang.copy(card.current.angvel());
                rot.copy(card.current.rotation());
                card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
            }
        }
    });

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    if (!nodes?.card?.geometry) return null;

    const startY = LONG_BAND_START_Y;

    return (
        <>
            <RigidBody ref={fixed} position={[x, startY, z]} {...segmentProps} type={'fixed' as RigidBodyProps['type']} />
            <RigidBody position={[x, startY - 0.5, z]} ref={j1} {...segmentProps} sleeping={true} type={'dynamic' as RigidBodyProps['type']}><BallCollider args={[0.1]} /></RigidBody>
            <RigidBody position={[x, startY - 1.0, z]} ref={j2} {...segmentProps} sleeping={true} type={'dynamic' as RigidBodyProps['type']}><BallCollider args={[0.1]} /></RigidBody>
            <RigidBody position={[x, startY - 1.5, z]} ref={j3} {...segmentProps} sleeping={true} type={'dynamic' as RigidBodyProps['type']}><BallCollider args={[0.1]} /></RigidBody>
            <RigidBody position={[x, startY - 2.0, z]} ref={j4} {...segmentProps} sleeping={true} type={'dynamic' as RigidBodyProps['type']}><BallCollider args={[0.1]} /></RigidBody>
            <RigidBody position={[x, startY - 2.5, z]} ref={j5} {...segmentProps} sleeping={true} type={'dynamic' as RigidBodyProps['type']}><BallCollider args={[0.1]} /></RigidBody>
            <RigidBody position={[x, startY - 3.0, z]} ref={j6} {...segmentProps} sleeping={true} type={'dynamic' as RigidBodyProps['type']}><BallCollider args={[0.1]} /></RigidBody>
            <RigidBody position={[x, startY - 3.5, z]} ref={j7} {...segmentProps} sleeping={true} type={'dynamic' as RigidBodyProps['type']}><BallCollider args={[0.1]} /></RigidBody>

            <RigidBody position={[x, startY - 4.5, z]} rotation={[0, rotation, 0]} ref={card} {...segmentProps} sleeping={true} type={dragged ? 'kinematicPosition' : 'dynamic'}>
                <CuboidCollider args={[0.7, 1.05, 0.01]} />
                <group scale={2} position={[0, -1.2, -0.05]} rotation={[0, 0, 0]}
                    onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}
                    onPointerUp={(e: any) => { e.target.releasePointerCapture(e.pointerId); drag(false); }}
                    onPointerDown={(e: any) => { e.target.setPointerCapture(e.pointerId); drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))); }}>
                    <mesh geometry={nodes.card.geometry}>
                        <meshPhysicalMaterial map={materials.base.map} map-anisotropy={16} clearcoat={1} roughness={0.9} metalness={0.8} />
                        {userTexture && (
                            <Decal position={DECAL_POSITION} rotation={DECAL_ROTATION} scale={DECAL_SCALE}>
                                <meshStandardMaterial
                                    map={userTexture}
                                    map-anisotropy={16}
                                    transparent
                                    polygonOffset
                                    polygonOffsetFactor={-1}
                                    roughness={1}
                                    metalness={0}
                                />
                            </Decal>
                        )}
                    </mesh>
                    <mesh geometry={nodes.clip.geometry} material={materials.metal} />
                    <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
                </group>
            </RigidBody>
            <mesh ref={band}><meshLineGeometry /><meshLineMaterial color="white" depthTest={false} resolution={[1000, 1000]} useMap map={texture} repeat={[-3, 1]} lineWidth={0.7} /></mesh>
        </>
    );
}
