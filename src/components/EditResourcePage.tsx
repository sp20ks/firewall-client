import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';

import Form from './Form';
import Input from './Input';

import {
  fetchResourceById,
  updateResource,
  fetchRules,
  fetchIPLists,
  attachRuleToResource,
  detachRuleFromResource,
  attachIpListToResource,
  detachIpListFromResource,
} from '../api/rulesEngineService';

const EditResourcePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [resource, setResource] = useState<any>(null);
  const [allRules, setAllRules] = useState([]);
  const [allIpLists, setAllIpLists] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (id) {
      fetchResourceById(id).then((res) => {
        const data = res.data.data;
        setResource(data);
        setValue('name', data.name);
        setValue('http_method', data.http_method);
        setValue('url', data.url);
        setValue('host', data.host);
        setValue('is_active', data.is_active);
      });

      fetchRules().then(res => setAllRules(res.data.data.rules));
      fetchIPLists().then(res => setAllIpLists(res.data.data.ip_lists));
    }
  }, [id, setValue]);

  const reload = () => {
    fetchResourceById(id!).then((res) => {
      setResource(res.data.data);
    });
  };

  const onSubmit = async (data: any) => {
    try {
      await updateResource(id!, data);
      alert('Ресурс обновлён');
      navigate('/resources');
    } catch (error) {
      alert('Ошибка при обновлении ресурса');
    }
  };

  const handleAttachRule = async (ruleId: string) => {
    await attachRuleToResource(id!, ruleId);
    reload();
  };

  const handleDetachRule = async (ruleId: string) => {
    await detachRuleFromResource(id!, ruleId);
    reload();
  };

  const handleAttachIpList = async (ipListId: string) => {
    await attachIpListToResource(id!, ipListId);
    reload();
  };

  const handleDetachIpList = async (ipListId: string) => {
    await detachIpListFromResource(id!, ipListId);
    reload();
  };

  if (!resource) return <div>Загрузка...</div>;

  return (
    <>
      <h2>Редактировать ресурс</h2>

      <div className="edit-resource-page">
        <Form
          className="edit-resource-form"
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          register={register}
          buttonLabel="Сохранить"
        >
          <Input name="name" label="Название" error={errors.name?.message as string} />
          <Input name="http_method" label="HTTP-метод" error={errors.http_method?.message as string} />
          <Input name="url" label="URL" error={errors.url?.message as string} />
          <Input name="host" label="Хост" error={errors.host?.message as string} />

          <div className="form-group checkbox-group">
            <label>
              <input type="checkbox" {...register('is_active')} /> Активен
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="rules-select">Привязать правило</label>
            <select
              id="rules-select"
              onChange={(e) => {
                if (e.target.value) handleAttachRule(e.target.value);
                e.target.value = '';
              }}
              defaultValue=""
            >
              <option value="" disabled>Выберите правило</option>
              {allRules
                .filter((r: any) => !resource.rules?.some((rr: any) => rr.id === r.id))
                .map((r: any) => (
                  <option key={r.id} value={r.id}>
                    {r.attack_type} → {r.action_type}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="iplist-select">Привязать IP-лист</label>
            <select
              id="iplist-select"
              onChange={(e) => {
                if (e.target.value) handleAttachIpList(e.target.value);
                e.target.value = '';
              }}
              defaultValue=""
            >
              <option value="" disabled>Выберите IP-лист</option>
              {allIpLists
                .filter((ip: any) => !resource.ip_lists?.some((ipp: any) => ipp.id === ip.id))
                .map((ip: any) => (
                  <option key={ip.id} value={ip.id}>
                    {ip.list_type}: {ip.ip}
                  </option>
                ))}
            </select>
          </div>
        </Form>

        <aside className="resource-side-panel">
          <div className="list-section">
            <h3>Правила</h3>
            <ul>
              {resource.rules?.map((r: any) => (
                <li key={r.id}>
                  <span>{r.attack_type} → {r.action_type}</span>
                  <button
                    type="button"
                    className="detach-button"
                    onClick={() => handleDetachRule(r.id)}
                  >
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="list-section">
            <h3>IP-листы</h3>
            <ul>
              {resource.ip_lists?.map((ip: any) => (
                <li key={ip.id}>
                  <span>{ip.list_type}: {ip.ip}</span>
                  <button
                    type="button"
                    className="detach-button"
                    onClick={() => handleDetachIpList(ip.id)}
                  >
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};

export default EditResourcePage;