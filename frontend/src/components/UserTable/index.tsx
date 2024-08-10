import { Table, TableContainer, Tbody, Th, Thead, Tr, Td, Button, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { User } from "../../entites";
import { UserForm } from "../UserForm";
import GenericModal from "../GenericModal.tsx";

interface UserTableProps {
  users: User[];
}


const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [editUser, setEditUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const openEditModal = (user: User) => {
    setEditUser(user);
    setIsEditMode(true);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <div className="UserTable">
      <TableContainer maxW="100%" overflowX="auto">
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.nomeCompleto}</Td>
                <Td>{user.email}</Td>
                <Td>
                <HStack>
                  <Button colorScheme="blue" onClick={() => openEditModal(user)}>Editar</Button>
                </HStack>
              </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>      
      </TableContainer>

      <GenericModal
        isOpen={isOpen}
        onClose={closeModal}
        header="Editar Usuário"
        body={<UserForm user={editUser} closeModal={closeModal} isEditMode={isEditMode} />}
      />
    </div>   
  );
};

export { UserTable };
