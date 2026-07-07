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
import EmptyState from '@/components/EmptyState/EmptyState';
import { BookingResult } from '../types/booking';
import DoctorProfile from '../components/DoctorProfile';
import PrimaryButton from '@/components/Button/PrimaryButton';
import DoctorProfileSkeleton from '../components/DoctorProfileSkeleton';
import { useMergedSlots } from '../hooks/useMergedSlots';

type NavigationProp = NativeStackNavigationProp<
  ConsultationStackParamList,
  'DoctorDetail'
>;

const DoctorDetailScreen = () => {
  const route = useRoute<any>();
  const { bookAppointment, clearBookings } = useBooking();
  const navigation = useNavigation<NavigationProp>();

  const doctorId = route.params.doctorId;

  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [result, setResult] = useState<BookingResult | null>(null);
  const [checkSlot, setCheckSlot] = useState<Boolean>(false);

  const { data: doctor, isLoading } = useDoctor(doctorId);

  // const { data: slots = [] } = useSlots(doctorId);
  const { data: slots = [] } = useMergedSlots(doctorId);

  const availableSlots = useMemo(() => {
    return slots.filter(slot => slot.status === 'AVAILABLE');
  }, [slots]);

  console.log('Available slots:', availableSlots);
  const handleBook = useCallback(() => {
    if (!doctor) {
      return;
    }

    if (!selectedSlot) {
      Alert.alert('Select Slot', 'Please select a consultation slot first.');
      return;
    }

    const result = bookAppointment(doctor, selectedSlot);
    setResult(result);

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
    return <DoctorProfileSkeleton />;
  }

  if (availableSlots.length === 0 && checkSlot === true) {
    return <EmptyState title="No slots available" />;
  }

  return (
    <ScrollView>
      <DoctorProfile doctor={doctor!} />
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
      {availableSlots.length === 0 ? (
        <PrimaryButton
          title="Check Appointments"
          onPress={() => {
            setCheckSlot(!checkSlot);
          }}
        />
      ) : (
        <PrimaryButton
          title="Book Appointment"
          onPress={handleBook}
          disabled={!selectedSlot}
        />
      )}

      <PrimaryButton title="Clear Appointments" onPress={clearBookings} />
    </ScrollView>
  );
};

export default DoctorDetailScreen;
