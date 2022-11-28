import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

function MenuTable({items}) {
  return (
    <Table>
        <Thead>
        <Tr>
            <Th>Item Name</Th>
            <Th>Price</Th>
        </Tr>
        </Thead>
        <Tbody>
        {items.map(menuItem => {
                
                return (<Tr><Td>{menuItem.item_name}</Td>
                    <Td>{menuItem.price}</Td></Tr>)

            })}
        </Tbody>
    </Table>
  );
}

export default MenuTable;