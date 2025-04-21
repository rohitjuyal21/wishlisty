export interface ProductItem {
  id: number;
  productName: string;
  productLink: string;
  note: string;
  priority: string;
  category: string;
  purchased: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  remindAt: string | Date;
}
