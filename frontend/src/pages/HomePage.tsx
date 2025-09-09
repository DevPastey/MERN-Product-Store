import ProductCard from "@/components/ProductCard"
import { useProductStore } from "@/store/product"
import { Box, Container, Flex, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
//import { Link } from "react-router-dom"

const HomePage = () => {

  const {fetchProducts, products} = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts])

    console.log(products);
    //products.map((p) => {console.log(p._id)})
  return (
    <Container>

      <Flex
        alignItems={"center"} 
        justifyContent={"center"}
        flexDir={{
            base: "column",
            sm: "row"
        }}
      >
        <VStack spaceX={8}>
          <Text
          fontSize={'lg'}
          fontWeight={"bold"}
          textAlign={"center"}
          bgClip={"text"}
          className="bg-gradient-to-r from-cyan-400 to-blue-500"
          paddingTop={8}
        >
            Current Products 🚀
          </Text>

          {products.length > 0 ? (
            <SimpleGrid 
            columns={{ base: 1, md: 2, lg: 3, }} 
            gap="40px"
            w={"full"}
            mt={4}
          > 
            {products.map((p) => ( <ProductCard product={p} key={p._id} pid={p._id} name={p.name} price={p.price} imageURL={p.imageURL} /> ) )}
          </SimpleGrid>
          ) : (
            <Text
              fontSize='sm'
              fontWeight={"bold"}
              textAlign={"center"}
              color={"gray.500"}
              
            >
              No products found 😢 

              <Link to={"/create"}>
                <Text
                as="span"
                  marginLeft={1}
                  className="text-blue-500"
                  _hover={{
                    textDecoration: 'underline'
                  }}
                >
                  Create a product
                </Text>
              </Link>
            </Text>
          )}

        </VStack>
        
            
      </Flex>
      
            <Box className="image-path">
              {/* <Image src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D" alt="name" w="full" h={"200px"} objectFit="cover" /> */}
            </Box>
    </Container>

    
  )
}

export default HomePage
