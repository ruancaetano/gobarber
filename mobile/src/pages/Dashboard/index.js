import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import Background from '~/components/Background';
import Appointment from '~/components/Appointment';
import { Container, Title, List } from './styles';

const data = [1, 2, 3, 4, 5];

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function loadAppointments() {
      const response = await api.get('/appointments');
      setAppointments(response.data);
    }

    loadAppointments();
  }, []);

  async function handleCancel(appointmentId) {
    const response = await api.delete(`/appointments/${appointmentId}`);
    setAppointments(
      appointments.map(item =>
        item.id === appointmentId
          ? {
              ...item,
              canceled_at: response.data.canceled_at,
            }
          : item
      )
    );
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          keyExtractor={item => String(item)}
          renderItem={({ item }) => (
            <Appointment onCancel={handleCancel} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};
