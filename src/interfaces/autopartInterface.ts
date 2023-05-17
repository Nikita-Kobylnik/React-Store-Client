export interface IAutopart {
  id: number;
  name: string;
  price: number;
  description: string;
  amount: number;
  manufacturer: IManufacturer;
  image_path: string;
}

interface IManufacturer {
  id: number;
  name: string;
  adress: string;
  phone: string;
  email: string;
}
