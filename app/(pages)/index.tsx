import { useAtomValue } from "jotai";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Card } from "../../components/Card/Card";
import PurchasesList from "../../components/PurchasesList/PurchasesList";
import { purchasesAtom } from "../../store/purchases";

export default function HomePage() {
  const purchases = useAtomValue(purchasesAtom);

  const dimensions = useWindowDimensions();

  const scrollY = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const cardContainerAnimatedStyle = useAnimatedStyle(() => {
    const multiplier = 0.25;

    const scale =
      (dimensions.height * multiplier - scrollY.value) /
      (dimensions.height * multiplier);

    return {
      transform: [{ scale: Math.max(scale, 0) }],
    };
  });

  return (
    <Animated.ScrollView
      onScroll={handleScroll}
      contentContainerStyle={{ minHeight: "100%" }}
    >
      <View style={styles.top}>
        <Animated.View
          style={[
            styles.cardContainer,
            cardContainerAnimatedStyle,
            { width: dimensions.width - 48 },
          ]}
        >
          <Card />
        </Animated.View>
      </View>

      <PurchasesList purchases={purchases} />
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  top: {
    marginTop: 96,
  },

  cardContainer: {
    marginHorizontal: 24,
    aspectRatio: 1.586 / 1,
    transformOrigin: "50% 100%",
  },
});
