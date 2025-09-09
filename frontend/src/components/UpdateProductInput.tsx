import { Box, Button, Flex, HStack, Input, VStack } from '@chakra-ui/react'
import { useColorModeValue } from './ui/color-mode'
import type { UpdateInputProp } from '@/types/types'

const UpdateProductInput = ({updatedProduct, handleUpdateProduct, pid, handleChange, dialog}: UpdateInputProp) => {
  return (
    <>
      <Box w={"full"} bg={useColorModeValue("white", "gray.800")}
            p={6} rounded={"lg"} shadow={"md"}
        >
    
            <VStack spaceY={4}>
                <Input borderColor={useColorModeValue("gray.200", 'gray.600')} placeholder="Product Name" name="name" value={updatedProduct.name} type="text" onChange={handleChange} />
                <Input borderColor={useColorModeValue("gray.200", 'gray.600')} placeholder="Price" name="price" value={updatedProduct.price} type="text" onChange={handleChange}/>
                <Input borderColor={useColorModeValue("gray.200", 'gray.600')} placeholder="Image URL" name="imageURL" value={updatedProduct.imageURL} type="text" onChange={handleChange}/>             
            </VStack>
            <Flex justifyContent={"end"}>
                <HStack justifyItems={"flex-end"} mt={5}>
                    <Button onClick={() => handleUpdateProduct(pid, updatedProduct) } bg='blue.500'> Update </Button>
                    <Button bg="none" color={useColorModeValue("gray.800", 'white')} 
                        onClick={async () => {
                            dialog.close("a");
                        }}>
                        Cancel
                    </Button>
                </HStack>
            </Flex>
       
        </Box>
    </>
  )
}

export default UpdateProductInput
