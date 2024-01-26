import { Review } from "../types/Review";
export interface Worker {
  worker_id: number;
  first_name: string;
  last_name: string;
  trade: string;
  rate: number;
  description: string;
  skills: string[];
  years_exp: number;
  headshot: string;
  licenses: string[];
  reviews: Review[];
  schedule?: string[];
  email: string;
}
