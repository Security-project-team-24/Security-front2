import { useEffect } from "react";
import { useApplicationStore } from "../../store/application.store";
import {
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { displayToast } from "../../utils/toast.caller";
import { Project } from "../../store/project-store/types/project.type";
import { User } from "../../store/auth-store/model/user.model";

export const EmployeesPage = () => {
 
    const getEmployees = useApplicationStore(
    (state) => state.getEmployees
    );
    const getEmployeesRes = useApplicationStore(
    (state) => state.getEmployeesRes
    );

    useEffect(() => {
        fetchEmoloyees()
    }, [])
    const fetchEmoloyees = async () => {
        await getEmployees();
    };

    return (
    <>
        <TableContainer flex={1}>
        <Table variant="striped" colorScheme="teal">
            <TableCaption>Employees</TableCaption>
            <Thead>
            <Tr>
                <Th>Name</Th>
                <Th>Surname</Th>
                <Th>Address</Th>
                <Th>Email</Th>
                <Th>Phone number</Th>
                <Th>Role</Th>
            </Tr>
            </Thead>
            <Tbody>
            {getEmployeesRes.data &&
                getEmployeesRes.data.map((item: User) => (
                <Tr key={item.id}>
                    <Td>{item.name}</Td>
                    <Td>{item.surname}</Td>
                    <Td>{item.address.street} {item.address.streetNumber} {item.address.zipCode} {item.address.city}, {item.address.country}</Td>
                    <Td>{item.email}</Td>
                    <Td>{item.phoneNumber}</Td>
                    <Td>{item.role}</Td>
                </Tr>
                ))}
            </Tbody>
        </Table>
        </TableContainer>
    </>
    );
};
