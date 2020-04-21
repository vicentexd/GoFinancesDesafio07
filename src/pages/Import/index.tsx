import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    const data = new FormData();

    try {
      await Promise.all(
        uploadedFiles.map(async (file) => {
          data.set('file', file.file);

          const response = await api.post('/transactions/import', data);

          return response;
        }),
      );

      setUploadedFiles([]);

      history.push('/');
    } catch (err) {
      console.log(err.response.error);
    }
  }

  function submitFile(files: File[]): void {
    const uploadedFile = files.reduce((acc, file) => {
      const { name, size } = file;
      const readableSize = filesize(size);

      return [...acc, { file, name, readableSize }];
    }, [] as FileProps[]);
    setUploadedFiles([...uploadedFiles, ...uploadedFile]);
  }

  return (
    <>
      <Header size="small" page="import" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
