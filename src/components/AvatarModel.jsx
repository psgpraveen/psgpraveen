import React, { useRef, useEffect, memo } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

// Preload models for faster switching
useGLTF.preload('/models/model (7).glb');
useGLTF.preload('/models/model (11).glb');
useGLTF.preload('/models/model (12).glb');
// Add more as needed

function AvatarModel(props) {
    const {
        num,
        scale = 1.3,
        position = [0, -1.1, 0],
        skinColor = 'red', // Default skin tone
        ...rest
    } = props;
    const group = useRef();
    const { scene, animations } = useGLTF(`/models/model (${num}).glb`);
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        if (actions && Object.keys(actions).length > 0) {
            const firstActionKey = Object.keys(actions)[0];
            actions[firstActionKey]?.play();
        } else {
            console.error('No animations found in the model');
        }
    }, [actions]);

    // Set skin tone after model loads
    useEffect(() => {
        if (!scene) return;
        scene.traverse((child) => {
            if (
                child.isMesh &&
                child.material &&
                child.material.name &&
                child.material.name.toLowerCase().includes('skin')
            ) {
                child.material.color.set(skinColor);
                child.material.needsUpdate = true;
            }
        });
    }, [scene, skinColor]);

    return (
        <group ref={group} {...rest}>
            <primitive object={scene} scale={scale} position={position} />
        </group>
    );
}

export default memo(AvatarModel);
