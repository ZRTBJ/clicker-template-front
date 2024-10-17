import React, { useState, useEffect } from 'react';
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
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import { getPages } from '../../api/getPages';
import { getRows } from '../../api/getRows';

import { get_tasks } from '../../api/get_tasks';
import { add_task } from '../../api/add_task';

// Определение колонок
const columns = [
  { id: 'id', label: 'ID', minWidth: 100 },
  { id: 'title', label: 'Title', minWidth: 150 },
  { id: 'reward', label: 'Reward', minWidth: 150 },
  { id: 'image', label: 'Image', minWidth: 250 },
  { id: 'channel_id', label: 'Channel ID', minWidth: 150 },
  { id: 'channel_link', label: 'Channel Link', minWidth: 250 },
  { id: 'socnet', label: 'Social Network', minWidth: 150 },
];

export default function TasksTable() {
  const [rows, setRows] = useState([]); // Состояние для хранения задач
  const [page, setPage] = useState(0); // Текущая страница
  const [rowsPerPage, setRowsPerPage] = useState(10); // Количество строк на странице
  const [countOfRows, setCountOfRows] = useState(0); // Общее количество строк
  const [newTask, setNewTask] = useState({

    reward: '',
    channel_link: '',
    socnet: 'telegram',
  }); // Состояние для новой задачи

  useEffect(() => {
   get_tasks().then(json=>{
        setRows(json.result)
   })
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (
        name == 'reward'
    ){
        const parsedValue = parseInt(value, 10);
        if (!isNaN(parsedValue) && parsedValue >= 0){
        setNewTask((prevTask) => ({
        ...prevTask,
        [name]: parsedValue,
        }));}}
    else{
        setNewTask((prevTask) => ({
            ...prevTask,
            [name]: value,
            }));
    }          
};

  const handleCreateTask = () => {
    if (newTask.reward && newTask.channel_link && newTask.socnet) {
        add_task(newTask.reward, newTask.channel_link, newTask.socnet).then(json=>
            {if (!json){
                alert('Ошибка при создании')    
                }
            else{
                alert('Задание создано успешно')
                get_tasks().then(json=>{
                    setRows(json.result)
               })
            }


            }
        )
    } else {
      alert('Заполните все поля!');
    }
  };

  return (
    <Paper style={{ width: '100%', overflow: 'hidden' }}>
      <h2>Создать задачу</h2>
      <form style={{ margin: '16px' }}>
  
        <TextField
          label="Reward"
          variant="outlined"
          name="reward"
          type="number"
          value={newTask.reward}
          onChange={handleInputChange}
          style={{ marginRight: '16px', marginBottom: '16px' }}
        />
        <TextField
          label="Channel Link"
          variant="outlined"
          name="channel_link"
          value={newTask.channel_link}
          onChange={handleInputChange}
          style={{ marginRight: '16px', marginBottom: '16px' }}
        />
        <FormControl style={{ minWidth: 200, marginBottom: '16px' }}>
          <InputLabel id="socnet-label">Social Network</InputLabel>
          <Select
            labelId="socnet-label"
            name="socnet"
            value={newTask.socnet}
            onChange={handleInputChange}
          >
            <MenuItem value="telegram">Telegram</MenuItem>
            <MenuItem value="discord" disabled>Discord</MenuItem>
            <MenuItem value="youtube" disabled>YouTube</MenuItem>
          </Select>
        </FormControl>
        <div>
          <Button variant="contained" onClick={handleCreateTask} style={{ marginTop: '8px' }}>
            Создать задачу
          </Button>
        </div>
      </form>

      <h2>Список задач</h2>
      <TableContainer style={{ maxHeight: 440, maxWidth: '100%', overflow: 'auto' }}>
        <Table stickyHeader aria-label="tasks table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {row[column.id]}
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
      </div>
    </Paper>
  );
}
