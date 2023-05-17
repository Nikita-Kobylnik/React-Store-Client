import { ISubcategory } from "./subcategoryInterface";

export interface IMainCategory {
  id: number;
  name: string;
  subcategoreis: ISubcategory[];
}
