import React, { FC, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import Header from '../../../components/Header/index';
import Loading from '../../../components/Loading';
import TablePaginationActions from '../../../components/TablePaginationActions/index';
import { OneDriveFile } from '../../../interfaces/onedrive-file';
import apimg from '../../../services/apimg';
import api from '../../../services/api';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MyOnedriveSearch: FC = () => {
  const HeaderProps = {
    allowMenu: true,
    title: 'NL Classroom - Procurar no meu Onedrive',
  };

  const [isLoading, setIsLoading] = useState(false);
  const [showList, setShowList] = useState(false);
  const [isError, setIsError] = useState(false);
  const [msg, setMsg] = useState('');

  const [listItemsInMyDrive, setListItemsInMyDrive] = useState<OneDriveFile[]>(
    [],
  );

  const [open, setOpen] = useState(false);
  const [openExist, setOpenExist] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClickExist = () => {
    setOpenExist(true);
  };
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleCloseExist = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenExist(false);
  };

  const getFilesInFolder = async (item: OneDriveFile) => {
    if (item.file) {
      setListItemsInMyDrive(oldListItemsInMyDrive => [
        ...oldListItemsInMyDrive,
        item,
      ]);
    }

    if (item.folder) {
      // requesicao para pegar itens da pasta
      try {
        const { remoteItem, id } = item;
        const response = await apimg.get(
          `/drives/${remoteItem.parentReference.driveId}/items/${id}/children`,
        );
        const listShare = response.data.value;
        console.log(listShare);

        listShare.forEach((itemListShare: OneDriveFile) => {
          // Enquanto tiver uma pasta, chama a função
          getFilesInFolder(itemListShare);
        });
      } catch (error) {
        console.error(error);
      }
    }
    setIsLoading(false);
    setShowList(true);
  };

  const shareWithMe = async () => {
    const response = await apimg.get('/me/drive/sharedWithMe');

    console.log(response.data.value);
    const listItems = response.data.value;
    listItems.forEach((item: OneDriveFile) => {
      getFilesInFolder(item);
    });
  };

  const itemsInMyDrive = async () => {
    const response = await apimg.get('/me/drive/root/children');

    console.log(response.data.value);
    const listItems = response.data.value;
    listItems.forEach((item: OneDriveFile) => {
      getFilesInFolder(item);
    });
  };

  const start = async () => {
    try {
      const response = await apimg.get('/me');

      console.log(response.data);
      setIsLoading(true);
      itemsInMyDrive();
      shareWithMe();
    } catch (error) {
      setIsError(true);
    }
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

  const createFile = async (row: OneDriveFile) => {
    try {
      const resp = await api.post('/files', {
        name: row.name,
        url: row.webUrl,
      });

      if (resp.status === 200) {
        setMsg('Arquivo já existe!');
      } else if (resp.status === 201) {
        setMsg('Arquivo craido com sucesso!');
      }
      handleClick();
    } catch (error) {
      console.error(error);
      handleClickExist();
    }
  };

  return (
    <>
      <Header {...HeaderProps} />
      <div className="">
        <div className="flex justify-center items-center ">
          {isLoading && <Loading />}
          {!showList && (
            <button
              type="button"
              className="nl-bg text-white font-bold py-2 px-4 rounded"
              onClick={() => start()}
            >
              Procurar Arquivos
            </button>
          )}
          {isError && <div>Faça Login novamente, seu token expirou!</div>}
          {showList && (
            <div className="mx-20">
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Nome</TableCell>
                      <TableCell align="left">URL</TableCell>
                      <TableCell align="left">Ação</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listItemsInMyDrive.length > 0 ? (
                      listItemsInMyDrive.map((row: OneDriveFile) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.webUrl}</TableCell>
                          <TableCell>
                            <button
                              type="button"
                              onClick={() => createFile(row)}
                              className="text-white w-auto flex justify-end items-center nl-bg p-2"
                            >
                              Criar Arquivo
                            </button>
                          </TableCell>
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
                        count={listItemsInMyDrive.length}
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
                        labelDisplayedRows={({ from, to, count }: any) =>
                          `${from}-${to} de ${
                            count !== -1 ? count : `mais de ${to}`
                          }`
                        }
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {msg}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openExist}
        autoHideDuration={6000}
        onClose={handleCloseExist}
      >
        <Alert onClose={handleCloseExist} severity="success">
          Erro ao conectar com o servidor!
        </Alert>
      </Snackbar>
    </>
  );
};

export default MyOnedriveSearch;
