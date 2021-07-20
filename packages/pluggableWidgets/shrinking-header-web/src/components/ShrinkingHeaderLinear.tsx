import { createElement, CSSProperties, ReactElement, ReactNode, useEffect, useState } from "react";
import classNames from "classnames";

import "../ui/ShrinkingHeader.scss";

export interface ShrinkingHeaderLinearProps {
    className?: string;
    style?: CSSProperties;
    tabIndex?: number;
    content?: ReactNode;
    initHeight: number;
    shrunkHeight: number;
}

export function ShrinkingHeaderLinear(props: ShrinkingHeaderLinearProps): ReactElement {
    const { className, style, tabIndex, content, initHeight, shrunkHeight } = props;

    const [headerHeight, setHeaderHeight] = useState<number>();

    const actualClassName = classNames("widget-shrinking-header", "widget-shrinking-header-linear", className);

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

    return (
        <div className={actualClassName} style={{ ...style, height: initHeight }} tabIndex={tabIndex}>
            <header style={{ height: headerHeight }}>{content}</header>
        </div>
    );
}
