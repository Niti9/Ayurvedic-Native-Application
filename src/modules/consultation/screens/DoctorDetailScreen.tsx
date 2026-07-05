import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  ScrollView,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

import { useDoctor } from '../hooks/useDoctors';
import { useSlots } from '../hooks/useSlots';

import SlotCard from '../components/SlotCard';
import { Slot } from '../types/slot';
import { useBooking } from '../hooks/useBooking';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ConsultationStackParamList } from '@/navigation/types';

type NavigationProp = NativeStackNavigationProp<
  ConsultationStackParamList,
  'DoctorDetail'
>;

const DoctorDetailScreen = () => {
  const route = useRoute<any>();
  const { bookAppointment } = useBooking();
  const navigation = useNavigation<NavigationProp>();

  const doctorId = route.params.doctorId;

  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const { data: doctor, isLoading } = useDoctor(doctorId);

  const { data: slots = [] } = useSlots(doctorId);
  const availableSlots = useMemo(() => {
    return slots.filter(slot => slot.status === 'AVAILABLE');
  }, [slots]);

  const handleBook = useCallback(() => {
    if (!doctor) {
      return;
    }

    if (!selectedSlot) {
      Alert.alert('Select Slot', 'Please select a consultation slot first.');
      return;
    }

    const result = bookAppointment(doctor, selectedSlot);

    Alert.alert(result.success ? 'Success' : 'Booking Failed', result.message);

    if (!result.success) {
      console.log(result.message);
      // Later we'll replace with Global Toast

      return;
    }

    navigation.navigate('UpcomingBooking');
  }, [doctor, selectedSlot, bookAppointment, navigation]);

  const handleSlotPress = useCallback((slot: Slot) => {
    setSelectedSlot(slot);
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView>
      <Text>{doctor?.name}</Text>

      <Text>{doctor?.title}</Text>

      <FlatList
        data={availableSlots}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <SlotCard
            slot={item}
            selected={selectedSlot?.id === item.id}
            onPress={handleSlotPress}
          />
        )}
      />

      <Button
        title="Book Appointment"
        disabled={!selectedSlot}
        onPress={handleBook}
      />
    </ScrollView>
  );
};

export default DoctorDetailScreen;
