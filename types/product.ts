export interface ProductItem {
  id: number;
  productName: string;
  productLink: string;
  note: string;
  priority: string;
  category_id: number;
  category: {
    name: string;
  };
  purchased: boolean;
  createdAt: Date;
  updatedAt: Date;
  remindAt: Date;
  user_id: string;
}
