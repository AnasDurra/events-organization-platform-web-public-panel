// import Cookies from 'js-cookie';
import { errorMessage } from '../../utils/messages.api.jsx';
import { router } from '../../router/index.jsx';
import Cookies from 'js-cookie';

const apiError = (store) => (next) => async (action) => {
    const response = await next(action);
    const statusCode = action?.meta?.baseQueryMeta?.response?.status;

    if (statusCode === 404) {
        if (!window.location.pathname.startsWith('/login')) {
/*             router.navigate('/not-found', { replace: true });
 */        } else errorMessage({ content: 'ERROR 404' });
    } else if (statusCode == 403) {
        Object.keys(Cookies.get()).forEach((cookieName) => {
            Cookies.remove(cookieName);
        });
        router.navigate('/blocked', { replace: true });
    }

    // if (statusCode === 401 || statusCode === 403) {
    //     if (!window.location.pathname.startsWith("/login")) {
    //         router.navigate("/login", { replace: true });
    //     } else errorMessage({ content: message });
    // }
    return response;
};

export default apiError;
