import React, { FC, useEffect, useState } from 'react';
import Header from '../../components/Header/index';
import apimg from '../../services/apimg';
import api from '../../services/api';
import { OneDriveFile } from '../../interfaces/onedrive-file';

const ApiMicrosoftGraph: FC = () => {
  const HeaderProps = {
    allowMenu: true,
    title: 'NL Classroom - Procurar no Onedrive do Treinamento',
  };

  const [listItemsInMyDrive, setListItemsInMyDrive] = useState<OneDriveFile[]>(
    [],
  );

  const [listShareWithMe, setListShareWithMe] = useState<OneDriveFile[]>([]);

  const getFilesInFolder = async (item: OneDriveFile) => {
    if (item.file) {
      try {
        await api.post('/files', {
          name: item.name,
          url: item.webUrl,
        });
      } catch (error) {
        console.error(error);
      }
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
  };

  const shareWithMe = async () => {
    const response = await apimg.get('/me/drive/sharedWithMe');
    setListShareWithMe(response.data.value);

    listShareWithMe.forEach((item: OneDriveFile) => {
      getFilesInFolder(item);
    });
  };

  const itemsInMyDrive = async () => {
    const response = await apimg.get('/me/drive/root/children');
    setListItemsInMyDrive(response.data.value);

    listItemsInMyDrive.forEach((item: OneDriveFile) => {
      getFilesInFolder(item);
    });
  };

  useEffect(() => {
    const getData = async () => {
      const response = await apimg.get('/me');

      console.log(response.data);
      itemsInMyDrive();
      shareWithMe();
    };

    getData();
  }, []);

  return (
    <>
      <Header {...HeaderProps} />

      <div className="mx-20 text-center" />
    </>
  );
};

export default ApiMicrosoftGraph;
