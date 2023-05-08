'use client';
import { createContext } from 'react';
import { initialState } from './reducer';

const Context = createContext(initialState);

export default Context;
