export interface Room {
  category: Category;
  id: number;
  image1: string;
  image2: null;
  image3: null;
  image4: null;
}

export interface Category {
  id: number;
  name: string;
  max_adult: number;
  max_children: number;
  desc: string;
  price: number;
}
