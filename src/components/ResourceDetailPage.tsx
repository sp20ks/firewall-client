import React, { useEffect, useState } from 'react';
import { fetchResourceById } from '../api/rulesEngineService';
import { useParams, useNavigate } from 'react-router-dom';

const ResourceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [resource, setResource] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchResourceById(id).then((res) => {
        setResource(res.data.data);
      });
    }
  }, [id]);

  if (!resource) return <div>Загрузка...</div>;

  return (
    <div className="resource-detail-container">
      <div className="resource-content">
        <h2>{resource.name}</h2>
        <p><strong>URL:</strong> {resource.url}</p>
        <p><strong>Метод:</strong> {resource.http_method}</p>
        <p><strong>Хост:</strong> {resource.host}</p>

        <h3>Правила</h3>
        <ul>
          {resource.rules?.map((rule: any) => (
            <li key={rule.id}>
              {rule.attack_type} → {rule.action_type}
            </li>
          )) || <li>Нет правил</li>}
        </ul>

        <h3>IP-листы</h3>
        <ul>
          {resource.ip_lists?.map((ip: any) => (
            <li key={ip.id}>
              {ip.list_type}: {ip.ip}
            </li>
          )) || <li>Нет IP-листов</li>}
        </ul>
      </div>

      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Назад
        </button>
        <button className="back-button" onClick={() => navigate(`/resources/${resource.id}/edit`)}>
          Редактировать ресурс
        </button>
      </div>
    </div>
  );
};

export default ResourceDetailPage;
