import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckAccessTokenQuery } from '../../api/services/auth';

import { Spin } from 'antd';
import Roles from '../../api/Roles';
import OrganizerLayout from './OrganizerLayout';
import HomeLayout from './home/HomeLayout';

export default function PublicLayout() {
    const {
        data: checkAccessTokenObj,
        isLoading: isAccessTokenLoading,
        error: checkAccessTokenError,
    } = useCheckAccessTokenQuery();

    const navigate = useNavigate();

    useEffect(() => {
        if (checkAccessTokenError) {
            navigate('/');
        }
    }, [checkAccessTokenError]);

    useEffect(() => {
        console.log(checkAccessTokenObj?.result?.user_role?.id);

        if (checkAccessTokenObj?.result?.user_role?.id == 2) {
            navigate('/org/our-events');
        } else if (checkAccessTokenObj?.result?.user_role?.id == 3) {
            navigate('/home');
        }
    }, [checkAccessTokenObj]);
    return (
        <>
            {isAccessTokenLoading && (
                <Spin
                    size='large'
                    spinning={isAccessTokenLoading}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                    }}
                />
            )}

            {checkAccessTokenObj?.result?.user_role?.id == Roles.EMPLOYEE ? (
                <OrganizerLayout roles={[Roles.EMPLOYEE]} />
            ) : checkAccessTokenObj?.result?.user_role?.id == Roles.ATTENDEE ? (
                <HomeLayout roles={[Roles.ATTENDEE]} />
            ) : (
                <></>
            )}
        </>
    );
}
