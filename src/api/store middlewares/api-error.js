// import Cookies from 'js-cookie';
import { errorMessage } from '../../utils/messages.api.jsx';
import { router } from '../../router/index.jsx';

const apiError = (store) => (next) => async (action) => {
    const response = await next(action);
    const { statusCode, message } = response?.payload?.data || {};

    // if (statusCode === 401 || statusCode === 403) {
    //     if (!window.location.pathname.startsWith("/login")) {
    //         router.navigate("/login", { replace: true });
    //     } else errorMessage({ content: message });
    // } else
    if (statusCode > 299 && statusCode != 401) {
        // errorMessage({ content: message }); // TODO comment this
    }

    return response;
};

export default apiError;
