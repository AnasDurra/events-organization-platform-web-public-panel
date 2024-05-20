import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isLargerThanLG } from '../../utils/antd.utils';
import { getLoggedInUserV2, useCheckAccessTokenQuery } from '../../api/services/auth';

import { Spin } from 'antd';
import Roles from '../../api/Roles';
import OrganizerLayout from './OrganizerLayout';
import HomeLayout from './HomeLayout';

export default function PublicLayout({ roles }) {
    const user = getLoggedInUserV2();
    const {
        data: checkAccessTokenObj,
        isLoading: isAccessTokenLoading,
        error: checkAccessTokenError,
    } = useCheckAccessTokenQuery();

    const navigate = useNavigate();

    useEffect(() => {
        if (checkAccessTokenError) {
            navigate('/login');
        }
    }, [checkAccessTokenError]);

    return (
        <>
            <Spin spinning={isAccessTokenLoading}>
                {checkAccessTokenObj?.result?.user_role?.id == Roles.EMPLOYEE ? (
                    <OrganizerLayout roles={[Roles.EMPLOYEE]} />
                ) : (
                    <HomeLayout roles={[Roles.ATTENDEE]} />
                )}
            </Spin>
        </>
    );
}
