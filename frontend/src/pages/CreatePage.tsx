import { useColorModeValue } from "@/components/ui/color-mode"
import { Toaster, toaster } from "@/components/ui/toaster";
import { useProductStore } from "@/store/product";
import type { Product } from "@/types/types";
import { Box, Container, Heading, VStack, Input, Button,  } from "@chakra-ui/react"
import { useState } from "react"



const CreatePage = () => {

  const [newProduct, setNewProduct] = useState<Product>({
    name: '',
    price: '',
    imageURL: '',
    _id: "",
  });


  const {createProduct} = useProductStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target

    

    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value // convert price to number
    }))
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    //console.log("Product submitted:", newProduct);
    console.log("Product about to submit:", newProduct, typeof newProduct.price)


    // You can add API call here


    const {success, message} = await createProduct(newProduct);
      console.log("Success:", success);
      console.log("Message:", message);

      if (!success) {
        toaster.create({
          title: "Error",
          description: message,
          type: "error",
          closable: true,

        })
      }else{
        toaster.create({
          title: "Success",
          description: message,
          type: "success",
          closable: true,
        });

        setNewProduct({
          name: "",
          price: '',
          imageURL: "",
          _id: "",
        })
      }


      
    }

  return (
    <Container mt={10} maxW={"2xl"}>
      <VStack
        spaceY={8} 
      >
        <Heading as={"h1"} size={"3xl"} textAlign={"center"} mb={8}> Create New Product</Heading>

        <Box w={"full"} bg={useColorModeValue("white", "gray.800")}
            p={6} rounded={"lg"} shadow={"md"}
        >
          <form onSubmit={handleSubmit}>
              <VStack spaceY={4}>
                  <Input borderColor={useColorModeValue("gray.200", 'gray.600')} placeholder="Product Name" name="name" value={newProduct.name} type="text" onChange={handleChange} />
                  <Input borderColor={useColorModeValue("gray.200", 'gray.600')} placeholder="Price" name="price" value={newProduct.price} type="text" onChange={handleChange}/>
                  <Input borderColor={useColorModeValue("gray.200", 'gray.600')} placeholder="Image URL" name="imageURL" value={newProduct.imageURL} type="text" onChange={handleChange}/>
                  <Button type="submit" bg='blue.500' w='full'>Add Product</Button>
              </VStack>
          </form>
        </Box>

        <Toaster />
      </VStack>

      
    </Container>
  )
}

export default CreatePage