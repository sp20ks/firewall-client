import React from 'react';
import { translateError } from '../errorTranslator';

interface LogoutButtonProps {
    onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
    const handleLogout = async () => {
        try {
            alert('Вы успешно вышли из системы!');
            onLogout();
        } catch (err) {
            const readableError = translateError(err);
            alert(readableError);
        }
    };

    return <button onClick={handleLogout}>Выйти</button>;
};

export default LogoutButton;
