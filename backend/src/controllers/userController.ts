import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

type UserParams = {
  id: string;
};

export const getUser = async (
  req: Request<UserParams>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
};

export const getWorkers = async (req: Request, res: Response) => {
  try {
    const workers = await userService.getAllWorkers();
    res.json(workers);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};