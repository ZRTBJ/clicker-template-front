import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  TableSortLabel,
  Button,
} from '@mui/material';
import { getRows } from '../../api/getRows';
import { getPages } from '../../api/getPages';
import { get_object_by_name } from '../../api/get_object_by_name';
import { update_object } from '../../api/update_object';


// Определение колонок
const columns = [
  { id: 'id', label: 'ID', minWidth: 100 },
  { id: 'name', label: 'Name', minWidth: 150 },
  { id: 'username', label: 'Username', minWidth: 150 },
  { id: 'telegram_id', label: 'Telegram ID', minWidth: 150 },
  { id: 'photo_url', label: 'Photo URL', minWidth: 250 },
  { id: 'is_premium', label: 'Premium Status', minWidth: 150 },
  { id: 'coins', label: 'Coins', minWidth: 150 },
  { id: 'energy', label: 'Energy', minWidth: 150 },
  { id: 'booster', label: 'Boosters', minWidth: 200 },

  { id: 'overall_coins_tapped', label: 'Overall Coins Tapped', minWidth: 200 },
  { id: 'coins_tapped_for_today', label: 'Coins Tapped Today', minWidth: 200 },
  { id: 'max_energy', label: 'Max Energy', minWidth: 150 },
  { id: 'coins_per_click', label: 'Coins per Click', minWidth: 150 },
  { id: 'friends', label: 'Friends', minWidth: 150 },
  { id: 'created_at', label: 'Created At', minWidth: 200 },
  { id: 'connection_type', label: 'Connection Type', minWidth: 150 },
  { id: 'country', label: 'Country', minWidth: 100 },
];

export default function UsersTable() {
  const [rows, setRows] = useState([]); // Состояние для хранения данных
  const [page, setPage] = useState(0); // Текущая страница
  const [rowsPerPage, setRowsPerPage] = useState(10); // Количество строк на странице
  const [totalCount, setTotalCount] = useState(0); // Общее количество элементов
  const [countOfRows, setCountOfRows] = useState(0); // Общее количество строк
  const [searchText, setSearchText] = useState(''); // Состояние для поиска
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' }); // Состояние для сортировки
  const [targetPage, setTargetPage] = useState(''); // Состояние для хранения введенного номера страницы

  // Состояние для редактируемой ячейки
  const [editingCell, setEditingCell] = useState({ userId:null, rowId: null, columnId: null });

  // Обработчик для редактирования ячейки
  const handleCellClick = (userId, rowId, columnId) => {
    if (!['id', 'created_at', 'telegram_id', 'boosters_multitap', 'boosters_maxenergy', 'boosters_tapbot', 'boosters'].includes( columnId)){
    setEditingCell({userId, rowId, columnId });}
  };

  // Обработчик изменения значения в текстовом поле
  const handleCellValueChange = (event, rowId, columnId) => {
    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id === rowId) {
          const newValue = event.target.value != '' ? event.target.value : 0 ;
          
          // Проверяем, является ли значение числом
          const parsedValue = isNaN(newValue) ? newValue : parseInt(newValue);
  
          return { ...row, [columnId]: parsedValue };
        }
        return row;
      })
    );
  };
  

  const handleSort = (columnId) => {
    const isAsc = sortConfig.key === columnId && sortConfig.direction === 'asc';
    setSortConfig({ key: columnId, direction: isAsc ? 'desc' : 'asc' });
  };

  useEffect(() => {
    getRows('users', rowsPerPage * (page + 1), rowsPerPage * (page + 1) - rowsPerPage, sortConfig.key, sortConfig.direction).then((json) => {
      setRows(json.rows);
      
    });

    getPages('users', rowsPerPage).then((json) => {
      setCountOfRows(json.total_number);
    });
  }, [page, rowsPerPage, sortConfig.key, sortConfig.direction]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
   
    setSearchText(event.target.value);
    setPage(0);
    if (event.target.value == ''){
      getRows('users', rowsPerPage * (page + 1), rowsPerPage * (page + 1) - rowsPerPage, sortConfig.key, sortConfig.direction).then((json) => {
        setRows(json.rows);
        return
      });
      
    }
    get_object_by_name('users', event.target.value).then(json=>{
        setRows(json);
    })
  };

  const handleTargetPageChange = (event) => {
    setTargetPage(event.target.value);
  };

  const goToTargetPage = () => {
    const pageNum = parseInt(targetPage, 10) - 1;
    if (pageNum >= 0 && pageNum < Math.ceil(countOfRows / rowsPerPage)) {
      setPage(pageNum);
    } else {
      alert(`Введите корректный номер страницы от 1 до ${Math.ceil(countOfRows / rowsPerPage)}`);
    }
  };

  function setEdit(){
      var argdata = rows.find(row=>row.id == editingCell.userId)
      update_object('', argdata.id, argdata, 'users').then(json=>{
        if (!json){
          alert('Произошла ошибка при изменении')
        }
        else{
          alert("Объект успешно изменен!")
        }
      })
      setEditingCell({ rowId: null, columnId: null })
  }

  return (
    <Paper style={{ width: '100%', overflow: 'hidden' }}>
      <TextField
        label="Search"
        variant="outlined"
        value={searchText}
        onChange={handleSearchChange}
        style={{ margin: '16px' }}
      />

      <TableContainer style={{ maxHeight: 440, maxWidth: '100%', overflow: 'auto' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                  <TableSortLabel
                    active={sortConfig.key === column.id}
                    direction={sortConfig.direction}
                    onClick={() => handleSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    onClick={() => handleCellClick(row.id, row.id, column.id)}
                  >
                    {editingCell.rowId === row.id && editingCell.columnId === column.id ? (
                      <TextField
                        value={row[column.id]}
                        onChange={(event) => handleCellValueChange(event, row.id, column.id)}
                        onBlur={setEdit}
                        autoFocus
                      />
                    ) : (
                      row[column.id]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ display: 'flex', alignItems: 'center', margin: '16px' }}>
        <TablePagination
          component="div"
          count={countOfRows}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <TextField
          label="Go to Page"
          variant="outlined"
          type="number"
          value={targetPage}
          onChange={handleTargetPageChange}
          style={{ width: '100px', marginLeft: '16px' }}
        />
        <Button variant="contained" onClick={goToTargetPage} style={{ marginLeft: '8px' }}>
          Go
        </Button>
      </div>
    </Paper>
  );
}
