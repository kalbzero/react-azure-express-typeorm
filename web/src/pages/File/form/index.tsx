import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../../../components/Header/index';
import api from '../../../services/api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

const FilesForm: FC = () => {
  const [nameFile, setNameFile] = useState('');
  const [urlFile, setURLFile] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const HeaderProps = {
    allowMenu: true,
    title: currentTitle,
  };

  const [isCreated, setIsCreated] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isMsg, setIsMsg] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (id) {
        setCurrentTitle('NL Classroom - Editar Arquivo');
        const response = await api.get(`/files/${id}`);

        setNameFile(response.data.name);
        setURLFile(response.data.url);
      } else {
        setCurrentTitle('NL Classroom - Criar Arquivo');
      }
    };

    getData();
  }, []);

  const onSubmitCourse = async () => {
    setIsMsg(false);
    setIsCreated(false);
    setIsUpdate(false);
    setIsError(false);
    if (id) {
      try {
        await api.put(`/files/${id}`, {
          name: nameFile,
          url: urlFile,
        });

        setIsUpdate(true);
        setNameFile('');
        history.push('/file/list');
      } catch (error) {
        console.error(error);
        setIsError(true);
      }
    } else if (urlFile !== '' && nameFile !== '') {
      try {
        await api.post('/files', {
          name: nameFile,
          url: urlFile,
        });

        setIsCreated(true);
        setNameFile('');
        setURLFile('');
        history.push('/file/list');
      } catch (error) {
        console.error(error);
        setIsError(true);
      }
    } else {
      setIsMsg(true);
    }
  };

  const classes = useStyles();
  const handleChangeURLFile = (event: React.ChangeEvent<{ value: string }>) => {
    setURLFile((event.target.value as string) || ('' as string));
  };
  const handleChangeNameFile = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setNameFile((event.target.value as string) || ('' as string));
  };

  return (
    <>
      <Header {...HeaderProps} />

      <div className="flex flex-col justify-center items-center">
        <TextField
          id="outlined-basic"
          label="URL do Arquivo"
          variant="outlined"
          value={urlFile}
          onChange={handleChangeURLFile}
          className={classes.input}
        />
        <TextField
          id="outlined-basic"
          label="Nome do Arquivo"
          variant="outlined"
          value={nameFile}
          onChange={handleChangeNameFile}
          className={classes.input}
        />
        {isMsg && <div>Preencha todos os dados!</div>}
        {isCreated && <div>Arquivo criado com sucesso!</div>}
        {isUpdate && <div>Arquivo atualizado com sucesso!</div>}
        {isError && (
          <div>Arquivo não foi criado! Aconteceu algum erro no servidor.</div>
        )}
        <button
          type="button"
          className="nl-bg text-white font-bold py-2 px-4 mt-3 rounded"
          onClick={onSubmitCourse}
        >
          Salvar
        </button>
      </div>
    </>
  );
};

export default FilesForm;
