import React, { useEffect, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';
import { User, UserCreateDto, UserUpdateDto } from '../../entites';
import { createUser, updateUser } from '../../services/userService';

interface UserFormProps {
  user: User | null;
  isEditMode: boolean;
}
const UserForm: React.FC<UserFormProps> = ({ user, isEditMode }) => {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  const [nomeCompletoError, setNomeCompletoError] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (isEditMode && user) {
      setNomeCompleto(user.nomeCompleto);
      setEmail(user.email);
      setUserId(String(user.id))
    }
  }, [isEditMode, user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNomeCompletoError("");
    setEmailError("");

    let hasError = false;

    if (nomeCompleto.trim() === '') {
      setNomeCompletoError("Nome Completo é necessario");
      hasError = true;
    }

    if (email.trim() === '' || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email valido é necessario");
      hasError = true;
    }

    if (!hasError) {
      

      try {
        if (isEditMode && user) {

          const user: UserUpdateDto = {
            id: Number(userId),
            nomeCompleto: nomeCompleto,
            email: email,
          };

          await updateUser(userId, user);
        } else {

          const user: UserCreateDto = {
            nomeCompleto: nomeCompleto,
            email: email,
          };
          await createUser(user);
        }

        setNomeCompleto('');
        setEmail('');
        setUserId('');

        window.location.reload();
      } catch (error) {
        console.error('Erro na criação do usuário:', error);
      }
    }
  };

  return (
    <Box maxW="480px" mx="auto" p={4}>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mb={4} isInvalid={!!nomeCompletoError}>
          <FormLabel>Nome Completo</FormLabel>
          <Input
            type="text"
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
          />
          <FormErrorMessage>{nomeCompletoError}</FormErrorMessage>
        </FormControl>

        <FormControl mb={4} isInvalid={!!emailError}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormErrorMessage>{emailError}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="blue">
          {isEditMode ? 'Atualizar' : 'Criar'}
        </Button>
      </form>
    </Box>
  );
};

export { UserForm };