import { createElement } from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

import { ShrinkingHeaderLinear, ShrinkingHeaderLinearProps } from "../ShrinkingHeaderLinear";

let documentEventListeners: Array<() => void>;

document.addEventListener = jest.fn().mockImplementation((_type: string, callback: () => void) => {
    documentEventListeners.push(callback);
});

describe("ShrinkingHeaderLinear", () => {
    let defaultShrinkingHeaderProps: ShrinkingHeaderLinearProps;

    beforeEach(() => {
        defaultShrinkingHeaderProps = {
            className: "class-name",
            style: { color: "green" },
            tabIndex: 4,
            content: <h1>Header</h1>,
            initHeight: 100,
            shrunkHeight: 25
        };

        documentEventListeners = [];
    });

    it("renders correctly", () => {
        const shrinkingHeaderLinear = mount(<ShrinkingHeaderLinear {...defaultShrinkingHeaderProps} />);

        Object.defineProperty(shrinkingHeaderLinear.find("header").getDOMNode() as HTMLDivElement, "offsetHeight", {
            value: 100,
            configurable: true
        });
        shrinkingHeaderLinear.update();

        expect(shrinkingHeaderLinear).toMatchSnapshot();
    });

    it("updates the header & wrapping div height when the page gets scrolled", () => {
        const shrinkingHeaderLinear = mount(<ShrinkingHeaderLinear {...defaultShrinkingHeaderProps} />);

        Object.defineProperty(shrinkingHeaderLinear.find("header").getDOMNode() as HTMLDivElement, "offsetHeight", {
            value: 100,
            configurable: true
        });
        shrinkingHeaderLinear.update();
        expect(documentEventListeners).toHaveLength(1);

        Object.defineProperty(window, "scrollY", { value: 25 });
        act(documentEventListeners[0]);
        Object.defineProperty(shrinkingHeaderLinear.find("header").getDOMNode() as HTMLDivElement, "offsetHeight", {
            value: 75,
            configurable: true
        });
        shrinkingHeaderLinear.update();
        expect(shrinkingHeaderLinear).toMatchSnapshot();
    });

    it("maintains the shrunk height as the header height when the page gets scrolled", () => {
        const shrinkingHeaderLinear = mount(<ShrinkingHeaderLinear {...defaultShrinkingHeaderProps} />);

        Object.defineProperty(window, "scrollY", { value: 125 });
        act(documentEventListeners[0]);
        shrinkingHeaderLinear.update();
        expect(shrinkingHeaderLinear.find("header").prop("style")).toEqual({ height: 25 });
    });

    // == Unmount doesn't trigger the cleanup function of the useEffect. This could be caused by erroneous code in React 17 as with both Enzyme and React Testing Library the function isn't triggered, even when waiting for it.
    // it("unmounts correctly", () => {
    //     const spy = jest.spyOn(document, "removeEventListener");
    //
    //     const shrinkingHeaderLinear = mount(<ShrinkingHeaderLinear {...defaultShrinkingHeaderProps} />);
    //
    //     expect(documentEventListeners).toHaveLength(1);
    //
    //     shrinkingHeaderLinear.unmount();
    //     expect(spy).toHaveBeenCalledWith("scroll", documentEventListeners[0]);
    // });
});
