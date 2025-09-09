

import Input from "@/components/Input"
import { useState } from "react"

type Product = {
    name: string
    price: string
    imageURL: string
}
const CreatePage = () => {

    const [product, setProduct] = useState<Product>({
        name: '',
        price: '',
        imageURL: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        setProduct((prev) => ({
        ...prev,

        [name]:  value, // convert price to number
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Product submitted:", product);

        // You can add API call here

          setProduct({
            name: "",
            price: '',
            imageURL: "",
        })
    }

  return (
    <section className="flex items-center flex-col gap-15 max-w-full mt-15">
        <h1 className=" text-5xl font-bold">Create New Product</h1>

        <form onSubmit={handleSubmit} className="flex flex-col w-[550px] gap-3 bg-gray-800 p-8 rounded">
            <Input placeholder="Product Name" name="name" value={product.name} type="text" onChange={handleChange} />
            <Input placeholder="Price" name="price" value={product.price} type="text" onChange={handleChange}/>
            <Input placeholder="Image URL" name="imageURL" value={product.imageURL} type="text" onChange={handleChange}/>

            <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 via-blue-400 to-blue-500 py-1 rounded cursor-pointer text-black font-semibold hover:text-white transition-all duration-300">Add Product</button>
        </form>
    </section>
  )
}

export default CreatePage

