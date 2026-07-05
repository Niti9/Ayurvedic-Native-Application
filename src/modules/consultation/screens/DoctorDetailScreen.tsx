import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  ScrollView,
  Text,
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import { useDoctor } from '../hooks/useDoctors';
import { useSlots } from '../hooks/useSlots';

import SlotCard from '../components/SlotCard';
import { Slot } from '../types/slot';

const DoctorDetailScreen = () => {
  const route = useRoute<any>();

  const doctorId = route.params.doctorId;

  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const { data: doctor, isLoading } = useDoctor(doctorId);

  const { data: slots = [] } = useSlots(doctorId);

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
        data={slots}
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

      <Button title="Book Appointment" onPress={() => {}} />
    </ScrollView>
  );
};

export default DoctorDetailScreen;
