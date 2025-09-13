
import type { NewProduct, Product, ProductState } from '@/types/types';
import {create} from 'zustand';

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    setProduct: (products : Product[]) => set({products}),
    createProduct: async (
        newProduct: NewProduct
    ): Promise<{ success: boolean; message?: string }> => {
        if (!newProduct.name || !newProduct.price || !newProduct.imageURL) {
            return {
                success: false,
                message: "Please fill in all fields."
            };
        }

        const res = await fetch("/api/products", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newProduct)
        })

        if (!res.ok) {
      return {
        success: false,
        message: "Failed to create product."
        };
        }


        const data = await res.json();
        set((state) =>({products:[...state.products, data.data]}))

        return { success: true, message: "Product created successfully" };
    },

    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({ products: data.data});
    },

    updateProduct: async(updatedProduct:NewProduct, pid: string, ) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProduct)
        })


        const data = await res.json();
        if (!data.success) 
            return {
                success: false,
                message: data.message,
            };

            set((state) => ({ 
                products: state.products.map((product) => ( product._id === pid ? data.data : product))
            }))
            return {
                success: true,
                message: data.message
            }
    },

    deleteProduct: async(pid: string) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        })

        const data = await res.json();
        if (!data.success) 
            return {
                success: false,
                message: data.message,
            };

            set((state) => ({ products: state.products.filter(product => product._id !== pid) }))
            return {
                success: true,
                message: data.message
            }
   }


}));

