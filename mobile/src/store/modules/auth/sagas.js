import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function setToken({ payload }) {
  if (!payload) {
    return;
  }
  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function* signIn({ payload: { email, password } }) {
  try {
    const response = yield call(api.post, '/sessions', { email, password });

    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert(
        'Erro no login',
        'O usuário não pode ser um prestador de serviço!'
      );
      yield put(signFailure());
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (error) {
    Alert.alert(
      'Falha na autenticação',
      'Falha na autenticação, verifique seus dados!'
    );
    yield put(signFailure());
  }
}

export function* signUp({ payload: { name, email, password } }) {
  try {
    yield call(api.post, '/users', { name, email, password });
    // history.push('/');
  } catch (error) {
    Alert.alert(
      'Falha no cadastro',
      'Falha no cadastro, verifique seus dados!'
    );
    yield put(signFailure());
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
