import React, { useState } from 'react';
import BadgeOverView from './BadgeOverView';
import { BOTTOM_TYPES, CENTER_TYPES, HORIZONTAL_TYPES, DECOR_TYPES } from './constants';
import DesignTools from './DesignTools';
import styles from './paper.module.css';

export default function DesignBadge() {
    const [centerLayer, setCenterLayer] = useState(CENTER_TYPES.SHARP_POLY6);
    const [horizontalLayer, setHorizontalLayer] = useState(HORIZONTAL_TYPES.DETAILS);
    const [bottomLayer, setBottomLayer] = useState(BOTTOM_TYPES.WATERFALL);
    const [decorLayer, setDecorLayer] = useState(DECOR_TYPES.GEM);
    const [centerColor, setCenterColor] = useState('#123456');
    const [horizontalColor, setHorizontalColor] = useState('#123456');
    const [bottomColor, setBottomColor] = useState('#123456');
    const [decorColor, setDecorColor] = useState('#123456');

    return (
        <div className='w-full h-full'>
            <div className='grid grid-cols-12 h-full flex justify-center items-center'>
                <div
                    className={`${styles.paper} h-[50svh] col-start-3 col-span-4 bg-blue-400/60 flex justify-center items-center relative -z-10`}
                >
                    <BadgeOverView
                        layers={{
                            center: centerLayer,
                            horizontal: horizontalLayer,
                            bottom: bottomLayer,
                            decor: decorLayer,
                        }}
                        colors={{
                            center: centerColor,
                            horizontal: horizontalColor,
                            bottom: bottomColor,
                            decor: decorColor,
                        }}
                    />
                </div>
                <div className='col-span-4 flex justify-center items-center'>
                    <DesignTools
                        onCenterChange={(value) => setCenterLayer(value)}
                        onHorizontalChange={(value) => setHorizontalLayer(value)}
                        onBottomChange={(value) => setBottomLayer(value)}
                        onDecorChange={(value) => setDecorLayer(value)}
                        onCenterColorChange={setCenterColor}
                        onHorizontalColorChange={setHorizontalColor}
                        onBottomColorChange={setBottomColor}
                        onDecorColorChange={setDecorColor}
                    />
                </div>
            </div>
        </div>
    );
}
