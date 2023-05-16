import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  useDisclosure,
  useToast,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useApplicationStore } from "../../store/application.store";
import { displayToast } from "../../utils/toast.caller";
import { Role } from "../../store/auth-store/model/enums/role.enum";
import { CreateProjectForm } from "../Project/CreateProjectForm";
import { useEffect } from "react";
import { SkillForm } from "../SkillForm/SkillForm";

export const Header = () => {
  const navigate = useNavigate();
  const user = useApplicationStore((state) => state.user);
  const logout = useApplicationStore((state) => state.logout);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
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
          {user != null && (
            <Link href="/profile" mr="5px" color={"white"}>
              {user.name} {user.surname}
            </Link>
          )}
          <Flex gap="15px">
            {user ? (
              <Link color={"white"} onClick={handleLogout}>
                Logout
              </Link>
            ) : (
              <Flex gap="15px">
                <Link href="/login" color={"white"}>
                  Login
                </Link>
                <Link href="/register" color={"white"}>
                  Register
                </Link>
              </Flex>
            )}
          </Flex>
        </Flex>
        {user?.role == "ADMIN" && (
          <>
            <Button onClick={() => navigate("/admin/projects")} mr="5px">
              Projects
            </Button>
            <Button onClick={() => navigate("/admin/employees")} mr="5px">
              Employees
            </Button>
            <Button onClick={() => navigate("/admin/register-admin")} mr="5px">
              Register admin
            </Button>
          </>
        )}
        {user?.role === "ENGINEER" && (
          <>
            <Button onClick={onOpen}>Add skill</Button>
            <SkillForm isOpen={isOpen} onClose={onClose} />
          </>
        )}
      </Box>
    </>
  );
};
