import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FC, useEffect, useState } from 'react';
import Header from '../../components/Header/index';
import { Category } from '../../interfaces/category';
import { File } from '../../interfaces/file';
import api from '../../services/api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const FileCategory: FC = () => {
  const HeaderProps = {
    allowMenu: true,
    title: 'NL Classroom - Vincular Arquivo a Categoria',
  };
  const [idCategory, setIdCategory] = useState('');
  const [idFile, setIdFile] = useState('');
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [fileList, setFileList] = useState<File[]>([]);

  const [isMsg, setIsMsg] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const responseCategories = await api.get('/categories');

      setCategoryList(responseCategories.data);

      const responseFiles = await api.get('/files');

      setFileList(responseFiles.data);
    };

    getData();
  }, []);

  const onSubmit = async () => {
    setIsMsg(false);
    setIsError(false);
    if (idCategory !== ' ' && idFile !== ' ') {
      try {
        const response = await api.post('/file-category', {
          id_category: parseInt(idCategory, 10),
          id_file: parseInt(idFile, 10),
        });

        console.log(response.data);
        setIsCreated(true);
      } catch (error) {
        console.error(error);
        setIsError(true);
      }
    } else {
      setIsMsg(true);
    }
  };

  const classes = useStyles();
  const handleChangeFileId = (
    event: React.ChangeEvent<{ value: string | unknown }>,
  ) => {
    setIdFile(event.target.value as string);
  };
  const handleChangeCategoryId = (
    event: React.ChangeEvent<{ value: string | unknown }>,
  ) => {
    setIdCategory(event.target.value as string);
  };

  return (
    <>
      <Header {...HeaderProps} />
      <div className="flex flex-col justify-center items-center mt-10">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Categoria
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={idCategory}
            onChange={handleChangeCategoryId}
            label="Categoria"
          >
            <MenuItem key={0} value="">
              <em>None</em>
            </MenuItem>
            {categoryList.map((value: Category) => (
              <MenuItem key={value.num_seq} value={value.num_seq}>
                {value.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Arquivo
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={idFile}
            onChange={handleChangeFileId}
            label="Arquivo"
          >
            <MenuItem key={0} value="">
              <em>None</em>
            </MenuItem>
            {fileList.map((value: File) => (
              <MenuItem key={value.num_seq} value={value.num_seq}>
                {value.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <button
          type="button"
          className="nl-bg text-white font-bold py-2 px-4 rounded my-5"
          onClick={onSubmit}
        >
          Salvar
        </button>
        {isMsg && <div>Preencha todos os dados!</div>}
        {isError && <div>Esse vinculo já existe!</div>}
        {isCreated && <div>Vinculo criado com sucesso!</div>}
      </div>
    </>
  );
};

export default FileCategory;
