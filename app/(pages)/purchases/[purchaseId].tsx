import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { purchasesAtom } from "../../../store/purchases";

export default function PurchaseItemPage() {
  const { purchaseId } = useLocalSearchParams();
  const navigation = useNavigation();

  const [purchases, setPurchases] = useAtom(purchasesAtom);

  const purchase = useMemo(
    () => purchases.find((it) => it.id === purchaseId),
    [purchases, purchaseId]
  );

  if (!purchase) throw new Error("Purchase not found");

  useEffect(() => {
    navigation.setOptions({ title: purchase.name });
  }, [purchase.name]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingName, setEditingName] = useState(purchase.name);

  function handleSave() {
    const parsedEditingName = editingName.trim();
    if (parsedEditingName === "") return;

    setPurchases((prev) =>
      prev.map((it) => {
        if (it.id !== purchaseId) return it;
        return { ...it, name: parsedEditingName };
      })
    );

    setEditingName("");
    setIsEditing(false);
  }

  return (
    <LinearGradient
      colors={["#00D287", "transparent"]}
      locations={[0, 0.3]}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.root}>
        <Image style={styles.icon} />

        {!isEditing && (
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{purchase.name}</Text>

            <MaterialIcons
              name="edit"
              size={24}
              onPress={() => {
                setEditingName(purchase.name);
                setIsEditing(true);
              }}
              suppressHighlighting={true}
            />
          </View>
        )}

        {isEditing && (
          <View
            style={{
              ...styles.nameContainer,
              backgroundColor: isEditing ? "#e3e3e3" : undefined,
            }}
          >
            <TextInput
              value={editingName}
              onChangeText={(text) => setEditingName(text)}
              style={styles.nameInput}
            />

            <MaterialIcons
              name="check"
              size={24}
              onPress={handleSave}
              suppressHighlighting={true}
            />
          </View>
        )}

        <Text style={styles.price}>£{purchase.price.toFixed(2)}</Text>
        <Text style={styles.dateTime}>
          Paid at {format(purchase.createdAt, "p P")}
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  root: {
    marginTop: 56,
    padding: 24,
    gap: 16,
  },

  icon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },

  nameContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: -8,
    marginHorizontal: -12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 8,
  },

  name: {
    flex: 1,
    fontSize: 24,
    fontWeight: "500",
    color: "#1b1b1b",
  },

  nameInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: "500",
    color: "#1b1b1b",
  },

  price: {
    fontSize: 18,
    color: "#1b1b1b",
  },

  dateTime: {
    fontSize: 16,
    color: "#5e5e5e",
  },
});
