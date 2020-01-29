import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Notifications from '~/components/Notifications';

import { Container, Content, Profile } from './styles';

import logoHeader from '~/assets/logo-header.svg';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  return (
    <Container>
      <Content>
        <nav>
          <img src={logoHeader} alt="GoBarber" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>

        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <img
              src={
                profile.avatar
                  ? profile.avatar.url
                  : 'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt="Ruan Caetano"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
