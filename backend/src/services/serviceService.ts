import prisma from '../lib/prisma';

export const createService = async (data: {
  title: string;
  description: string;
  category: string;
  price: number;
  userId: string;
}) => {
  return prisma.service.create({ data });
};

export const getServiceById = async (id: string) => {
  return prisma.service.findUnique({
    where: { id },
    include: { user: true, reviews: true },
  });
};

export const getAllServices = async (category?: string) => {
  return prisma.service.findMany({
    where: category ? { category } : {},
    include: { user: true, reviews: true },
  });
};

export const updateService = async (id: string, data: any) => {
  return prisma.service.update({ where: { id }, data });
};

export const deleteService = async (id: string) => {
  return prisma.service.delete({ where: { id } });
};