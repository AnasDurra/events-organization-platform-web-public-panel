import { message } from 'antd';

export function successMessage({ content }) {
    message.success(content);
}

export function loadingMessage({ content }) {
    message.loading(content);
}

export function errorMessage({ content }) {
    message.error(content);
}
