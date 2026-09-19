import { useState } from "react";
import { Image } from "expo-image";
import { Pressable, ScrollView, Text, View } from "react-native";
import Clock from "../../assets/icons/date.svg";
import Arrow from "../../assets/icons/proceed-arrow.svg";
import { styles } from "../styles/recentLocations.styles";

export default function RecentLocations({ items, query = "", onSelect }) {
  // Measure the container width only; do not scale the design.
  const [pageWidth, setPageWidth] = useState(0);
  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const pages = [];
  for (let index = 0; index < filtered.length; index += 3)
    pages.push(filtered.slice(index, index + 3));

  return (
    <View onLayout={(event) => setPageWidth(event.nativeEvent.layout.width)}>
      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            {query.trim()
              ? "No matching locations."
              : "No recently viewed locations yet."}
          </Text>
        </View>
      ) : (
        pageWidth > 0 && (
          // Show three complete cards per page, without a partial fourth card.
          <ScrollView
            key={`${pageWidth}-${query}`}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={pages.length > 1}
            scrollEnabled={pages.length > 1}
            keyboardShouldPersistTaps="handled"
          >
            {pages.map((page, pageIndex) => (
              <View key={pageIndex} style={[styles.page, { width: pageWidth }]}>
                {Array.from({ length: 3 }, (_, slot) => {
                  const item = page[slot];
                  if (!item)
                    return <View key={`empty-${slot}`} style={styles.slot} />;
                  return (
                    <Pressable
                      key={item.id ?? item.name}
                      accessibilityRole="button"
                      accessibilityLabel={`View ${item.name}`}
                      onPress={() => onSelect?.(item)}
                      style={({ pressed }) => [
                        styles.card,
                        pressed && styles.pressed,
                      ]}
                    >
                      <Image
                        source={item.image}
                        style={styles.photo}
                        contentFit="cover"
                      />

                      <View style={styles.timeRow}>
                        <Clock width={15} height={15} />
                        <Text style={styles.time}>{item.time}</Text>
                      </View>

                      <View style={styles.footer}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Arrow width={18} height={22} color="#AF2532" />
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </ScrollView>
        )
      )}
    </View>
  );
}
