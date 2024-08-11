import Cookies from 'js-cookie';
import { auth } from '../services/auth';
import { errorMessage } from '../../utils/messages.api.jsx';
import { router } from '../../router/index.jsx';

const authMiddleware = (store) => (next) => async (action) => {
    var response = await next(action);
    if (response.payload?.status == 401 || response.payload?.status == 403) {
        if (Cookies.get('refreshToken')) {
            const refreshToken = Cookies.get('refreshToken');
            Cookies.remove('refreshToken');
            store.dispatch(auth.endpoints.refresh.initiate(refreshToken));

            response = await next(action);
        }
        if (response.payload?.status == 401 && !window.location.pathname.startsWith('/login')) {
            console.log('Here');
            console.log(response);
            errorMessage({ content: 'Session Timeout.. login again' });
            router.navigate('/', { replace: true });
        }
    }

    return response;
};

export default authMiddleware;
