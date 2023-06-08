import {
  Box,
  Button,
  ModalOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForgotPassword } from '../../api/services/user/useForgotPassword';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const ForgotPasswordForm = ({ isOpen, onClose }: Props) => {
  const [email, setEmail] = useState('');
  const { forgotPassword } = useForgotPassword();
  const handleOnSubmit = async () => {
    await forgotPassword(email);
    setEmail('');
    onClose();
  };
  const resetForm = () => {
    setEmail('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={resetForm}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={'center'} mt={4}>
          Enter your email for password recovery
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mx={8} mb={6}>
            <Input
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
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
              Send recovery mail
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
