import {
  Input,
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
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useApplicationStore } from "../../store/application.store";
import { ProjectEmployee } from "../../store/project-store/types/projectEmployee.type";

export const EngineerProjectsPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const getEngineerProjects = useApplicationStore(
    (state) => state.getEngineerProjects
  );
  const engineerProjects = useApplicationStore(
    (state) => state.engineerProjects
  );

  const toast = useToast();
  useEffect(() => {
    setCurrentPage(0);
    getEngineerProjects();
  }, []);

  return (
    <>
      <TableContainer flex={1}>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Projects</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Duration (months)</Th>
              <Th>Job description</Th>
            </Tr>
          </Thead>
          <Tbody>
            {engineerProjects.data &&
              engineerProjects.data.map((item: ProjectEmployee) => (
                <Tr key={item.id}>
                  <Td>{item.project.name}</Td>
                  <Td>{item.project.duration}</Td>
                  <Td>{item.jobDescription}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      {/* <ReactPaginate
        activeClassName={"item active "}
        forcePage={currentPage}
        breakClassName={"item break-me "}
        breakLabel={"..."}
        containerClassName={"pagination"}
        disabledClassName={"disabled-page"}
        marginPagesDisplayed={2}
        nextClassName={"item next "}
        nextLabel=">"
        onPageChange={handlePageClick}
        pageCount={getProjectsRes.data.totalPages}
        pageClassName={"item pagination-page "}
        pageRangeDisplayed={2}
        previousClassName={"item previous"}
        previousLabel="<"
      /> */}
    </>
  );
};
