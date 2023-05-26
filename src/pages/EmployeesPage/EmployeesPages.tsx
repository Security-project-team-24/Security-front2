import { useEffect, useState } from 'react';
import { useApplicationStore } from '../../store/application.store';
import {
  Button,
  Flex,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { User } from '../../store/auth-store/model/user.model';
import ReactPaginate from 'react-paginate';
import { useGetEmployees } from '../../api/services/user/useGetEmployees';

export const EmployeesPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { getEmployeesRes, getEmployees } = useGetEmployees();

  useEffect(() => {
    fetchEmployees(0);
  }, []);
  const fetchEmployees = async (pageNumber: number) => {
    await getEmployees(5, pageNumber);
  };

  const handlePageClick = async (event: any) => {
    setCurrentPage(event.selected);
    fetchEmployees(event.selected);
  };

  return (
    <>
      <TableContainer flex={1}>
        <Table variant='striped' colorScheme='teal'>
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
            {getEmployeesRes.data.content &&
              getEmployeesRes.data.content.map((item: User) => (
                <Tr key={item.id}>
                  <Td>{item.name}</Td>
                  <Td>{item.surname}</Td>
                  <Td>
                    {item.address.street} {item.address.streetNumber}{' '}
                    {item.address.zipCode} {item.address.city},{' '}
                    {item.address.country}
                  </Td>
                  <Td>{item.email}</Td>
                  <Td>{item.phoneNumber}</Td>
                  <Td>{item.roles.map((item: string) => (
                      item + " "
                  ))}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      {getEmployeesRes.status == 'LOADING' && (
        <>
          <Flex justifyContent={'center'}>
            <Spinner />
          </Flex>
        </>
      )}
      <ReactPaginate
        activeClassName={'item active '}
        forcePage={currentPage}
        breakClassName={'item break-me '}
        breakLabel={'...'}
        containerClassName={'pagination'}
        disabledClassName={'disabled-page'}
        marginPagesDisplayed={2}
        nextClassName={'item next '}
        nextLabel='>'
        onPageChange={handlePageClick}
        pageCount={getEmployeesRes.data.totalPages}
        pageClassName={'item pagination-page '}
        pageRangeDisplayed={2}
        previousClassName={'item previous'}
        previousLabel='<'
      />
    </>
  );
};
