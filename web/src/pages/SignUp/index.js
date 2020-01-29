import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

// import { Container } from './styles';

import { signUpRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.svg';

export default function SignUp() {
  const dispatch = useDispatch();
  const schema = Yup.object().shape({
    name: Yup.string().required('Campo obrigatório'),
    email: Yup.string()
      .email('Digite um e-mail válido.')
      .required('Campo obrigatório'),
    password: Yup.string()
      .min(6, 'A senha precisa no mínimo 6 caracteres')
      .required('Campo obrigatório'),
  });
  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form onSubmit={handleSubmit} schema={schema} noValidate>
        <Input name="name" type="text" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit">Criar conta</button>

        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
