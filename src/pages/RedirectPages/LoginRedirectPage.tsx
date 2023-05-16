import { useNavigate, useParams } from "react-router-dom";
import { Spinner, Flex } from "@chakra-ui/react";
import { useApplicationStore } from "../../store/application.store";
import { useEffect } from "react";

export const LoginRedirectPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const user = useApplicationStore((state) => state.user);
  const passwordlessLogin = useApplicationStore(
    (state) => state.passwordlessLogin
  );
  const loginStateRes = useApplicationStore((state) => state.loginStateRes);
  useEffect(() => {
    if (loginStateRes.status == "SUCCESS" && user?.role == "ADMIN") {
      if (user?.role == "ADMIN") navigate("/admin/projects");
    }
    navigate("/");
  }, [loginStateRes]);

  useEffect(() => {
    handlePasswordlessLogin();
  }, []);
  const handlePasswordlessLogin = async () => {
    if (token === undefined) return;
    await passwordlessLogin(token);
  };
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      h={"calc(100vh - 95px)"}
    >
      <Spinner boxSize={36} thickness="10px" color={"#3d997c"} />
    </Flex>
  );
};
