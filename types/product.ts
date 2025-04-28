export interface CategoryItem {
  id: number;
  name: string;
}

export interface ProductItem {
  id: number;
  productName: string;
  productLink: string;
  note: string;
  priority: string;
  category: CategoryItem;
  purchased: boolean;
  createdAt: Date;
  updatedAt: Date;
  remindAt: Date;
}
