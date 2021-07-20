import { createElement, CSSProperties, ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";

import "../ui/ShrinkingHeader.scss";

export interface ShrinkingHeaderLinearProps {
    rootElementRef?: (node: HTMLElement | null) => void;
    className?: string;
    style?: CSSProperties;
    tabIndex?: number;
    content?: ReactNode;
    initHeight: number;
    shrunkHeight: number;
}

export function ShrinkingHeaderLinear(props: ShrinkingHeaderLinearProps): ReactElement {
    const { rootElementRef, className, style, tabIndex, content, initHeight, shrunkHeight } = props;

    const [headerHeight, setHeaderHeight] = useState<number>();

    const wrappingDivHeight = useRef(initHeight);
    const previousHeaderHeight = useRef(headerHeight);

    const actualClassName = classNames("widget-shrinking-header", "widget-shrinking-header-linear", className);

    const updateElement = useCallback(
        (node: HTMLElement | null) => {
            rootElementRef?.(node);
        },
        [rootElementRef]
    );

    useEffect(() => {
        const updateHeaderHeight = function (): void {
            let headerHeight;

            if (window.scrollY > initHeight - shrunkHeight) {
                headerHeight = initHeight - (initHeight - shrunkHeight);
            } else if (window.scrollY < 0) {
                headerHeight = initHeight;
            } else {
                headerHeight = initHeight - window.scrollY;
            }

            setHeaderHeight(headerHeight);
        };

        updateHeaderHeight();

        document.addEventListener("scroll", updateHeaderHeight);

        return () => {
            document.removeEventListener("scroll", updateHeaderHeight);
        };
    }, [initHeight, shrunkHeight, setHeaderHeight]);

    if (headerHeight !== previousHeaderHeight.current) {
        previousHeaderHeight.current = headerHeight;

        if (initHeight !== wrappingDivHeight.current) {
            wrappingDivHeight.current = initHeight;
        }
    }

    return (
        <div className={actualClassName} style={{ ...style, height: wrappingDivHeight.current }} tabIndex={tabIndex}>
            <header ref={updateElement} style={{ height: headerHeight }}>
                {content}
            </header>
        </div>
    );
}
