import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface GeometricShape3DProps {
    position: [number, number, number];
    color: string;
    shape: 'box' | 'sphere' | 'octahedron' | 'torus';
}

export const GeometricShape3D: React.FC<GeometricShape3DProps> = ({ position, color, shape }) => {
    const meshRef = useRef<Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Rotate shapes slowly
        meshRef.current.rotation.x += 0.003;
        meshRef.current.rotation.y += 0.005;

        // Subtle floating animation
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    });

    const renderGeometry = () => {
        switch (shape) {
            case 'box':
                return <boxGeometry args={[1, 1, 1]} />;
            case 'sphere':
                return <sphereGeometry args={[0.6, 32, 32]} />;
            case 'octahedron':
                return <octahedronGeometry args={[0.7]} />;
            case 'torus':
                return <torusGeometry args={[0.5, 0.2, 16, 100]} />;
        }
    };

    return (
        <mesh ref={meshRef} position={position}>
            {renderGeometry()}
            <meshStandardMaterial
                color={color}
                wireframe={true}
                opacity={0.3}
                transparent={true}
            />
        </mesh>
    );
};
