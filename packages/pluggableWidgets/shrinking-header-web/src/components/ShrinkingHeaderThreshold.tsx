import { createElement, CSSProperties, ReactElement, ReactNode, useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { throttle } from "lodash-es";

import "../ui/ShrinkingHeader.scss";
import { useWrappingDivHeight } from "../utils/WrappingDivStyler";

export interface ShrinkingHeaderThresholdProps {
    rootElementRef?: (node: HTMLElement | null) => void;
    className?: string;
    style?: CSSProperties;
    tabIndex?: number;
    content?: ReactNode;
    shrinkThreshold: number;
}

export function ShrinkingHeaderThreshold(props: ShrinkingHeaderThresholdProps): ReactElement {
    const { rootElementRef, className, style, tabIndex, content, shrinkThreshold } = props;

    const [headerElement, setHeaderElement] = useState<HTMLElement>();
    const [shrunk, setShrunk] = useState(false);

    const actualClassName = classNames(
        "widget-shrinking-header",
        "widget-shrinking-header-threshold",
        {
            "widget-shrinking-header-shrunk": shrunk
        },
        className
    );

    const updateElement = useCallback(
        (node: HTMLElement | null) => {
            setHeaderElement(node ?? undefined);
            rootElementRef?.(node);
        },
        [rootElementRef, setHeaderElement]
    );

    useEffect(() => {
        const evaluateShrunkState = function (): void {
            if (window.scrollY >= shrinkThreshold) {
                setShrunk(true);
            } else {
                setShrunk(false);
            }
        };

        evaluateShrunkState();

        const onScroll = throttle(evaluateShrunkState, 250, { leading: true, trailing: true });

        document.addEventListener("scroll", onScroll);

        return () => {
            document.removeEventListener("scroll", onScroll);
        };
    }, [shrinkThreshold, setShrunk]);

    const wrappingDivHeight = useWrappingDivHeight(headerElement);

    return (
        <div className={actualClassName} style={{ ...style, height: wrappingDivHeight }} tabIndex={tabIndex}>
            <header ref={updateElement}>{content}</header>
        </div>
    );
}
