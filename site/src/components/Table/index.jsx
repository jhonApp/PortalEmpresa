import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import { IconMap } from '../../Utils/IconMap';

const LoadingRow = ({ columns }) => (
  <TableRow>
    <TableCell colSpan={columns.length} align="center">
      Carregando dados...
    </TableCell>
  </TableRow>
);

const ErrorRow = ({ columns }) => (
  <TableRow>
    <TableCell colSpan={columns.length} align="center">
      Não foi possível obter os dados.
    </TableCell>
  </TableRow>
);

const EmptyRow = ({ columns }) => (
  <TableRow>
    <TableCell colSpan={columns.length} align="center">
      Nenhum dado disponível.
    </TableCell>
  </TableRow>
);

const DataRow = ({ row, columns, theme }) => (
  <TableRow hover role="checkbox" tabIndex={-1}>
    {columns.map((column) => (
      <TableCell key={column.id} align={column.align}>
        {column.id === 'nome' ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {IconMap[row.tipo](theme)}
            <div style={{ textAlign: 'justify', width: theme.spacing(16) }}>
              <Typography variant="body1">{row.userName}</Typography>
              <Typography variant="caption" color="textSecondary">{row.tipo}</Typography>
            </div>
          </div>
        ) : (
          row[column.id]
        )}
      </TableCell>
    ))}
  </TableRow>
);

export default function CustomTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const theme = useTheme();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const renderTableContent = () => {
    if (props.loading) {
      return <LoadingRow columns={props.columns} />;
    }

    if (!props.isValid) {
      return <ErrorRow columns={props.columns} />;
    }

    if (props.data.length === 0) {
      return <EmptyRow columns={props.columns} />;
    }

    return props.data
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row, index) => (
        <DataRow key={index} row={row} columns={props.columns} theme={theme} />
      ));
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '10px' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {props.columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor: '#EBEAEF' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{renderTableContent()}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        labelRowsPerPage="Linhas por página"
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}