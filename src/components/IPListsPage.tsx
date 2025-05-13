import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchIPLists } from '../api/rulesEngineService';

interface IPList {
  id: string;
  ip: string;
  list_type: string;
  creator_id?: string;
  created_at?: string;
}

const IPListsPage: React.FC = () => {
  const [lists, setIPLists] = useState<IPList[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchIPLists().then((res) => {
      setIPLists(res.data.data.ip_lists);
    });
  }, []);

  return (
    <div>
      <h2>IP списки</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>CIDR</th>
            <th>Тип списка</th>
            <th>Создатель</th>
            <th>Дата создания</th>
            <th>Ссылка на редактирование</th>
          </tr>
        </thead>
        <tbody>
          {lists.map((list) => (
            <tr key={list.id}>
              <td>{list.ip}</td>
              <td>{list.list_type}</td>
              <td>{list.creator_id}</td>
              <td>{new Date(list.created_at || '').toLocaleString()}</td>
              <td>
                <Link to={`/ip_lists/${list.id}/edit`} state={{ ipList: list }}>
                  Редактировать
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate('/ip_lists/create')}>
          Создать IP список
        </button>
      </div>
    </div>
  );
};

export default IPListsPage;
