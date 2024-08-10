import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';
import { UserCreateDto } from '../../entites';
import { createUser } from '../../services/userService';


const UserCreateForm: React.FC = () => {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");

  const [nomeCompletoError, setNomeCompletoError] = useState("");
  const [emailError, setEmailError] = useState("");

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
      const user: UserCreateDto = {
        nomeCompleto: nomeCompleto,
        email: email,
      };

      try {
         await createUser(user);

        setNomeCompleto('');
        setEmail('');

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
          Criar
        </Button>
      </form>
    </Box>
  );
};

export { UserCreateForm };