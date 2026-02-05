import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { GeometricShape3D } from './GeometricShape3D';

export const Hero3DBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                <Suspense fallback={null}>
                    {/* Multiple geometric shapes */}
                    <GeometricShape3D position={[-3, 2, -2]} color="#8b5cf6" shape="octahedron" />
                    <GeometricShape3D position={[3, -1, -3]} color="#06b6d4" shape="torus" />
                    <GeometricShape3D position={[-2, -2, -1]} color="#f472b6" shape="sphere" />
                    <GeometricShape3D position={[2, 1, -2]} color="#8b5cf6" shape="box" />
                    <GeometricShape3D position={[0, -3, -4]} color="#06b6d4" shape="octahedron" />
                </Suspense>
            </Canvas>
        </div>
    );
};
