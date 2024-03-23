import { IconMap } from '../../Utils/IconMap';
import { StatusMap } from '../../Utils/StatusMap';
import LongMenu from './menuAction';
import Avatar from '@mui/material/Avatar';
import { TableRow, TableCell, Typography } from '@mui/material';

const DataRow = ({ row, columns, window, theme }) => {
    return (
      <TableRow hover role="checkbox" tabIndex={-1}>
        {columns.map((column) => (
          <TableCell key={column.id} align={column.align}>
            {column.id === 'nome' && window === 'agendamento' && renderAgendamento(row, theme)}
            {column.id === 'nome' && window === 'funcionario' && renderFuncionario(row, theme)}
            {(column.id === 'status') && renderStatus(row)}
            {(column.id !== 'nome' && column.id !== 'status') && row[column.id]}
            {(column.id === 'action') && renderAction(row.tipo, row)}
          </TableCell>
        ))}
      </TableRow>
    );
};

const renderAction = (tipo, data) => (
  <div style={{ justifyContent: 'center' }}>
      <LongMenu tipo={tipo} data={data} />
  </div>
);

const renderStatus = (row) => (
    <div style={{ display: 'flex',justifyContent: 'center' }}>
        {StatusMap[row.status]()}
    </div>
);
  
const renderAgendamento = (row, theme) => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {IconMap[row.tipo](theme)}
      <div style={{ textAlign: 'justify', width: theme.spacing(18) }}>
        <Typography variant="body1" fontSize={16} fontWeight={600}>{row.userName}</Typography>
        <Typography variant="caption" fontSize={14} color="textSecondary">{row.tipo}</Typography>
      </div>
    </div>
);
  
const renderFuncionario = (row, theme) => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {row.foto ? (
        <Avatar style={{ borderRadius: '50%', maxWidth: theme.spacing(10), height: theme.spacing(10), width: 'auto' }} alt={row.nome} src={`data:image/png;base64, ${row.foto}`} />
      ) : (
        <Avatar style={{ borderRadius: '50%', width: theme.spacing(10), height: theme.spacing(10) }} src="/broken-image.jpg" />
      )}
      <div style={{ marginLeft: '12px', textAlign: 'justify', width: theme.spacing(16) }}>
        <Typography variant="body1" fontSize={16} fontWeight={600}>{row.nome}</Typography>
        <Typography variant="body1" fontSize={14} color={'#525252'}>{row.empresa}</Typography>
      </div>
    </div>
);  
  
export default DataRow;
  