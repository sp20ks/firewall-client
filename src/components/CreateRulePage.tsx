import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import Input from './Input';
import { createRule } from '../api/rulesEngineService';

const CreateRulePage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,
        is_active: true,
      };
      await createRule(payload);
      alert('Правило успешно создано');
      navigate('/rules');
    } catch (error) {
      console.error('Ошибка при создании правила:', error);
      alert('Ошибка при создании правила');
    }
  };

  return (
    <div>
      <h2>Создать правило</h2>
      <Form onSubmit={onSubmit} handleSubmit={handleSubmit} register={register} buttonLabel="Создать">
        <Input
          name="name"
          label="Название"
          error={errors.name?.message as string}
          wrapperClass="form-group"
          className="form-control"
        />
        <Input
          name="attack_type"
          label="Тип атаки (xss, csrf, sqli)"
          error={errors.attack_type?.message as string}
          wrapperClass="form-group"
          className="form-control"
        />
        <Input
          name="action_type"
          label="Тип защиты (block, sanitize, escape)"
          error={errors.attack_type?.message as string}
          wrapperClass="form-group"
          className="form-control"
        />
      </Form>
    </div>
  );
};

export default CreateRulePage;
