import React from 'react';
import Proptypes from 'prop-types';

import { Content, Wrapper } from './styles';

export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: Proptypes.element.isRequired,
};
