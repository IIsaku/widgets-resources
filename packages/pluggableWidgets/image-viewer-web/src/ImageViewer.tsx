import { ValueStatus } from "mendix";
import { createElement, FunctionComponent, useCallback } from "react";
import { ImageViewerContainerProps } from "../typings/ImageViewerProps";
import { ImageViewer as ImageViewerComponent, ImageViewerImageProps } from "./components/ImageViewer/index";

function getImageProps({
    datasource,
    imageIcon,
    imageObject,
    imageUrl
}: ImageViewerContainerProps): ImageViewerImageProps {
    const fallback: ImageViewerImageProps = {
        type: "image",
        image: undefined
    };
    switch (datasource) {
        case "image":
            return {
                type: "image",
                image: imageObject?.status === ValueStatus.Available ? imageObject.value.uri : undefined
            };
        case "imageUrl":
            return {
                type: "image",
                image: imageUrl?.status === ValueStatus.Available ? imageUrl.value : undefined
            };
        case "icon": {
            if (imageIcon?.status === ValueStatus.Available) {
                if (imageIcon.value?.type === "glyph") {
                    return {
                        type: "icon",
                        image: imageIcon.value.iconClass
                    };
                }
                if (imageIcon.value?.type === "image") {
                    return {
                        type: "image",
                        image: imageIcon.value.iconUrl
                    };
                }
            }
            return fallback;
        }
        default:
            return fallback;
    }
}

export const ImageViewer: FunctionComponent<ImageViewerContainerProps> = props => {
    const onClick = useCallback(() => props.onClick?.execute(), [props.onClick]);
    const { type, image } = getImageProps(props);

    const altText = props.alternativeText?.status === ValueStatus.Available ? props.alternativeText.value : undefined;

    return (
        <ImageViewerComponent
            class={props.class}
            style={props.style}
            widthUnit={props.widthUnit}
            width={props.width}
            heightUnit={props.heightUnit}
            height={props.height}
            iconSize={props.iconSize}
            responsive={props.responsive}
            onClickType={props.onClickType}
            onClick={props.onClick ? onClick : undefined}
            type={type}
            image={image}
            altText={altText}
            displayAs={props.displayAs}
        />
    );
};
