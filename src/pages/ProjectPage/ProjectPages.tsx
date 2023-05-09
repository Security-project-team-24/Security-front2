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
import { Project } from "../../store/reservation-store/types/project.type";

export const ProjectPage = () => {
 
    const getProjects = useApplicationStore(
    (state) => state.getProjects
    );
    const getProjectsRes = useApplicationStore(
    (state) => state.getProjectsRes
    );

    useEffect(() => {
        fetchProjects()
    }, [])
    const fetchProjects = async () => {
        await getProjects();
    };

    return (
    <>
        <TableContainer flex={1}>
        <Table variant="striped" colorScheme="teal">
            <TableCaption>Projects</TableCaption>
            <Thead>
            <Tr>
                <Th>Name</Th>
                <Th>Duration (months)</Th>
            </Tr>
            </Thead>
            <Tbody>
            {getProjectsRes.data &&
                getProjectsRes.data.map((item: Project) => (
                <Tr key={item.id}>
                    <Td>{item.name}</Td>
                    <Td>{item.duration}</Td>
                </Tr>
                ))}
            </Tbody>
        </Table>
        </TableContainer>
    </>
    );
};
