import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import { BsPlusSquare } from "react-icons/bs";
import { useColorMode, useColorModeValue } from "./ui/color-mode";
import { LuMoon, LuSun } from "react-icons/lu";
const Navbar = () => {
    const {colorMode, toggleColorMode} =  useColorMode();
    const hoverBg = useColorModeValue("gray.300", "gray.600");
    
  return (
    <Container maxW={"1140px"} px={4}  >
      <Flex
        h={16}
        alignItems={"center"} 
        justifyContent={"space-between"}
        flexDir={{
          base: "row",
          sm: "row"
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "18" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgClip={"text"}
          className="bg-gradient-to-r from-cyan-400 to-blue-500"
      >
          <Link to={"/"}> Product Store 🛒</Link>
        </Text>

        <HStack  spaceX={2} alignItems={"center"} justifyContent={"center"}>
          <Link to={"/create"}>
            <Button _hover={{ bg: hoverBg, transform: "scale(1.05)"}} bg={useColorModeValue("none", "gray.500")}  size={"2xs"}>
              <BsPlusSquare className={colorMode === 'light' ? 'text-black' : 'text-white'} />
            </Button>
          </Link>

          <div>
            <Button _hover={{ bg: hoverBg, transform: "scale(1.05)"}} bg={useColorModeValue("none", "gray.500")} size={"2xs"} onClick={toggleColorMode}>
              {colorMode === 'light' ? <LuMoon className={colorMode === 'light' ? 'text-black' : 'text-white'}/>: <LuSun className={colorMode === 'dark' ? 'text-white' :'text-black'} />}
            </Button>
          </div>

        </HStack>

      </Flex>
    </Container>
  )
}

export default Navbar
