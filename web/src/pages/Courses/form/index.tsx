import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../../../components/Header/index';
import { Category } from '../../../interfaces/category';
import { Course } from '../../../interfaces/course';
import api from '../../../services/api';
import { getUsername } from '../../../util/index';

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

const CoursesForm: FC = () => {
  const [data, setData] = useState<Category[]>([]);
  const [idCategoria, setIdCategoria] = useState('');
  const [nameCourse, setNameCourse] = useState('');
  const [createdBy, setCreateBy] = useState('');
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
      const response = await api.get('/categories');
      setData(response.data);

      if (id) {
        setCurrentTitle('NL Classroom - Editar Curso');

        const { data: course } = await api.get<Course>(`/Courses/${id}`);

        setIdCategoria(course.id_category.num_seq);
        setNameCourse(course.name);
        setCreateBy(course.createdBy);
      } else {
        setCurrentTitle('NL Classroom - Criar Curso');
      }
    };

    getData();
  }, []);

  const classes = useStyles();
  const handleChange = (
    event: React.ChangeEvent<{ value: string | unknown }>,
  ) => {
    setIdCategoria(event.target.value as string);
  };

  const onSubmitCourse = async () => {
    setIsMsg(false);
    setIsCreated(false);
    setIsUpdate(false);
    setIsError(false);
    if (id) {
      try {
        await api.put(`/courses/${id}`, {
          name: nameCourse,
          id_category: parseInt(idCategoria, 10),
          createdBy,
        });

        setIsUpdate(true);
        setNameCourse('');
        setIdCategoria(' ');
        history.push('/course/list');
      } catch (error) {
        console.error(error);
        setIsError(true);
      }
    } else if (idCategoria !== ' ' && nameCourse !== '') {
      try {
        await api.post('/courses', {
          name: nameCourse,
          id_category: parseInt(idCategoria, 10),
          createdBy: getUsername(),
        });

        setIsCreated(true);
        setNameCourse('');
        setIdCategoria(' ');
      } catch (error) {
        console.error(error);
        setIsError(true);
      }
    } else {
      setIsMsg(true);
    }
  };

  return (
    <>
      <Header {...HeaderProps} />
      <div className="flex flex-col justify-center items-center">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Categoria
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={idCategoria}
            onChange={handleChange}
            label="Categoria"
          >
            <MenuItem key={0} value="">
              <em>None</em>
            </MenuItem>
            {data.map((value: Category) => (
              <MenuItem key={value.num_seq} value={value.num_seq}>
                {value.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          id="outlined-basic"
          label="Curso"
          variant="outlined"
          value={nameCourse}
          onChange={(e: any) => setNameCourse(e.target.value)}
        />
        {isMsg && <div className="mt-3">Preencha todos os dados!</div>}
        {isCreated && <div className="mt-3">Curso criado com sucesso!</div>}
        {isUpdate && <div className="mt-3">Curso atualizado com sucesso!</div>}
        {isError && (
          <div className="mt-3">
            Curso não foi criado! Aconteceu algum erro no servidor.
          </div>
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

export default CoursesForm;
