import {jwt} from 'jsonwebtoken';

export const generateToken = (email, password) => {
   if (!email || !password) {
      throw new Error('Email and password are required to generate a token.');
   }
} 