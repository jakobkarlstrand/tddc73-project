import React, {
    ReactComponentElement,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    Button,
    Dimensions,
    Image,
    ScrollView,
    Text,
    View,
} from "react-native";
import { NativeComponentType } from "react-native/Libraries/Utilities/codegenNativeComponent";

/**
 * Returns the average of two numbers.
 *
 *
 * @param imgUrls - An array of strings, containing the url for each image
 * @param autoSlide - If true, it will automatically change image at a given interval. Default=false
 * @param interval - Set the interval of autoSlide (ms). Default=3000ms
 * @param loop - At the end of the array, slide to the beginning if loop is true. Default = true
 * @param showControls - Show slide controls
 * @param disableAutoslideOnManualSlide - If autoSlide is true --> Disable autoSlide when user manually slides
 * @param height - Height of images. Default = 300

 *
 * @beta
 */
export type CarouselProps = {
    imgUrls: string[];
    autoSlide?: boolean;
    interval?: number;
    loop?: boolean;
    showControls?: boolean;
    disableAutoslideOnManualSlide?: boolean;
    height?: number;
};
const win = Dimensions.get("window");
function Carousel({
    imgUrls = [],
    autoSlide = false,
    interval = 3000,
    loop = true,
    showControls = true,
    disableAutoslideOnManualSlide = true,
    height = 300,
}: CarouselProps) {
    const [page, setPage] = useState<number>(0);
    const ref: React.LegacyRef<ScrollView> = useRef(null);
    const [autoslideActive, setAutoslideActive] = useState<boolean>(autoSlide);
    const [intervalID, setIntervalID] = useState<NodeJS.Timer>();

    const disableAutoslide = () => {
        clearInterval(intervalID);
    };

    const slideLeft = () => {
        setPage((prev) => {
            if (prev - 1 < 0) {
                if (loop) {
                    return imgUrls.length - 1;
                } else {
                    return 0;
                }
            } else {
                return prev - 1;
            }
        });
    };

    const slideRight = () => {
        setPage((prev) => {
            if (prev + 1 >= imgUrls.length) {
                if (loop) {
                    return 0;
                } else {
                    return prev;
                }
            } else {
                return prev + 1;
            }
        });
    };

    useEffect(() => {
        ref.current?.scrollTo({ x: win.width * page, animated: true });
    }, [page]);

    useEffect(() => {
        if (!autoSlide) return;

        const id = setInterval(() => {
            slideRight();
        }, interval);

        setIntervalID(id);

        return () => {
            clearInterval(id);
        };
    }, []);
    return (
        <View
            style={{
                width: "100%",

                alignSelf: "center",
            }}
        >
            <ScrollView
                ref={ref}
                horizontal
                pagingEnabled
                disableIntervalMomentum
                onTouchStart={() => {
                    if (disableAutoslideOnManualSlide) disableAutoslide();
                }}
                onMomentumScrollEnd={(event) => {
                    setPage(
                        Math.round(
                            parseFloat(
                                //@ts-ignore
                                event.nativeEvent.contentOffset.x / win.width
                            )
                        )
                    );
                }}
            >
                {imgUrls.map((url, idx) => {
                    return (
                        <Image
                            resizeMode={"cover"}
                            style={{
                                width: win.width / 1,
                                height: height,
                            }}
                            key={idx}
                            source={{ uri: url }}
                        ></Image>
                    );
                })}
            </ScrollView>
            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "center",
                    marginTop: -20,
                }}
            >
                {imgUrls.map((_, idx) => {
                    return (
                        <View
                            key={idx}
                            style={{
                                width: 8,
                                height: 8,
                                backgroundColor:
                                    idx === page ? "white" : "gray",
                                borderRadius: 20000,
                                marginHorizontal: 2,
                            }}
                        ></View>
                    );
                })}
            </View>
            {showControls && (
                <View
                    style={{
                        position: "absolute",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#FFFA",
                            justifyContent: "center",

                            flexDirection: "row",
                            alignItems: "center",
                            padding: 4,
                        }}
                    >
                        <Button
                            title="<"
                            color="black"
                            onPress={() => {
                                slideLeft();
                                disableAutoslide();
                            }}
                        />
                    </View>
                </View>
            )}
            {showControls && (
                <View
                    style={{
                        position: "absolute",
                        height: "100%",
                        right: 0,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#FFFA",
                            justifyContent: "center",

                            flexDirection: "row",
                            alignItems: "center",
                            padding: 4,
                        }}
                    >
                        <Button
                            title=">"
                            color="black"
                            onPress={() => {
                                slideRight();
                                disableAutoslide();
                            }}
                        />
                    </View>
                </View>
            )}
        </View>
    );
}

export default Carousel;
