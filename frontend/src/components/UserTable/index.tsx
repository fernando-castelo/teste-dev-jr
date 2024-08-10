import { Table, TableContainer, Tbody, Th, Thead, Tr, Td } from "@chakra-ui/react";
import React from "react";
import { User } from "../../entites";

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <div className="UserTable">
      <TableContainer>
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
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export { UserTable };
