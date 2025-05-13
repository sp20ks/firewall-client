import React, { useEffect, useState } from 'react';
import { fetchResources } from '../api/rulesEngineService';
import { Link, useNavigate } from 'react-router-dom';

interface Resource {
  id: string;
  name: string;
  http_method: string;
  url: string;
  host?: string;
  is_active?: boolean;
}

const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResources().then((res) => {
      setResources(res.data.data.resources);
    });
  }, []);

  return (
    <div>
      <h2>Ресурсы</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Метод</th>
            <th>Активен</th>
            <th>URL</th>
            <th>Ссылка</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((res) => (
            <tr key={res.id}>
              <td>{res.name}</td>
              <td>{res.http_method}</td>
              <td>{res.is_active ? 'Да' : 'Нет'}</td>
              <td>{res.url}</td>
              <td>
                <Link to={`/resources/${res.id}`}>Подробнее</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate('/resources/create')}>
          Создать ресурс
        </button>
      </div>
    </div>
  );
};

export default ResourcesPage;
