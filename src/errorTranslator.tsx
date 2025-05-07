const errorMappings: Record<string, string> = {
    'Error while creating user': 'Ошибка создания клиента.',
    'Invalid token': 'Попробуйте авторизоваться заново.',
    'Both \'username\' and \'password\' must be provided': 'Заполните все поля.',
};

export const translateError = (error: any): string => {
    const errorMessage = error.response?.data?.error || error.response?.statusText || error.message || 'Unknown error';

    for (const keyword in errorMappings) {
        if (errorMessage.includes(keyword)) {
            return errorMappings[keyword];
        }
    }

    return 'Произошла неизвестная ошибка. Пожалуйста, попробуйте снова.';
};
