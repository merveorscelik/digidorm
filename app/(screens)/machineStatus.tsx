import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFormatedDate } from 'react-native-modern-datepicker';
import DatePickerModal, { SelectedDate } from '../../components/DatePickerModal';
import axios from 'axios';
import { useRouter } from 'expo-router';

const moment = require("moment");

const machineStateImage = {
  'Done': require('../../assets/done.png'),
  'Working': require('../../assets/working.png'),
  'Broken': require('../../assets/broken.png'),
  'Available': require('../../assets/available.png'),
};

interface Booking {
  bookingDate: string;
}

type MachineState = 'Done' | 'Working' | 'Broken' | 'Available';

interface Machine {
  status: MachineState;
  name: string;
  bookings: Booking[];
  markedDates: SelectedDate[];
  machineImage?: any;
}

const MachineStatusScreen = () => {
  const router = useRouter();

  const today = new Date();
  const defaultDate = getFormatedDate(
    new Date(today.setDate(today.getDate() + 1)),
    'YYYY/MM/DD'
  );

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('12/12/2023');
  const [selectedMachineIndex, setSelectedMachineIndex] = useState<number | null>(null);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [currentMarkedDates, setCurrentMarkedDates] = useState<SelectedDate[]>([]);

  const fetchMachines = async () => {
    axios.get('http://localhost:3000/api/utillities/washing-machines')
      .then(res => {
        const { data } = res.data;

        setMachines(data.map(d => ({
          ...d,
          machineImage: machineStateImage[d?.status],
          markedDates: d.bookings.map((booking: Booking) => ({
            selectionType: "booked",
            date: booking.bookingDate
          }))
        })));
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Error fetching machines', err.message || 'Unknown error');
      });
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  const onDateSelected = (day: { dateString: string }) => {
    const e = day.dateString;

    if (selectedMachineIndex === null) {
      return Alert.alert("Please select a machine first.");
    }

    const selectedMachine = machines[selectedMachineIndex];
    if (!selectedMachine) {
      return Alert.alert("Machine not found");
    }

    const bookings = selectedMachine.bookings.map(d => d.bookingDate);
    const selectedDateMoment = moment(e, 'YYYY/MM/DD');

    const isDateBooked = bookings.some(d => moment(d).format('YYYY-MM-DD') === selectedDateMoment.format('YYYY-MM-DD'));
    if (isDateBooked) {
      console.log('date is booked');
      return;
    }

    const markedDateIndex = selectedMachine.markedDates.findIndex(d =>
      selectedDateMoment.format('YYYY/MM/DD') === moment(d.date).format('YYYY/MM/DD')
    );

    if (markedDateIndex === -1) {
      const newSelection = {
        date: selectedDateMoment.format('YYYY-MM-DD'),
        selectionType: 'selected'
      };

      setCurrentMarkedDates(prev => {
        const newMarkedDates = [...prev, newSelection];

        setMachines(machines.map((m, i) => {
          if (i === selectedMachineIndex) {
            return {
              ...m,
              markedDates: newMarkedDates,
            };
          }
          return m;
        }));

        return newMarkedDates;
      });
    }
  };

  const handleMachinePress = (index: number) => {
    const selected = machines[index];

    if (!selected) {
      return Alert.alert("There's no machine with that index.");
    }

    if (selected.status === "Broken") {
      return Alert.alert("Machine is broken currently.");
    }

    setCurrentMarkedDates(selected.markedDates);
    setSelectedMachineIndex(index);
    setOpenDatePicker(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image source={require('../../assets/done.png')} style={styles.floatingIcon} />
        <View style={styles.headerCard}>
          <Text style={styles.headerText}>Machines Status</Text>
        </View>
      </View>

      {/* Machine Grid */}
      <ScrollView contentContainerStyle={styles.gridContainer}>
        {machines.map((item, index) => (
          <View key={index} style={styles.cardWrapper}>
            <View
              style={[
                styles.statusDot,
                {
                  backgroundColor:
                    item.status === 'Broken'
                      ? '#e74c3c'
                      : item.status === 'Working'
                        ? '#f1c40f'
                        : '#2ecc71',
                },
              ]}
            />
            <TouchableOpacity style={styles.machineCard} onPress={() => handleMachinePress(index)}>
              <Image source={item.machineImage} style={styles.machineImage} resizeMode="contain" />
              <Text style={styles.machineLabel}>{item.status}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Overlay */}
      {openDatePicker && <View style={styles.overlay} />}

      {/* Date Picker Modal */}
      <DatePickerModal
        open={openDatePicker}
        startDate={defaultDate}
        selectedDate={selectedDate}
        onClose={() => setOpenDatePicker(false)}
        onChangeStartDate={(date) => onDateSelected(date)}
        selectedDates={currentMarkedDates}
      />

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
    backgroundColor: '#ffffff',
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
  gridContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 120,
  },
  cardWrapper: {
    width: '47%',
    marginBottom: 20,
    alignItems: 'center',
    position: 'relative',
  },
  machineCard: {
    backgroundColor: '#5f775c',
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    padding: 12,
  },
  machineImage: {
    width: 80,
    height: 80,
  },
  machineLabel: {
    marginTop: 8,
    fontWeight: '500',
    color: '#fff',
  },
  statusDot: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    zIndex: 10,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#6e886c',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 14,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 5,
  },
});

export default MachineStatusScreen;
