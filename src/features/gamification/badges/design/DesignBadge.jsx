import React, { useState } from 'react';
import BadgeOverView from './BadgeOverView';
import { BOTTOM_TYPES, CENTER_TYPES, HORIZONTAL_TYPES, DECOR_TYPES } from './constants';
import DesignTools from './DesignTools';
import styles from './paper.module.css';
import { Button } from 'antd';
import { documentToSVG, elementToSVG, inlineResources } from 'dom-to-svg';

export default function DesignBadge() {
    const [centerLayer, setCenterLayer] = useState(CENTER_TYPES.SHARP_POLY6);
    const [horizontalLayer, setHorizontalLayer] = useState(HORIZONTAL_TYPES.DETAILS);
    const [bottomLayer, setBottomLayer] = useState(BOTTOM_TYPES.WATERFALL);
    const [decorLayer, setDecorLayer] = useState(DECOR_TYPES.GEM);
    const [centerColor, setCenterColor] = useState('#123456');
    const [horizontalColor, setHorizontalColor] = useState('#123456');
    const [bottomColor, setBottomColor] = useState('#123456');
    const [decorColor, setDecorColor] = useState('#123456');

    const downloadSvg = async () => {
        const svgElement = document.querySelector('#badge-svg');

        if (!svgElement) {
            console.error('SVG element not found');
            return;
        }

        const svgDocument = await elementToSVG(svgElement);
        await inlineResources(svgDocument.documentElement);

        const svgString = new XMLSerializer().serializeToString(svgDocument);
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'badge.svg';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className='w-full h-full'>
            <Button onClick={downloadSvg}>hi</Button>
            <div className='grid grid-cols-12 gap-10 h-full flex justify-center items-center'>
                <div
                    className={`${styles.paper} h-[50svh] col-start-3 col-span-4  flex justify-center items-center relative -z-10`}
                >
                    <div id='badge-svg' className='flex flex-col justify-center items-center'>
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
            </div>
        </div>
    );
}
