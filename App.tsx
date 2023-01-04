import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Carousel, { CarouselProps } from "./components/Carousel";
import PasswordStrengthMeter from "./components/PasswordStrengthMeter";

export default function App() {
    return (
        <View style={styles.container}>
            <Carousel
                imgUrls={[
                    "https://media.istockphoto.com/id/844926996/photo/historical-textile-industrial-area-in-norrkoping-sweden.jpg?s=612x612&w=0&k=20&c=BYePNjb7HuUlYfl6NMQByCKpUWyBtFfa3GP-tRk1RTs=",
                    "https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg",
                    "https://media.istockphoto.com/id/844926996/photo/historical-textile-industrial-area-in-norrkoping-sweden.jpg?s=612x612&w=0&k=20&c=BYePNjb7HuUlYfl6NMQByCKpUWyBtFfa3GP-tRk1RTs=",
                    "https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg",
                ]}
                interval={4000}
                autoSlide
                loop={true}
                disableAutoslideOnManualSlide={true}
                showControls={false}
            />
            <View style={{ height: 200 }}></View>
            <PasswordStrengthMeter
                onChange={(s: string) => console.log("PASS", s)}
                showFeedbackText
                minLength={4}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
});
