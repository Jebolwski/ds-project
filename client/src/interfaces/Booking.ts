export interface Booking {
  id: number;
  childs: Adult[];
  adults: Adult[];
  room: Room;
  start: Date;
  end: Date;
}

export interface Adult {
  id: number;
  name: string;
  tcno: string;
  age?: number;
}

export interface Room {
  category: Category;
  image1: string;
  image2: null;
  image3: null;
  image4: null;
  id: number;
}

export interface Category {
  id: number;
  name: string;
  max_adult: number;
  max_children: number;
  desc: string;
  price: number;
}
