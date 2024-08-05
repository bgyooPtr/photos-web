import { Metadata } from './Metadata';

export interface Image {
  id: number;
  name: string;
  path: string;
  created_at: Date;
  updated_at: Date;
  metadata: Metadata;
}
