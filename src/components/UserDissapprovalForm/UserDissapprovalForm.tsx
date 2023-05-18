import {
  Box,
  Button,
  ModalOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Textarea,
} from '@chakra-ui/react';
import { useDisapproveUser } from '../../api/services/user/userDissaproveUser';
import { useState } from 'react';
import { ResponseState } from '../../store/response-state.type';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  userId: number;
  fetchPending: (pageNumber: number) => Promise<void>;
}

export const UserDissaprovalForm = ({
  isOpen,
  onClose,
  userId,
  fetchPending,
}: Props) => {
  const { disapproveUser } = useDisapproveUser();
  const [reason, setReason] = useState('');
  const handleOnSubmit = async () => {
    await disapproveUser(userId, reason).then(
      (response: ResponseState<null>) => {
        if (response.status === 'SUCCESS') {
          fetchPending(0);
          setReason('');
          onClose();
        }
      }
    );
  };
  const resetForm = () => {
    setReason('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={resetForm}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={'center'} mt={4}>
          Please describe reason of dissapproval
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mx={8} mb={6}>
            <Textarea
              value={reason}
              onChange={(event) => {
                setReason(event.target.value);
              }}
            />
            <Button
              onClick={() => handleOnSubmit()}
              mt={'4'}
              fontWeight={'bold'}
              bg={'#003b95'}
              _hover={{
                bg: '#136ed1',
              }}
              w='100%'
              mx={'auto'}
              color={'white'}
            >
              Dissapprove
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
