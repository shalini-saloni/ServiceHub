import prisma from '../lib/prisma';
import { Role } from '@prisma/client';

export const createUser = async (data: {
  email: string;
  name: string;
  password: string;
  phone?: string;
  role?: Role;
}) => {
  return prisma.user.create({ data });
};

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const getAllWorkers = async () => {
  return prisma.user.findMany({ where: { role: 'WORKER' } });
};

export const updateUser = async (id: string, data: any) => {
  return prisma.user.update({ where: { id }, data });
};