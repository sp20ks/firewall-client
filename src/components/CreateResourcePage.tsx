import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import Input from './Input';
import { createResource } from '../api/rulesEngineService';

const CreateResourcePage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,
        is_active: true,
      };
      await createResource(payload);
      alert('Ресурс успешно создан');
      navigate('/resources');
    } catch (error) {
      console.error('Ошибка при создании ресурса:', error);
      alert('Ошибка при создании ресурса');
    }
  };

  return (
    <div>
      <h2>Создать ресурс</h2>
      <Form onSubmit={onSubmit} handleSubmit={handleSubmit} register={register} buttonLabel="Создать">
        <Input name="name" label="Название" error={errors.name?.message as string} register={register} />
        <Input name="http_method" label="Метод (GET, POST и т.д.)" error={errors.http_method?.message as string} register={register} />
        <Input name="url" label="URL (например, /server3)" error={errors.url?.message as string} register={register} />
        <Input name="host" label="Хост (например, http://server3:4567)" error={errors.host?.message as string} register={register} />
        <Input name="creator_id" label="ID создателя" error={errors.creator_id?.message as string} register={register} />
      </Form>
    </div>
  );
};

export default CreateResourcePage;
