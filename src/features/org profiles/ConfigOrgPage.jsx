import { Form, Skeleton, Tabs } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddressesForm from './configure org/AddressesForm';
import BasicForm from './configure org/BasicForm';
import ContactInfoForm from './configure org/ContactInfoForm';
import Header from './configure org/Header';
import MembersList from './configure org/MembersList';
import {
    useAddOrgAddressMutation,
    useConfigureOrgMutation,
    useGetOrgQuery,
    useRemoveOrgAddressMutation,
} from './orgSlice';

export default function ConfigOrgPage() {
    let { orgId = 1 } = useParams();

    const [basicForm] = Form.useForm();
    const [addressForm] = Form.useForm();
    const [contactInfoForm] = Form.useForm();

    const {
        data: { result: org } = { result: {} },
        isLoading: isGetOrgLoading,
        isSuccess: isGetOrgSuccess,
    } = useGetOrgQuery(orgId);

    const [configureOrg] = useConfigureOrgMutation();
    const [addOrgAddress] = useAddOrgAddressMutation();
    const [removeOrgAddress] = useRemoveOrgAddressMutation();

    const handleAddOrgAddress = (fields) => {
        addOrgAddress({ address_id: fields['city'], orgId: org?.id })
            .unwrap()
            .then(() => {
                addressForm.resetFields();
            })
            .catch(() => {});
    };

    const handleRemoveOrgAddress = (address_id) =>
        removeOrgAddress({
            address_id,
            orgId: org?.id,
        });

    useEffect(() => {
        if (isGetOrgSuccess) {
            basicForm.setFieldsValue({
                name: org?.name,
                bio: org?.bio,
                description: org?.description,
            });
        }
    }, [isGetOrgSuccess]);

    const tabsItems = [
        {
            key: '1',
            label: 'basic',
            children: (
                <BasicForm
                    orgData={org}
                    form={basicForm}
                    onFinish={(fields) => {
                        configureOrg({ ...fields, organization_id: orgId });
                    }}
                />
            ),
        },
        {
            key: '2',
            label: 'address',
            children: (
                <AddressesForm
                    org={org}
                    isOrgLoading={isGetOrgLoading}
                    form={addressForm}
                    addOrgAddress={handleAddOrgAddress}
                    removeOrgAddress={handleRemoveOrgAddress}
                />
            ),
        },
        {
            key: '3',
            label: 'contact info',
            children: (
                <ContactInfoForm
                    form={contactInfoForm}
                    onFinish={() => {}}
                />
            ),
        },
        {
            key: '4',
            label: 'members',
            children: <MembersList org={org} />,
        },
    ];

    return (
        <div className='grid grid-cols-12'>
            <div className='sm:col-start-4 sm:col-span-12  col-span-12'>
                <Header />
                <Skeleton loading={isGetOrgLoading}>
                    <Tabs
                        defaultActiveKey='1'
                        items={tabsItems}
                    />
                </Skeleton>
            </div>
        </div>
    );
}
