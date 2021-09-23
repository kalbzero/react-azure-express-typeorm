import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../../components/Header/index';
import TablePaginationActions from '../../../components/TablePaginationActions/index';
import { Course } from '../../../interfaces/course';
import api from '../../../services/api';

const CoursesForm: FC = () => {
  const history = useHistory();
  const HeaderProps = {
    allowMenu: true,
    title: 'NL Classroom - Cursos',
  };
  const [coursesList, setCoursesList] = useState<Course[]>([]);
  const [coursesListBk, setCoursesListBk] = useState<Course[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await api.get('/courses');

      setCoursesList(response.data);
      setCoursesListBk(response.data);
    };

    getData();
  }, []);

  const onEdit = (id: string) => {
    history.push(`/course/form/${id}`);
  };

  const handleSearch = (searchTerm: string) => {
    const filtered = coursesListBk.filter((value: Course) =>
      value.name.toLowerCase().includes(searchTerm),
    );
    setCoursesList(filtered);
  };

  // pagination config
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [page, setPage] = useState(0);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Header {...HeaderProps} />
      <div className="mx-20">
        <div className="flex justify-between items-center ">
          <div className="shadow flex">
            <TextField
              id="outlined-basic"
              label="Pesquisar"
              variant="outlined"
              onChange={(e: any) => handleSearch(e.target.value)}
            />
            <button
              type="button"
              className="text-white w-auto flex justify-end items-center nl-bg p-2"
            >
              <i className="material-icons">search</i>
            </button>
          </div>
          <div className="">
            <a
              href="/course/form"
              className="nl-bg text-white font-bold py-2 px-4 rounded"
            >
              Criar
            </a>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Nome</TableCell>
                <TableCell align="left">Categoria</TableCell>
                <TableCell align="left">Criado Por</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coursesList.length > 0 ? (
                coursesList.map((row: Course) => (
                  <TableRow
                    key={row.num_seq}
                    onClick={() => onEdit(row.num_seq)}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.id_category.name}</TableCell>
                    <TableCell>{row.createdBy}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="left" colSpan={5}>
                    Nenhum resultado encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 15, 25, 50]}
                  colSpan={3}
                  count={coursesList.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  SelectProps={{
                    inputProps: { 'aria-label': 'linhas por páginas' },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  ActionsComponent={TablePaginationActions} // furtado diretamente da doc do material
                  labelRowsPerPage="Linhas por página"
                  labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
                  }
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default CoursesForm;
