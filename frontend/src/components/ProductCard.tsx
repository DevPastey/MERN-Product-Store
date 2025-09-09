import type { Product, ProductCardProp } from "@/types/types"
import { Toaster, toaster } from "@/components/ui/toaster";
import { Box, Heading, HStack, IconButton, Image, Text} from "@chakra-ui/react"
import { useColorModeValue } from "./ui/color-mode"
import { LuTrash2 } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import { useProductStore } from "@/store/product";
import ProductDialog from "./ProductDialog"

const ProductCard = ({ product, pid, name, price, imageURL }: ProductCardProp) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { updateProduct, deleteProduct } = useProductStore();
  const dialog = ProductDialog;

  const handleUpdateProduct = async (pid: string, updatedProduct: Product) => {
    const { success, message } = await updateProduct(pid, updatedProduct);

    toaster.create({
      title: success ? "Success" : "Error",
      description: message,
      type: success ? "success" : "error",
      closable: true,
    });
   dialog.close("a");
    
  }

  return (
    <Box shadow="lg" rounded="lg" overflow="hidden" bg={bg}>
      <Image src={imageURL} alt={name} w="full" h="200px" objectFit="cover" />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor}>
          ${price}
        </Text>
      </Box>

      <HStack gap={2} pb={2} pl={4}>
        <IconButton
          colorPalette="blue"
          onClick={() =>
            dialog.open("a", {
              open: true,
              handleUpdateProduct,
              pid,
              product,
            })
          }
        >
          <FaEdit />
        </IconButton>
        <dialog.Viewport />
        <IconButton colorPalette="red" onClick={() => deleteProduct(pid)}>
          <LuTrash2 />
        </IconButton>
      </HStack>

      <Toaster />
    </Box>
  );
}


export default ProductCard