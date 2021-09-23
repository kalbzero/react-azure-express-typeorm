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
import React, { FC, useState } from 'react';
import Header from '../../components/Header/index';
import Loading from '../../components/Loading';
import TablePaginationActions from '../../components/TablePaginationActions/index';
import { Search } from '../../interfaces/search';
import api from '../../services/api';

const Home: FC = () => {
  const HeaderProps = {
    allowMenu: true,
    title: 'NL Classroom - Página Inicial',
  };

  const [searchList, setSearchList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isSearchList, setIsSearchList] = useState(false);
  const [isMsg, setIsMsg] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSearch = (value: string) => {
    setIsMsg(false);
    setSearchTerm(value);
  };

  const search = async () => {
    setIsLoading(true);
    setIsSearchList(false);
    setIsMsg(false);

    try {
      const response = await api.get('/home', {
        params: {
          searchTerm,
        },
      });

      if (response.data.length <= 0) {
        setIsLoading(false);
        setMsg(
          `Não foi encontrado nenhum resultado para a busca '${searchTerm}'`,
        );
        setIsMsg(true);
      } else {
        setSearchList(response.data);
        setIsLoading(false);
        setIsSearchList(true);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setMsg(`Ocorreu um erro no servidor, contate o suporte.`);
      setIsMsg(true);
    }
  };

  const enterSearch = (event: any) => {
    if (event.key === 'Enter') {
      console.log('Key down', event.key);
      search();
    }
  };

  const handleGoToForm = (row: Search) => {
    console.log(row);
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
    <div>
      <Header {...HeaderProps} />
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="shadow flex">
            <TextField
              id="outlined-basic"
              label="Pesquisar"
              variant="outlined"
              onChange={(e: any) => handleSearch(e.target.value)}
              onKeyDown={e => enterSearch(e)}
            />
            <button
              type="button"
              onClick={() => search()}
              className="text-white w-auto flex justify-end items-center nl-bg p-2"
            >
              <i className="material-icons">search</i>
            </button>
          </div>
          {isLoading && <Loading />}
        </div>
        <a
          href="/myonedrive"
          className="text-xs mt-3 text-blue-400 hover:text-blue-600"
        >
          Pesquisar no meu OneDrive
        </a>
      </div>
      {isSearchList && (
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Nome</TableCell>
                <TableCell align="left">Criado Por</TableCell>
                <TableCell align="left">URL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchList.length > 0 ? (
                searchList.map((row: Search) => (
                  <TableRow key={row.id} onClick={() => handleGoToForm(row)}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.createdBy}</TableCell>
                    <TableCell>{row.url}</TableCell>
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
                  count={searchList.length}
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
      )}
      {isMsg && <div className="text-center mt-5">{msg}</div>}
    </div>
  );
};

export default Home;
