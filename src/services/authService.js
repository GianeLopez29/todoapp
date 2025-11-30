import crypto from 'crypto';
import * as userRepository from '../repositories/userRepository.js';
import { generateToken } from '../utils/jwt.js';
import { sendVerificationEmail } from '../utils/email.js';

export const registerUser = async (userData) => {
  const existingUser = await userRepository.findUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('Email ya registrado');
  }

  const verificationToken = crypto.randomBytes(32).toString('hex');
  const user = await userRepository.createUser({
    ...userData,
    verificationToken
  });

  try {
    const emailResult = await sendVerificationEmail(user.email, verificationToken);
    if (!emailResult.success) {
      console.warn('Email verification not sent:', emailResult.message);
    }
  } catch (emailError) {
    console.error('Error sending verification email:', emailError.message);
    // Continue without failing - user can still login if email fails
  }

  return {
    message: 'Usuario registrado. Revisa tu email para verificar la cuenta.',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified
    }
  };
};

export const loginUser = async (email, password) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Credenciales inválidas');
  }

  if (!user.isVerified) {
    throw new Error('Email no verificado');
  }

  const token = generateToken(user._id);
  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified
    }
  };
};

export const verifyEmail = async (token) => {
  const user = await userRepository.findUserByVerificationToken(token);
  if (!user) {
    throw new Error('Token de verificación inválido');
  }

  await userRepository.updateUser(user._id, {
    isVerified: true,
    verificationToken: undefined
  });

  return { message: 'Email verificado exitosamente' };
};