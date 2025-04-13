export type Product = {
  id: string;
  name: string;
  description: string;
  condition: string;
  material: string;
  weight: number | null;
  dimensions: string;
  yearMade: number | null;
  estimatedValue: number | null;
  tags: string[];
  image: string;
  images: string[]; // All images (main + embedded)
};
