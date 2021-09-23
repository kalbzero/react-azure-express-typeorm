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
import { File } from '../../../interfaces/file';
import api from '../../../services/api';

const FileList: FC = () => {
  const history = useHistory();
  const HeaderProps = {
    allowMenu: true,
    title: 'NL Classroom - Arquivos',
  };
  const [fileList, setFileList] = useState<File[]>([]);
  const [fileListBk, setFileListBk] = useState<File[]>([]);

  useEffect(() => {
    const getData = async () => {
      const { data: files } = await api.get<File[]>('/files');

      setFileList(files);
      setFileListBk(files);
    };

    getData();
  }, []);

  const onEdit = (id: string) => {
    history.push(`/file/form/${id}`);
  };

  const handleSearch = (searchTerm: string) => {
    const filtered = fileListBk.filter((value: File) =>
      value.name.toLowerCase().includes(searchTerm),
    );
    setFileList(filtered);
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
              href="/file/form"
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
                <TableCell align="left">URL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fileList.length > 0 ? (
                fileList.map((row: File) => (
                  <TableRow
                    key={row.num_seq}
                    onClick={() => onEdit(row.num_seq)}
                  >
                    <TableCell>{row.name}</TableCell>
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
                  count={fileList.length}
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

export default FileList;
