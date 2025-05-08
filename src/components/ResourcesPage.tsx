import React, { useEffect, useState } from 'react';
import { fetchResources } from '../api/rulesEngineService';
import { Link } from 'react-router-dom';

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

  useEffect(() => {
    fetchResources().then((res) => {
      setResources(res.data.data.resources);
    });
  }, []);

  return (
    <div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Метод</th>
            <th>URL</th>
            <th>Ссылка</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((res) => (
            <tr key={res.id}>
              <td>{res.name}</td>
              <td>{res.http_method}</td>
              <td>{res.url}</td>
              <td>
                <Link to={`/resources/${res.id}`}>Подробнее</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResourcesPage;
