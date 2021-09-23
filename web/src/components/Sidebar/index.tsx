import { SwipeableDrawer } from '@material-ui/core';
import {
  CategoryOutlined,
  ClassOutlined,
  DescriptionOutlined,
  HomeOutlined,
  SyncAltOutlined,
  SyncOutlined,
} from '@material-ui/icons';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import NlOrangeLogo from '../../assets/logo.png';
import SidebarButton from '../SidebarButton';

interface SidebarProps {
  // eslint-disable-next-line react/require-default-props
  width?: number;
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  open,
  onClose,
  width: minWidth = 300,
}) => {
  const history = useHistory();
  const location = useLocation();

  const toggleDrawer =
    () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      onClose();
    };

  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={onClose}
      onOpen={toggleDrawer()}
    >
      <div
        className="right-0 top-0 bottom-0 bg-white p-5"
        style={{
          zIndex: 100,
          minWidth,
        }}
      >
        <div className="flex justify-center">
          <div className="flex flex-row">
            <img
              src={NlOrangeLogo}
              alt="NlLogoLaranja"
              className="self-end"
              style={{ height: 41, width: 83, marginBottom: 3 }}
            />
            <h2 className="mt-7 ml-0.5 text-sm text-gray-500">CLASSROOM</h2>
          </div>
        </div>

        <hr className="my-4" />

        <div className="flex w-full flex-col gap-y-2 ">
          <h2 className="text-gray-900">Geral</h2>
          <SidebarButton
            onClick={() => history.push('/home')}
            isActive={location.pathname === '/home'}
            title="Home"
            startIcon={<HomeOutlined />}
          />

          <h2 className="text-gray-900 mt-2">Treinamentos</h2>
          <SidebarButton
            onClick={() => history.push('/file/list')}
            isActive={location.pathname === '/file/list'}
            title="Arquivos"
            startIcon={<DescriptionOutlined />}
          />
          <SidebarButton
            onClick={() => history.push('/category/list')}
            isActive={location.pathname === '/category'}
            title="Categorias"
            startIcon={<CategoryOutlined />}
          />
          <SidebarButton
            onClick={() => history.push('/course/list')}
            isActive={location.pathname === '/course'}
            title="Cursos"
            startIcon={<ClassOutlined />}
          />
          <SidebarButton
            onClick={() => history.push('/apimg')}
            isActive={location.pathname === '/apimg'}
            title="API microsoft Graph"
            startIcon={<SyncOutlined />}
          />
          <SidebarButton
            onClick={() => history.push('/file-course')}
            isActive={location.pathname === '/file-course'}
            title="Vincular Arquivo em Curso"
            startIcon={<SyncAltOutlined />}
          />
          <SidebarButton
            onClick={() => history.push('/file-category')}
            isActive={location.pathname === '/file-category'}
            title="Vincular Arquivo em Categoria"
            startIcon={<SyncAltOutlined />}
          />
          {/* Outras rotas ... */}
        </div>
      </div>
    </SwipeableDrawer>
  );
};

export default Sidebar;
