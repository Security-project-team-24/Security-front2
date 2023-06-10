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
import { boolean } from 'yup';
import { useBlockUser } from '../../api/services/user/useBlockUser';
import { useUnblockUser } from '../../api/services/user/useUnblockUser';
import { ResponseState } from '../../store/response-state.type';

export const EmployeesPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { getEmployeesRes, getEmployees } = useGetEmployees();
  const { blockUser } = useBlockUser();
  const { unblockUser } = useUnblockUser();

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
  const handleUserBlocking = async (id: number) => {
    blockUser(id).then((response: ResponseState<null>) => {
      if (response.status == 'SUCCESS') fetchEmployees(0);
    });
  };
  const handleUserUnblocking = async (id: number) => {
    unblockUser(id).then((response: ResponseState<null>) => {
      if (response.status == 'SUCCESS') fetchEmployees(0);
    });
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
                  <Td>{item.roles.map((item: string) => item + ' ')}</Td>
                  <Td>
                    <Flex gap={'4'}>
                      {item.blocked ? (
                        <Button
                          colorScheme='green'
                          width={'100%'}
                          onClick={() => handleUserUnblocking(item.id)}
                        >
                          Unblock
                        </Button>
                      ) : (
                        <Button
                          colorScheme='red'
                          width={'100%'}
                          onClick={() => handleUserBlocking(item.id)}
                        >
                          Block
                        </Button>
                      )}
                    </Flex>
                  </Td>
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
