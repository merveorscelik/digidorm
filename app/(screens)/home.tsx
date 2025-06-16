import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@/providers/user-provider';
import { router } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

const newsItems = [
  { id: 1, title: 'Yeni Yıkama Makinesi Geldi', description: 'Çamaşırhanemize yeni bir makine ekledik. Daha hızlı ve sessiz çalışıyor.' },
  { id: 2, title: 'Menü Güncellendi', description: 'Bu hafta menümüzde vegan seçenekler arttı. Denemeyi unutmayın!' },
  { id: 3, title: 'Bakım Çalışması', description: 'Gelecek Pazar tüm cihazlarda bakım yapılacaktır, lütfen planlama yapınız.' },
];

const HomeScreen = () => {
  const { user } = useUser();
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const goPrevious = () => {
    setCurrentNewsIndex((prev) => (prev === 0 ? newsItems.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentNewsIndex((prev) => (prev === newsItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBackground}>
        <View style={styles.greetingBox}>
          <Text style={styles.helloText}>Hello {user?.name || "No name"} </Text>
          <Text style={styles.subText}>What are you planning to do?</Text>
          <View style={styles.profileCircle} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => router.push("/(screens)/machineStatus")}>
            <IconCard title="Washing Machine" icon={require('../../assets/washing.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(screens)/menu")}>
            <IconCard title="Menu" icon={require('../../assets/menu.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.iconRow}>
          <IconCard title="In/Out" icon={require('../../assets/inout.png')} />
          <IconCard title="Review" icon={require('../../assets/review.png')} />
        </View>

        {/* Haberler Slider */}
        <View style={styles.middleCard}>
          <TouchableOpacity onPress={goPrevious} style={styles.arrowButton}>
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>

          <View style={styles.newsTextContainer}>
            <Text style={styles.newsHeadline}>{newsItems[currentNewsIndex].title}</Text>
            <Text style={styles.newsDescription}>{newsItems[currentNewsIndex].description}</Text>
            <Text style={styles.newsCounter}>{`${currentNewsIndex + 1} / ${newsItems.length}`}</Text>
          </View>

          <TouchableOpacity onPress={goNext} style={styles.arrowButton}>
            <Ionicons name="chevron-forward" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Alt Navigasyon */}
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

const IconCard = ({ title, icon }: { title: string; icon: any }) => (
  <View style={styles.iconCard}>
    <Image source={icon} style={{ width: 60, height: 60 }} />
    <Text style={styles.iconLabel}>{title}</Text>
  </View>
);

const NavIcon = ({ name, onPress }: { name: any; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress}>
    <Ionicons name={name} size={28} color="white" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerBackground: {
    backgroundColor: '#5f775c',
    paddingTop: 80,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 0,
  },
  greetingBox: {
    backgroundColor: '#d4edc9',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: 16,
    paddingHorizontal: 40,
    width: '85%',
    zIndex: 1,
  },
  helloText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2b2b2b',
  },
  subText: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  profileCircle: {
    position: 'absolute',
    top: 10,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#888',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },
  iconCard: {
    width: (screenWidth - 60) / 2,
    alignItems: 'center',
    backgroundColor: '#5f775c',
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  iconLabel: {
    marginTop: 10,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  middleCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#5f775c',
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '90%',
    marginVertical: 20,
    alignItems: 'center',
  },
  arrowButton: {
    paddingHorizontal: 10,
  },
  newsTextContainer: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  newsHeadline: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 6,
    textAlign: 'center',
  },
  newsDescription: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  newsCounter: {
    marginTop: 10,
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
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

export default HomeScreen;
