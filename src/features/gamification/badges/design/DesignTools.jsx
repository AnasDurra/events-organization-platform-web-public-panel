import React, { useState } from 'react';
import { Button, ColorPicker, Divider, Select } from 'antd';
import { CiPickerHalf } from 'react-icons/ci';
import { CENTER_TYPES, HORIZONTAL_TYPES, BOTTOM_TYPES, DECOR_TYPES } from './constants';
import ColorView from './ColorView';
import BadgeOverView from './BadgeOverView';

const niceColors = ['#fbaf51', '#ce355f', '#474f7f', '#e7a99d', '#a986af'];

export default function DesignTools({
    onCenterChange,
    onHorizontalChange,
    onBottomChange,
    onDecorChange,
    onCenterColorChange,
    onHorizontalColorChange,
    onBottomColorChange,
    onDecorColorChange,
    layers,
    colors,
}) {
    const [centerColor, setCenterColor] = useState('#123456');
    const [horizontalColor, setHorizontalColor] = useState('#123456');
    const [bottomColor, setBottomColor] = useState('#123456');
    const [decorColor, setDecorColor] = useState('#123456');

    const handleCenterColorChange = (color) => {
        setCenterColor(color);
        onCenterColorChange(color);
    };

    const handleHorizontalColorChange = (color) => {
        setHorizontalColor(color);
        onHorizontalColorChange(color);
    };

    const handleBottomColorChange = (color) => {
        setBottomColor(color);
        onBottomColorChange(color);
    };

    const handleDecorColorChange = (color) => {
        setDecorColor(color);
        onDecorColorChange(color);
    };

    const handleMagicClick = () => {
        const randomColor = () => niceColors[Math.floor(Math.random() * niceColors.length)];
        const randomCenterLayer = () =>
            Object.values(CENTER_TYPES)[Math.floor(Math.random() * Object.values(CENTER_TYPES).length)];
        const randomHorizontalLayer = () =>
            Object.values(HORIZONTAL_TYPES)[Math.floor(Math.random() * Object.values(HORIZONTAL_TYPES).length)];
        const randomBottomLayer = () =>
            Object.values(BOTTOM_TYPES)[Math.floor(Math.random() * Object.values(BOTTOM_TYPES).length)];
        const randomDecorLayer = () =>
            Object.values(DECOR_TYPES)[Math.floor(Math.random() * Object.values(DECOR_TYPES).length)];

        handleCenterColorChange(randomColor());
        handleHorizontalColorChange(randomColor());
        handleBottomColorChange(randomColor());
        handleDecorColorChange(randomColor());

        onCenterChange(randomCenterLayer());
        onHorizontalChange(randomHorizontalLayer());
        onBottomChange(randomBottomLayer());
        onDecorChange(randomDecorLayer());
    };

    return (
        <div className='flex flex-col space-y-8'>
            <Divider className='text-white'>Layers</Divider>

            <div className='flex w-full space-x-4 justify-center items-center'>
                <div className='flex space-x-2'>
                    {niceColors.map((color) => (
                        <ColorView
                            key={color}
                            color={color}
                            onClick={() => handleCenterColorChange(color)}
                        />
                    ))}
                </div>
                <ColorPicker
                    value={centerColor}
                    onChange={(color) => handleCenterColorChange(color.toHexString())}
                >
                    <Button
                        className='aspect-square w-full min-w-4'
                        type='primary'
                        icon={<CiPickerHalf />}
                    ></Button>
                </ColorPicker>
                <Select
                    variant='filled'
                    className='w-48'
                    placeholder={'Select Center Layer'}
                    onChange={onCenterChange}
                >
                    <Select.Option value={CENTER_TYPES.SHARP_POLY6}>Sharp Poly6</Select.Option>
                    <Select.Option value={CENTER_TYPES.POLY8}>Poly8</Select.Option>
                    <Select.Option value={CENTER_TYPES.ALMOST_STAR}>Almost Star</Select.Option>
                </Select>

                <div className='flex flex-col w-16 justify-center items-center scale-[0.2]'>
                    <BadgeOverView
                        layers={layers}
                        colors={{ center: 'red', bottom: 'gray', decor: 'gray', horizontal: 'gray' }}
                    ></BadgeOverView>
                </div>
            </div>

            <div className='flex w-full space-x-4 justify-center items-center'>
                <div className='flex space-x-2'>
                    {niceColors.map((color) => (
                        <ColorView
                            key={color}
                            color={color}
                            onClick={() => handleHorizontalColorChange(color)}
                        />
                    ))}
                </div>
                <ColorPicker
                    value={horizontalColor}
                    onChange={(color) => handleHorizontalColorChange(color.toHexString())}
                >
                    <Button
                        className='aspect-square w-full min-w-4'
                        type='primary'
                        icon={<CiPickerHalf />}
                    ></Button>
                </ColorPicker>
                <Select
                    variant='filled'
                    className='w-48'
                    placeholder={'Select Horizontal Layer'}
                    onChange={onHorizontalChange}
                >
                    <Select.Option value={HORIZONTAL_TYPES.POLY6}>6Poly</Select.Option>
                    <Select.Option value={HORIZONTAL_TYPES.DETAILS}>Details</Select.Option>
                    <Select.Option value={HORIZONTAL_TYPES.WING}>Wing</Select.Option>
                </Select>

                <div className='flex flex-col w-16 justify-center items-center scale-[0.2]'>
                    <BadgeOverView
                        layers={layers}
                        colors={{ center: 'gray', bottom: 'gray', decor: 'gray', horizontal: 'red' }}
                    ></BadgeOverView>
                </div>
            </div>

            <div className='flex w-full space-x-4 justify-center items-center'>
                <div className='flex space-x-2'>
                    {niceColors.map((color) => (
                        <ColorView
                            key={color}
                            color={color}
                            onClick={() => handleBottomColorChange(color)}
                        />
                    ))}
                </div>
                <ColorPicker
                    value={bottomColor}
                    onChange={(color) => handleBottomColorChange(color.toHexString())}
                >
                    <Button
                        className='aspect-square w-full min-w-4'
                        type='primary'
                        icon={<CiPickerHalf />}
                    ></Button>
                </ColorPicker>
                <Select
                    variant='filled'
                    className='w-48'
                    placeholder={'Select Bottom Layer'}
                    onChange={onBottomChange}
                >
                    <Select.Option value={BOTTOM_TYPES.STAND}>Stand</Select.Option>
                    <Select.Option value={BOTTOM_TYPES.JEWEL}>Jewel</Select.Option>
                    <Select.Option value={BOTTOM_TYPES.WATERFALL}>Waterfall</Select.Option>
                    <Select.Option value={BOTTOM_TYPES.FLAG}>Flag</Select.Option>
                </Select>
            </div>

            <div className='flex w-full space-x-4 justify-center items-center'>
                <div className='flex space-x-2'>
                    {niceColors.map((color) => (
                        <ColorView
                            key={color}
                            color={color}
                            onClick={() => handleDecorColorChange(color)}
                        />
                    ))}
                </div>
                <ColorPicker
                    value={decorColor}
                    onChange={(color) => handleDecorColorChange(color.toHexString())}
                >
                    <Button
                        className='aspect-square w-full min-w-4'
                        type='primary'
                        icon={<CiPickerHalf />}
                    ></Button>
                </ColorPicker>
                <Select
                    variant='filled'
                    className='w-48'
                    placeholder={'Select Decor Layer'}
                    onChange={onDecorChange}
                >
                    <Select.Option value={DECOR_TYPES.GEM}>Gem</Select.Option>
                    <Select.Option value={DECOR_TYPES.CRYSTAL}>Crystal</Select.Option>
                    <Select.Option value={DECOR_TYPES.GEM_CIRCULAR}>Circular Gem</Select.Option>
                </Select>
            </div>

            <Button
                className='w-full'
                type='primary'
                onClick={handleMagicClick}
            >
                MAGIC
            </Button>
        </div>
    );
}
