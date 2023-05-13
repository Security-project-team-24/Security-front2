import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    useToast,
  } from "@chakra-ui/react";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import {
    LOGIN_DEFAULT_VALUES,
    LOGIN_VALIDATION_SCHEMA,
  } from "../../utils/auth.constants";
  import { displayToast } from "../../utils/toast.caller";
  import { useApplicationStore } from "../../store/application.store";
  import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
  
  export type FormValues = {
    email: string;
    password: string;
  };

  
  export const LoginPage = () => {
    const login = useApplicationStore((state) => state.login);
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<FormValues>({
      defaultValues: LOGIN_DEFAULT_VALUES,
      resolver: yupResolver(LOGIN_VALIDATION_SCHEMA),
    });
    const loginStateRes = useApplicationStore((state) => state.loginStateRes);
    const toast = useToast();
    const navigate = useNavigate();
    const user = useApplicationStore((state) => state.user)
  

    const handleOnSubmit = async (values: FormValues) => {
      await login(values);
    };
  
    useEffect(() => {
      if (loginStateRes.status === "SUCCESS") {
        displayToast(toast, "Successfully logged in!", "success");
        if (user?.role == "ADMIN" && user?.firstLogged)
          navigate("/admin/change-password")
        else 
          navigate("/admin/projects")
      } else if (loginStateRes.status === "ERROR") {
        displayToast(toast, loginStateRes.error ?? "", "error");
      }
    }, [loginStateRes]);
  
    return (
            <Flex
              alignItems="center"
              justifyContent="center"
              height="80vh"
            >
            <Box width="30%" boxShadow={"md"} padding={"30px"}>
              <Flex alignItems={"center"} justifyContent={"center"}>Login</Flex>
              <FormControl isInvalid={errors.email != null} h={"100px"} mb={"2"}>
                <FormLabel>Email</FormLabel>
                <Input type="email" {...register("email")} />
                {errors.email && (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors.password != null} h={"100px"}>
                <FormLabel>Password</FormLabel>
                <Input type="password" {...register("password")} />
                {errors.password && (
                  <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                )}
              </FormControl>
              <Button
                onClick={handleSubmit(handleOnSubmit)}
                mt={"4"}
                fontWeight={"bold"}
                bg={"#003b95"}
                _hover={{
                  bg: "#136ed1",
                }}
                w="100%"
                mx={"auto"}
                color={"white"}
              >
                Login
              </Button>
            </Box>
            </Flex>
    );
  };