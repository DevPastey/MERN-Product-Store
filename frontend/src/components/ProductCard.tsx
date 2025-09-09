import type { Product, ProductCardProp } from "@/types/types"
import { Toaster, toaster } from "@/components/ui/toaster";

import { Box, Heading, HStack, IconButton, Image, Text, Dialog, Portal, createOverlay, type UseDialogProps} from "@chakra-ui/react"
import { useColorModeValue } from "./ui/color-mode"
import { LuTrash2 } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import { useProductStore } from "@/store/product";
import { useState } from "react";
import UpdateProductInput from "./UpdateProductInput";









const ProductCard = ({product, pid, name, price, imageURL} : ProductCardProp) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const {updateProduct, deleteProduct} =  useProductStore();

  const [updatedProduct, setUpdatedProduct] = useState<Product>(product);
  


  const dialog = createOverlay<UseDialogProps>((props) => {
    const {...rest } = props;
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;

      if (name === "price") {
        // only allow digits
        if (!/^\d*$/.test(value)) return;
      }

      setUpdatedProduct((updatedProduct) => ({
        ...updatedProduct,
        [name]: name === "price" ? (value === "" ? "" : Number(value)) : value,
      }));
    }
    

    const handleUpdateProduct = async (pid: string, updatedProduct:Product ) => {
      //console.log("Product submitted:", newProduct);
      console.log("Product about to update:", updatedProduct, typeof updatedProduct.price)

      // You can add API call here
      const {success, message} = await updateProduct(pid, updatedProduct);
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

      // Reset to original product, not blanks
      setUpdatedProduct(product);
      dialog.close("a"); // ✅ close modal after update
      }


        
    }

    return (
      <Dialog.Root {...rest}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.CloseTrigger />
              
                <Dialog.Header>
                  <Dialog.Title> Update Product </Dialog.Title>
                </Dialog.Header>
              
              <Dialog.Body spaceY="3">
                
                <Dialog.Description></Dialog.Description>
                <UpdateProductInput updatedProduct={updatedProduct} handleUpdateProduct={handleUpdateProduct} pid={pid} handleChange={handleChange} dialog={dialog} />
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  Cancle
                </Dialog.CloseTrigger>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    )
  })
   
  return (
    <Box shadow={"lg"} rounded={"lg"} overflow={"hidden"} transition={"all 0.3s"} _hover={{transform: "translateY(-5px)", shadow: "xl"}} bg={bg} >
      <Box className="image-path">
        <Image src={`${imageURL}`} alt={name} w="full" h={"200px"} objectFit="cover" />
      </Box>
      <Box p={4} className="description">
        <Heading as="h3" size={"md"} mb={2}>{name}</Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} > ${price} </Text>
      </Box>
      

      <HStack gap={2} pb={2} pl={4}>
        <IconButton  colorPalette={"blue"} 
          onClick={() => {
            dialog.open("a");
          }}
        >
          <FaEdit />
        </IconButton>
        <dialog.Viewport />
        <IconButton  colorPalette={"red"} onClick={() =>{deleteProduct(pid)}} >
          <LuTrash2 />
        </IconButton>
      </HStack>
      <Toaster />
    </Box>
  )
}

export default ProductCard
