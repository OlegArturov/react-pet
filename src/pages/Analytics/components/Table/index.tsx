import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { colors } from '../../theme/variables';
import React from 'react';

export type TableColumn = {
  field: string;
  headerName: string;
  alignContent?: 'center' | 'start' | 'end';
  width?: string;
  isColumnHidden?: (row: any) => boolean;
  renderCell?: (row: any, index: number) => React.JSX.Element;
};

export interface ThemedTableProps {
  columns: TableColumn[];
  rows: any[];
}

const TableComponent = ({ columns, rows }: ThemedTableProps) => {
  return (
    <StyledTableWrapper>
      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableHeadCell key={column.field} width={column.width}>
                  {column.headerName}
                </StyledTableHeadCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, index) => (
                  <StyledTableCell
                    isLastRow={rowIndex === rows.length - 1}
                    key={column.field}
                    width={column.width}
                  >
                    {column.renderCell ? column.renderCell(row, rowIndex) : row[column.field]}
                  </StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </StyledTableWrapper>
  );
};

const StyledTableWrapper = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const StyledTableContainer = styled(Box)({
  flex: '1 1 auto',
  minHeight: 0,
  overflow: 'auto',
});

const StyledTableHeadCell = styled(TableCell)({
  borderBottom: `1px solid ${colors.blueMain}`,
  color: colors.mainText,
  whiteSpace: 'nowrap',
  fontWeight: 600,
  height: '52px',
  lineHeight: 1,
});

const StyledTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== 'isLastRow',
})<{ isLastRow: boolean }>(({ isLastRow }) => ({
  borderBottom: isLastRow ? 'none' : `1px solid ${colors.grayOutline}`,
  color: colors.mainText,
  whiteSpace: 'nowrap',
  fontWeight: 400,
  height: '52px',
  lineHeight: 1,
  padding: '10px 16px',
}));

export default TableComponent;
