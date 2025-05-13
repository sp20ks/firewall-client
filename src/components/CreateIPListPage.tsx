import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import Input from './Input';
import { createIPList } from '../api/rulesEngineService';

const CreateIPListPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await createIPList(data);
      alert('Список успешно создан');
      navigate('/ip_lists');
    } catch (error) {
      console.error('Ошибка при создании списка:', error);
      alert('Ошибка при создании списка');
    }
  };

  return (
    <div>
      <h2>Создать список</h2>
      <Form onSubmit={onSubmit} handleSubmit={handleSubmit} register={register} buttonLabel="Создать">
        <Input
          name="ip"
          label="CIDR"
          error={errors.ip?.message as string}
          wrapperClass="form-group"
          className="form-control"
        />
        <Input
          name="list_type"
          label="Тип списка (whitelist или blacklist)"
          error={errors.list_type?.message as string}
          wrapperClass="form-group"
          className="form-control"
        />
       <Input name="creator_id" label="ID создателя" error={errors.creator_id?.message as string} register={register} />
      </Form>
    </div>
  );
};

export default CreateIPListPage;
