import { createElement, ReactElement } from "react";

import { ShrinkingHeaderThreshold } from "./components/ShrinkingHeaderThreshold";
import { ShrinkingHeaderLinear } from "./components/ShrinkingHeaderLinear";

import { ShrinkingHeaderContainerProps } from "../typings/ShrinkingHeaderProps";

export default function ShrinkingHeader(props: ShrinkingHeaderContainerProps): ReactElement | null {
    const { threshold, shrinkThreshold, initHeight, shrunkHeight, ...commonProps } = props;

    if (threshold) {
        const actualShrinkThreshold = shrinkThreshold.value ? Number(shrinkThreshold.value.toString()) : undefined;

        if (!actualShrinkThreshold) {
            return null;
        }

        return (
            <ShrinkingHeaderThreshold
                {...commonProps}
                className={commonProps.class}
                shrinkThreshold={actualShrinkThreshold}
            />
        );
    }

    const actualInitHeight = initHeight.value ? Number(initHeight.value.toString()) : undefined;
    const actualShrunkHeight = shrunkHeight.value ? Number(shrunkHeight.value.toString()) : undefined;

    if (!actualInitHeight || !actualShrunkHeight) {
        return null;
    }

    return (
        <ShrinkingHeaderLinear
            {...commonProps}
            className={commonProps.class}
            initHeight={actualInitHeight}
            shrunkHeight={actualShrunkHeight}
        />
    );
}
