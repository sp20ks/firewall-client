import React, { useEffect, useState } from 'react';
import { fetchResources } from '../api/rulesEngineService';
import { Link } from 'react-router-dom';

interface Resource {
  id: string;
  name: string;
  http_method: string;
  url: string;
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
      <h2>Ресурсы</h2>
      <ul>
        {resources.map((res) => (
          <li key={res.id}>
            <Link to={`/resources/${res.id}`}>
              {res.name} ({res.http_method} {res.url})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourcesPage;
