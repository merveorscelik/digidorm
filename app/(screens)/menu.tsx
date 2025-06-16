import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

const menuItems = [
  { day: 'Monday', content: 'Soup, Chicken, Rice, Salad' },
  { day: 'Tuesday', content: 'Lentil Soup, Pasta, Yogurt' },
  { day: 'Wednesday', content: 'Ezogelin Soup, Meatballs, Bulgur' },
  { day: 'Thursday', content: 'Tarhana Soup, Fish, Greens' },
  { day: 'Friday', content: 'Soup, Kebab, Pilaf, Dessert' },
  { day: 'Saturday', content: 'Vegetable Soup, Pizza, Ayran' },
  { day: 'Sunday', content: 'Cream Soup, Chicken Wrap, Salad' },
];

const MenuScreen = () => {
  const [expandedDays, setExpandedDays] = useState({});

  const toggleExpand = (day) => {
    setExpandedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image source={require('../../assets/menu.png')} style={styles.floatingIcon} />
        <View style={styles.headerCard}>
          <Text style={styles.headerText}>Weekly Menu</Text>
        </View>
      </View>

      {/* Menu List */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {menuItems.map((item, index) => (
          <View key={index} style={styles.menuCard}>
            <TouchableOpacity onPress={() => toggleExpand(item.day)} style={styles.dayBox}>
              <Text style={styles.foodName}>{item.day}</Text>
              <View style={styles.arrowCircle}>
                <Text style={styles.arrow}>
                  {expandedDays[item.day] ? '▲' : '▼'}
                </Text>
              </View>
            </TouchableOpacity>
            {expandedDays[item.day] && (
              <Text style={styles.menuContent}>{item.content}</Text>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <NavIcon name="qr-code-outline" onPress={() => router.push('/qr')} />
        <NavIcon name="star-outline" onPress={() => router.push('/review')} />
        <NavIcon name="home-outline" onPress={() => router.push('/home')} />
        <NavIcon name="restaurant-outline" onPress={() => router.push('/menu')} />
        <NavIcon name="shirt-outline" onPress={() => router.push('/machineStatus')} />
      </View>
    </View>
  );
};

const NavIcon = ({ name, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 12 }}>
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
  floatingIcon: {
    width: 60,
    height: 60,
    marginBottom: -10,
    zIndex: 2,
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

  menuCard: {
    width: screenWidth * 0.9,
    backgroundColor: '#e6f2e3',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 10,
    elevation: 2,
    alignItems: 'center',
  },
  dayBox: {
    alignItems: 'center',
  },
  foodName: {
    fontSize: 24,
    color: '#2b2b2b',
    fontWeight: '700',
    textAlign: 'center',
  },
  arrowCircle: {
    backgroundColor: '#7BA982',
    borderRadius: 20,
    marginTop: 10,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  arrow: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  menuContent: {
    marginTop: 16,
    fontSize: 16,
    color: '#444',
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

export default MenuScreen;
