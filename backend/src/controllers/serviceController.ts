import { Request, Response } from 'express';
import * as serviceService from '../services/serviceService';

export const createService = async (req: Request, res: Response) => {
  try {
    const service = await serviceService.createService(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

type ServiceParams = {
  id: string;
};

export const getService = async (
  req: Request<ServiceParams>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const service = await serviceService.getServiceById(id);
    res.json(service);
  } catch (error) {
    res.status(404).json({ error: "Service not found" });
  }
};

export const getServices = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const services = await serviceService.getAllServices(category as string);
    res.json(services);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};