import type { Request } from "express";

export interface User {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
}

export interface Expense {
  user: User;
  text: string;
  customDate?: string;
  type: "income" | "expense";
  amount: number;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user: UserData;
}

export interface MongoDocument {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseDocument extends MongoDocument, Expense {}
export interface UserDocument extends MongoDocument, User {}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  token: string;
}
