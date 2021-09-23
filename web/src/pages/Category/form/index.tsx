import TextField from '@material-ui/core/TextField';
import React, { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../../../components/Header/index';
import api from '../../../services/api';

const CategoryForm: FC = () => {
  const [name, setName] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [isError, setIsError] = useState(false);
  const [isMsg, setIsMsg] = useState(false);
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const HeaderProps = {
    allowMenu: true,
    title: currentTitle,
  };

  const handleSubmit = async () => {
    setIsError(false);
    if (name !== '') {
      if (id) {
        try {
          const response = await api.put(`/categories/${id}`, {
            id,
            name,
          });

          console.log(response.data);
          setName('');
          history.push('/category/list');
        } catch (error) {
          setIsError(true);
        }
      } else {
        try {
          const response = await api.post(`/categories`, {
            name,
          });

          console.log(response.data);
          setName('');
          history.push('/category/list');
        } catch (error) {
          setIsError(true);
        }
      }
    } else {
      setIsMsg(true);
    }
  };

  useEffect(() => {
    const getData = async () => {
      if (id) {
        const response = await api.get(`/categories/${id}`);

        setName(response.data.name);
        console.log(response.data);

        setCurrentTitle('NL Classroom - Editar Categoria');
      } else {
        setCurrentTitle('NL Classroom - Criar Categoria');
      }
    };

    getData();
  }, []);

  return (
    <>
      <Header {...HeaderProps} />
      <div className="flex flex-col justify-center items-center pt-10">
        <TextField
          id="outlined-basic"
          label="Categoria"
          variant="outlined"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
        />
        {isMsg && <div>Preencha todos os dados!</div>}
        {isError && (
          <div>Categoria não foi criado! Aconteceu algum erro no servidor.</div>
        )}
        <button
          type="button"
          className="nl-bg text-white font-bold py-2 px-4 rounded mt-3"
          onClick={() => handleSubmit()}
        >
          Salvar
        </button>
      </div>
    </>
  );
};

export default CategoryForm;
