import React, { useState } from 'react';
import BadgeOverView from './BadgeOverView';
import { BOTTOM_TYPES, CENTER_TYPES, HORIZONTAL_TYPES } from './constants';
import DesignTools from './DesignTools';

export default function DesignBadge() {
    const [centerLayer, setCenterLayer] = useState(CENTER_TYPES.SHARP_POLY6);
    const [horizontalLayer, setHorizontalLayer] = useState(HORIZONTAL_TYPES.DETAILS);
    const [bottomLayer, setBottomLayer] = useState(BOTTOM_TYPES.WATERFALL);
    const [centerColor, setCenterColor] = useState('#123456');
    const [horizontalColor, setHorizontalColor] = useState('#123456');
    const [bottomColor, setBottomColor] = useState('#123456');

    return (
        <div className='w-full h-full'>
            <div className='grid grid-cols-12 h-full'>
                <div className='col-start-3 col-span-4 bg-blue-400/60 flex justify-center items-center relative -z-10'>
                    <BadgeOverView
                        layers={{
                            center: centerLayer,
                            horizontal: horizontalLayer,
                            bottom: bottomLayer,
                        }}
                        colors={{
                            center: centerColor,
                            horizontal: horizontalColor,
                            bottom: bottomColor,
                        }}
                    />
                </div>
                <div className='col-span-4 bg-red-400/60 flex justify-center items-center'>
                    <DesignTools
                        onCenterChange={(value) => setCenterLayer(value)}
                        onHorizontalChange={(value) => setHorizontalLayer(value)}
                        onBottomChange={(value) => setBottomLayer(value)}
                        onCenterColorChange={setCenterColor}
                        onHorizontalColorChange={setHorizontalColor}
                        onBottomColorChange={setBottomColor}
                    />
                </div>
            </div>
        </div>
    );
}
