import { useEffect, useState } from 'react';
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
  useDisclosure,
} from '@chakra-ui/react';
import { User } from '../../store/auth-store/model/user.model';
import ReactPaginate from 'react-paginate';
import { useGetPendingEmployees } from '../../api/services/user/useGetPendingEmployees';
import { UserDissaprovalForm } from '../../components/UserDissapprovalForm/UserDissapprovalForm';
import { useApproveUser } from '../../api/services/user/useApproveUser';
import { ResponseState } from '../../store/response-state.type';

export const PendingEmployeesPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [checkedUser, setCheckedUser] = useState(0);
  const { getPendingEmployeesRes, getPendingEmployees } =
    useGetPendingEmployees();
  const { approveUser } = useApproveUser();

  useEffect(() => {
    fetchPendingEmployees(0);
  }, []);
  const fetchPendingEmployees = async (pageNumber: number) => {
    await getPendingEmployees(5, pageNumber);
  };

  const handlePageClick = async (event: any) => {
    setCurrentPage(event.selected);
    fetchPendingEmployees(event.selected);
  };
  const handleUserApproval = async (id: number) => {
    approveUser(id).then((response: ResponseState<null>) => {
      if (response.status == 'SUCCESS') fetchPendingEmployees(0);
    });
  };

  const handleUserDisapproval = async (id: number) => {
    setCheckedUser(id);
    onOpenDissaproval();
  };
  const {
    isOpen: isOpenDissapproval,
    onClose: onCloseDissapproval,
    onOpen: onOpenDissaproval,
  } = useDisclosure();

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
            {getPendingEmployeesRes.data.content &&
              getPendingEmployeesRes.data.content.map((item: User) => (
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
                  <Td>{item.roles[0]}</Td>
                  <Td>
                    <Flex gap={'4'}>
                      <Button
                        colorScheme='green'
                        width={'50%'}
                        onClick={() => handleUserApproval(item.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        colorScheme='red'
                        width={'50%'}
                        onClick={() => handleUserDisapproval(item.id)}
                      >
                        Disapprove
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <UserDissaprovalForm
        isOpen={isOpenDissapproval}
        onOpen={onOpenDissaproval}
        onClose={onCloseDissapproval}
        userId={checkedUser}
        fetchPending={fetchPendingEmployees}
      />
      {getPendingEmployeesRes.status == 'LOADING' && (
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
        pageCount={getPendingEmployeesRes.data.totalPages}
        pageClassName={'item pagination-page '}
        pageRangeDisplayed={2}
        previousClassName={'item previous'}
        previousLabel='<'
      />
    </>
  );
};
