import React from 'react';
import './AnimationPrize.css'

const AnimatePrizeParticle = () => {
    return (
        <div
            className='AnimatePrizeParticle'
            style={{
                position: 'absolute',
                width: '2px',
                height: '2px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                animation: 'move 2s ease-in-out infinite',
            }}
        />
    );
};

export default AnimatePrizeParticle;
