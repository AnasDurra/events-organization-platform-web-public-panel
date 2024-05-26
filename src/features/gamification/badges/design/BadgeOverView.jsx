import React from 'react';
import { BOTTOM_TYPES, CENTER_TYPES, HORIZONTAL_TYPES } from './constants';
import LayerCenterSharpPoly6 from './center/LayerCenterSharpPoly6';
import LayerCenterPoly8 from './center/LayerCenterPoly8';
import LayerCenterAlmostStar from './center/LayerCenterAlmostStar';
import LayerBottomStand from './bottom/LayerBottomStand';
import LayerBottomJewel from './bottom/LayerBottomJewel';
import LayerBottomWaterfall from './bottom/LayerBottomWaterfall';
import LayerHorizontal6Poly from './horizontal/LayerHorizontal6Poly';
import LayerHorizontalDetails from './horizontal/LayerHorizontalDetails';

export default function BadgeOverView({ layers, colors }) {
    const renderCenterLayer = () => {
        switch (layers.center) {
            case CENTER_TYPES.SHARP_POLY6:
                return <LayerCenterSharpPoly6 color={colors.center} />;
            case CENTER_TYPES.POLY8:
                return <LayerCenterPoly8 color={colors.center} />;
            case CENTER_TYPES.ALMOST_STAR:
                return <LayerCenterAlmostStar color={colors.center} />;
            default:
                return null;
        }
    };

    const renderHorizontalLayer = () => {
        switch (layers.horizontal) {
            case HORIZONTAL_TYPES.POLY6:
                return <LayerHorizontal6Poly color={colors.horizontal} />;
            case HORIZONTAL_TYPES.DETAILS:
                return <LayerHorizontalDetails color={colors.horizontal} />;
            default:
                return null;
        }
    };

    const renderBottomLayer = () => {
        switch (layers.bottom) {
            case BOTTOM_TYPES.STAND:
                return <LayerBottomStand color={colors.bottom} />;
            case BOTTOM_TYPES.JEWEL:
                return <LayerBottomJewel color={colors.bottom} />;
            case BOTTOM_TYPES.WATERFALL:
                return <LayerBottomWaterfall color={colors.bottom} />;
            default:
                return null;
        }
    };

    return (
        <>
            {renderCenterLayer()}
            {renderHorizontalLayer()}
            {renderBottomLayer()}
        </>
    );
}
