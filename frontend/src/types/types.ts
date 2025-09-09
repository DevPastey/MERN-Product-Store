import type { CreateOverlayReturn, UseDialogProps } from "@chakra-ui/react"

export type Product = {
  _id: string,
  name: string
  price: string,
  imageURL: string
}

export type DialogProps = {
  title?: string
  description?: string
  content?: React.ReactNode
}



export type ProductCardProp = {
  product: Product,
  key?: string,
  pid: string,
  name: string
  price: string
  imageURL: string
}

export type handleCancelProp = {
  handleCancel: () => void
}

export type ProductDialogProps = UseDialogProps & {
  pid: string;
  product: Product;
  handleUpdateProduct: (pid: string, updatedProduct: Product) => Promise<void>;
};

export type UpdateInputProp = {
  updatedProduct: Product
  handleUpdateProduct: (pid: string, updatedProduct:Product) => Promise<void>
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  pid: string
  dialog: CreateOverlayReturn<UseDialogProps>
  handleCancel: () => void
}

export type ProductState = {
  products: Product[];
  setProduct: (products: Product[]) => void;
  createProduct: (newProduct: Product) => Promise<{ success: boolean; message?: string }>;
  fetchProducts: () => Promise<void>
  deleteProduct: (pid: string) => Promise<{ success: boolean; message?: string }>
  updateProduct: (pid: string, updatedProduct: Product) => Promise<{ success: boolean; message?: string }>
};
