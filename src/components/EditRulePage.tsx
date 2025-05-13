import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Form from './Form';
import Input from './Input';
import { updateRule } from '../api/rulesEngineService';

const EditRulePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { rule } = location.state || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: rule?.name || '',
      attack_type: rule?.attack_type || 'sqli',
      action_type: rule?.action_type || 'block',
      is_active: rule?.is_active || true
    },
  });

  if (!rule) {
    return <p>Правило не найдено. Перейдите со страницы Правил.</p>;
}

  const onSubmit = async (data: any) => {
    try {
      await updateRule(rule.id, data);
      navigate('/rules');
    } catch (error) {
      console.error('Ошибка при обновлении списка:', error);
    }
  };

  return (
    <div>
      <h2>Редактирование списка</h2>
      <Form onSubmit={onSubmit} handleSubmit={handleSubmit} register={register} buttonLabel="Сохранить">
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
        <div className="form-group d-flex flex-column align-items-start">
          <label htmlFor="is_active" className="form-label">Активен?</label>
          <input
            type="checkbox"
            id="is_active"
            {...register('is_active')}
            defaultChecked={rule?.is_active}
            className="form-check-input"
          />
        </div>
      </Form>
    </div>
  );
};

export default EditRulePage;
