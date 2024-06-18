import React, { useState, useEffect } from 'react';
import './AnimationPrize.css';
import { animated, useSpring, useSprings } from '@react-spring/web';
import Confetti from 'react-confetti';

const AnimationPrizeBadge = ({ collected, svgContent }) => {
    const [isCollected, setIsCollected] = useState(collected);
    const [particleProps, setParticleProps] = useState([]);

    const badgeAnimation = useSpring({
        opacity: isCollected ? 1 : 0,
        transform: isCollected ? 'scale(1)' : 'scale(0.2)',
        config: { duration: 1000 },
    });

    useEffect(() => {
        setIsCollected(collected);
        if (collected) {
            const particles = Array.from({ length: 200 }, () => ({
                opacity: 1,
                transform: `translate3d(${Math.random() * 100 - 50}vw, ${
                    Math.random() * 100 - 50
                }vh, 0) scale(${Math.random()})`,
            }));
            setParticleProps(particles);
        }
    }, [collected]);

    const particleSprings = useSprings(
        particleProps.length,
        particleProps.map((props, index) => ({
            opacity: collected ? 0 : props.opacity,
            transform: collected ? 'translate3d(0, 0, 0) scale(0)' : props.transform,
            config: { duration: 1500 },
            delay: index * 10,
        }))
    );

    return (
        <div className='badge-container'>
            <animated.div
                style={badgeAnimation}
                className='badge'
            >
                <img
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`}
                    className='badge-image'
                />
            </animated.div>
            {!isCollected && (
                <div className='particles-container'>
                    {particleSprings.map((props, index) => (
                        <animated.div
                            key={index}
                            style={props}
                            className='particle'
                        />
                    ))}
                </div>
            )}
            {isCollected && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    style={{ position: 'absolute', top: 0 }}
                    numberOfPieces={400}
                    //gravity={-0.1} // Negative gravity to simulate wind from below
                    //initialVelocityY={-15} // Adjust for horizontal wind effect
                    recycle={true}
                />
            )}
        </div>
    );
};

export default AnimationPrizeBadge;
