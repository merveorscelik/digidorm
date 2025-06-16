import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

const reviews = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    rating: 4,
    summary: 'Hizmet çok iyiydi!',
    detail: 'Yemekler çok lezzetliydi, servis hızlıydı. Tekrar tercih ederim.',
  },
  {
    id: 2,
    name: 'Elif Demir',
    rating: 5,
    summary: 'Harika bir deneyim',
    detail: 'Çalışanlar çok güler yüzlü ve ilgililerdi. Menü çeşitliliği çok iyiydi.',
  },
  {
    id: 3,
    name: 'Murat Kaya',
    rating: 3,
    summary: 'Orta düzey',
    detail: 'Fena değildi ama servis biraz yavaştı. Lezzet fena değil.',
  },
];

const MenuScreen = () => {
  const router = useRouter();
  const [expandedReviews, setExpandedReviews] = useState({});

  const toggleExpand = (id: number) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderStars = (count: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i < count ? 'star' : 'star-outline'}
          size={16}
          color="#f4c430"
          style={{ marginHorizontal: 1 }}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerCard}>
          <Text style={styles.headerText}>Reviews</Text>
        </View>
      </View>

      {/* Reviews List */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <TouchableOpacity onPress={() => toggleExpand(review.id)} style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>{review.name}</Text>
              <View style={styles.ratingRow}>{renderStars(review.rating)}</View>
              <Text style={styles.arrow}>{expandedReviews[review.id] ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            <Text style={styles.summaryText}>{review.summary}</Text>
            {expandedReviews[review.id] && (
              <Text style={styles.detailText}>{review.detail}</Text>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <NavIcon name="qr-code-outline" onPress={() => router.push('/(screens)/qr')} />
        <NavIcon name="star-outline" onPress={() => router.push('/(screens)/review')} />
        <NavIcon name="home-outline" onPress={() => router.push('/(screens)/home')} />
        <NavIcon name="restaurant-outline" onPress={() => router.push('/(screens)/menu')} />
        <NavIcon name="shirt-outline" onPress={() => router.push('/(screens)/machineStatus')} />
      </View>
    </View>
  );
};

const NavIcon = ({
  name,
  onPress,
}: {
  name: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress}>
    <Ionicons name={name} size={28} color="white" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerContainer: {
    backgroundColor: '#5f775c',
    paddingTop: 50,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 0,
  },
  headerCard: {
    backgroundColor: '#d4edc9',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignItems: 'center',
    width: '85%',
    zIndex: 1,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2b2b2b',
  },

  scrollContent: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 140,
  },

  reviewCard: {
    width: screenWidth * 0.9,
    backgroundColor: '#e6f2e3',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 10,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewerName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2b2b2b',
  },
  ratingRow: {
    flexDirection: 'row',
    marginHorizontal: 10,
    flex: 1,
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 18,
    color: '#7BA982',
    fontWeight: 'bold',
  },
  summaryText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    textAlign: 'center',
  },
  detailText: {
    marginTop: 12,
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    fontStyle: 'italic',
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#6e886c',
    padding: 14,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});

export default MenuScreen;
