export interface ProductItem {
  id: number;
  productName: string;
  productLink: string;
  note: string;
  priority: string;
  category: string;
  purchased: boolean;
  createdAt: Date;
  updatedAt: Date;
  remindAt: Date;
}
