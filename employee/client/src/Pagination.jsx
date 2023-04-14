import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';

function TableWithPagination() {
  const [activePage, setActivePage] = useState(1);
  const rowsPerPage = 5;
  const columns = Array.from({ length: 14 }, (_, index) => `Column ${index + 1}`);
  const rows = Array.from({ length: 10 }, (_, index) => Array.from({ length: columns.length }, (_, index) => `Row ${index + 1}, Column ${index + 1}`));
  const startIndex = (activePage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const rowsToShow = rows.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowsToShow.map((row, index) => (
            <tr key={index}>
              {row.map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {Array.from({ length: Math.ceil(rows.length / rowsPerPage) }, (_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === activePage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}

export default TableWithPagination;
