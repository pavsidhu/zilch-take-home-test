import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { format, formatRelative } from "date-fns";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Purchase } from "../../store/purchases";

export type PurchasesListProps = {
  purchases: Purchase[];
};

export default function PurchasesList(props: PurchasesListProps) {
  const { purchases } = props;

  const insets = useSafeAreaInsets();

  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredPurchases = useMemo(() => {
    if (isSearching) {
      return purchases.filter((it) => it.name.startsWith(searchValue));
    } else {
      return purchases;
    }
  }, [searchValue, purchases]);

  return (
    <View
      style={{
        ...purchaseListStyles.root,
        paddingBottom: insets.bottom,
      }}
    >
      <View style={purchaseListStyles.top}>
        <View style={purchaseListStyles.header}>
          <Text style={purchaseListStyles.title}>Recent activity</Text>

          <Pressable
            role="button"
            aria-label={isSearching ? "Close" : "Search"}
            onPress={() => setIsSearching((prev) => !prev)}
          >
            <MaterialIcons
              name={isSearching ? "close" : "search"}
              size={24}
              color="#1b1b1b"
            />
          </Pressable>
        </View>

        {isSearching && (
          <TextInput
            autoFocus={true}
            placeholder="Search"
            value={searchValue}
            onChangeText={(text) => setSearchValue(text)}
            style={purchaseListStyles.searchInput}
            clearButtonMode="while-editing"
          />
        )}
      </View>

      {filteredPurchases.map((it) => (
        <PurchasesListItem key={it.id} purchase={it} />
      ))}
    </View>
  );
}

const purchaseListStyles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 24,
    backgroundColor: "white",
  },

  top: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    color: "#5e5e5e",
  },

  searchInput: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
});

type PurchasesListItemProps = {
  purchase: Purchase;
};

function PurchasesListItem(props: PurchasesListItemProps) {
  const { purchase } = props;

  const [priceWhole, priceFraction] = purchase.price.toFixed(2).split(".");

  return (
    <Link href={`/purchases/${purchase.id}`}>
      <View style={purchaseListItemStyles.root}>
        <Image style={purchaseListItemStyles.icon} />

        <View style={purchaseListItemStyles.details}>
          <Text numberOfLines={1} style={purchaseListItemStyles.name}>
            {purchase.name}
          </Text>

          <Text numberOfLines={1} style={purchaseListItemStyles.dateTime}>
            {purchase.createdAt
              ? formatRelative(purchase.createdAt, new Date())
              : format(purchase.createdAt, "p P")}
          </Text>
        </View>

        <View style={purchaseListItemStyles.priceContainer}>
          <Text style={purchaseListItemStyles.priceWhole}>{priceWhole}</Text>
          <Text style={purchaseListItemStyles.priceFraction}>
            .{priceFraction}
          </Text>
        </View>
      </View>
    </Link>
  );
}

const purchaseListItemStyles = StyleSheet.create({
  root: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  icon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
  },

  details: {
    flex: 1,
    gap: 2,
  },

  name: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1b1b1b",
  },

  dateTime: {
    fontSize: 14,
    color: "#5e5e5e",
  },

  priceContainer: {
    color: "#1b1b1b",
    flexDirection: "row",
    alignItems: "flex-end",
  },

  priceWhole: {
    fontSize: 20,
    fontWeight: "500",
    color: "#1b1b1b",
  },

  priceFraction: {
    fontSize: 16,
    fontWeight: "500",
    paddingBottom: 1,
  },
});
