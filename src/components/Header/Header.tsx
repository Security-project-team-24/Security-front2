import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  useDisclosure,
  useToast,
  Link
} from "@chakra-ui/react";
import { useNavigate} from "react-router-dom";
import { useApplicationStore } from "../../store/application.store";
import { displayToast } from "../../utils/toast.caller";

export const Header = () => {

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useApplicationStore((state) => state.user);
  const logout = useApplicationStore((state) => state.logout);
  const toast = useToast()

  const handleLogout = () => {
    logout();
    navigate("/login")
  };

  return (
    <>
       <>
      <Box width="100%" bg={"#3d997c"} p={"10px 25px"}>
        <Flex
          w={"100%"}
          h={"40px"}
          alignItems={"center"}
          justifyContent="space-between"
        >
          <Link href="/">
            <Text color={"white"} fontWeight="700">
              Security
            </Text>
          </Link>
          { user != null && 
          <Link href="/profile" mr="5px" color={"white"}>
            {user.name} {user.surname}
          </Link>
          }
          <Flex gap="15px">
            {user ? (
              <Link color={"white"} onClick={handleLogout}>
                Logout
              </Link>
            ) : (
              <Link href="/login" color={"white"}>
                Login
              </Link>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
    </>
  );
};
