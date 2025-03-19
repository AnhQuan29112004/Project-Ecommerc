export function getCSRFToken() {
    const token = document.querySelector('[name=csrfmiddlewaretoken]');
    if (!token) {
        console.error('CSRF token not found');
        return '';
    }
    return token.value;
}