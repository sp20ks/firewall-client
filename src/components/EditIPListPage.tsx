import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Form from './Form';
import Input from './Input';
import { updateIPList } from '../api/rulesEngineService';

const EditIPListPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ipList } = location.state || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ip: ipList?.ip || '',
      list_type: ipList?.list_type || 'whitelist',
    },
  });

  if (!ipList) {
    return <p>IP-лист не найден. Перейдите со страницы IP списков.</p>;
  }

  const onSubmit = async (data: any) => {
    try {
      await updateIPList(ipList.id, data);
      navigate('/ip_lists');
    } catch (error) {
      console.error('Ошибка при обновлении IP-листа:', error);
    }
  };

  return (
    <div>
      <h2>Редактирование IP-листа</h2>
      <Form onSubmit={onSubmit} handleSubmit={handleSubmit} register={register} buttonLabel="Сохранить">
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
      </Form>
    </div>
  );
};

export default EditIPListPage;
