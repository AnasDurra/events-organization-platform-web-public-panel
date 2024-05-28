import React from 'react';

export default function ColorView({ color, onClick }) {
    return (
        <div
            style={{
                backgroundColor: 'white',
              
                cursor: 'pointer',
                padding:'0.1em',
                borderRadius:'0.5em'
            }}
            onClick={() => onClick(color)}
        >
            <div
                style={{
                    backgroundColor: color,
                    width: '1.5em',
                    height: '1.5em',
                    borderRadius: '0.5em',
                    cursor: 'pointer',
                }}
            ></div>
        </div>
    );
}
