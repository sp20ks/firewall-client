import React, { useEffect, useState } from 'react';
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
          </tr>
        </thead>
        <tbody>
          {lists.map((list) => (
            <tr key={list.id}>
              <td>{list.ip}</td>
              <td>{list.list_type}</td>
              <td>{list.creator_id}</td>
              <td>{new Date(list.created_at || '').toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IPListsPage;
