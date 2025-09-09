import type { Product, ProductDialogProps } from "@/types/types";
import { HStack, Input, Dialog, Portal, createOverlay, VStack, Button, Flex} from "@chakra-ui/react"
import { useState } from "react";


const ProductDialog = createOverlay<ProductDialogProps>(
  ({ onOpenChange, open, handleUpdateProduct, pid, product, ...rest }) => {
      
    const [updatedProduct, setUpdatedProduct] = useState<Product>(product);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      if (name === "price") {
        if (!/^\d*$/.test(value)) return; // only digits
      }

      setUpdatedProduct((prev) => ({
        ...prev,
        [name]: name === "price" ? (value === "" ? "" : Number(value)) : value,
      }));
    }

    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange} {...rest}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.CloseTrigger />

              <Dialog.Header>
                <Dialog.Title>Update Product</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body spaceY="3">
                <VStack spaceY={4}>
                  <Input name="name" value={updatedProduct.name} onChange={handleChange} />
                  <Input name="price" value={updatedProduct.price} onChange={handleChange} />
                  <Input name="imageURL" value={updatedProduct.imageURL} onChange={handleChange} />
                </VStack>
              </Dialog.Body>

              <Dialog.Footer>
                <Flex justifyContent="end">
                  <HStack mt={5}>
                    <Button onClick={() => handleUpdateProduct(pid, updatedProduct)} bg="blue.500">
                      Update
                    </Button>
                    <Button variant="ghost" onClick={
                    () => onOpenChange?.({ open: false})
                    } >
                      Cancel
                    </Button>
                  </HStack>
                </Flex>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    );
  }
);

export default ProductDialog
