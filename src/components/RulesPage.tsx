import React, { useEffect, useState } from 'react';
import { fetchRules } from '../api/rulesEngineService';

interface Rule {
  id: string;
  name: string;
  attack_type: string;
  action_type: string;
  is_active?: boolean;
  creator_id?: string;
  created_at?: string;
}

const RulesPage: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>([]);

  useEffect(() => {
    fetchRules().then((res) => {
      setRules(res.data.data.rules);
    });
  }, []);

  return (
    <div>
      <h2>Правила</h2>
      <table className="rules-table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Тип атаки</th>
            <th>Действие</th>
            <th>Активно</th>
            <th>Создатель</th>
            <th>Дата создания</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => (
            <tr key={rule.id}>
              <td>{rule.name}</td>
              <td>{rule.attack_type}</td>
              <td>{rule.action_type}</td>
              <td>{rule.is_active ? 'Да' : 'Нет'}</td>
              <td>{rule.creator_id}</td>
              <td>{new Date(rule.created_at || '').toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RulesPage;
