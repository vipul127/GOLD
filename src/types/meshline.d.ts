import { Object3DNode } from '@react-three/fiber';
import * as THREE from 'three';

declare module 'meshline' {
    export class MeshLineGeometry extends THREE.BufferGeometry {
        setPoints(points: Array<number | THREE.Vector3>, wcb?: (p: number) => any): void;
    }
    export class MeshLineMaterial extends THREE.Material {
        constructor(parameters?: any);
        color: THREE.Color;
        map: THREE.Texture;
        useMap: number;
        alphaMap: THREE.Texture;
        useAlphaMap: number;
        repeat: THREE.Vector2;
        dashArray: number;
        dashOffset: number;
        dashRatio: number;
        resolution: THREE.Vector2;
        sizeAttenuation: number;
        lineWidth: number;
        depthTest?: boolean;
    }
}

declare module '@react-three/fiber' {
    interface ThreeElements {
        meshLineGeometry: Object3DNode<import('meshline').MeshLineGeometry, typeof import('meshline').MeshLineGeometry>;
        meshLineMaterial: Object3DNode<import('meshline').MeshLineMaterial, typeof import('meshline').MeshLineMaterial>;
    }
}
