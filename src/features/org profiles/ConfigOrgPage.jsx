import { Form, Skeleton, Tabs } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  useAddOrgAddressMutation,
  useConfigureOrgMutation,
  useGetOrgQuery,
  useRemoveOrgAddressMutation,
} from './orgSlice';
import AddressesForm from './configure org/AddressesForm'
import BasicForm from './configure org/BasicForm';
import Header from './configure org/Header';
import MembersList from './configure org/MembersList';
import ContactInfoForm from './configure org/ContactInfoForm';


export default function ConfigOrgPage() {
  let { orgId } = useParams();

  const [basicForm] = Form.useForm();
  const [addressForm] = Form.useForm();
  const [contactInfoForm] = Form.useForm();

  const {
    data: { result: org } = { result: {} },
    isLoading: isGetOrgLoading,
    isSuccess: isGetOrgSuccess,
  } = useGetOrgQuery(orgId);

  const [
    configureOrg,
    { isLoading: isConfigLoading, isSuccess: isConfigSuccess },
  ] = useConfigureOrgMutation();
  const [addOrgAddress] = useAddOrgAddressMutation();
  const [removeOrgAddress] = useRemoveOrgAddressMutation();

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
        <>
          <BasicForm
            orgData={org}
            form={basicForm}
            onFinish={(fields) => {
              configureOrg({ ...fields, organization_id: orgId });
            }}
          />
        </>
      ),
    },
    {
      key: '2',
      label: 'address',
      children: (
        <>
          <AddressesForm
            org={org}
            isOrgLoading={isGetOrgLoading}
            form={addressForm}
            addOrgAddress={(fields) => {
              addOrgAddress({ address_id: fields['city'], orgId: org?.id })
                .unwrap()
                .then(() => {
                  addressForm.resetFields();
                })
                .catch(() => {});
            }}
            removeOrgAddress={(address_id) =>
              removeOrgAddress({
                address_id,
                orgId: org?.id,
              })
            }
          />
        </>
      ),
    },
    {
      key: '3',
      label: 'contact info',
      children: (
        <>
          <ContactInfoForm
            form={contactInfoForm}
            onFinish={() => {}}
          />
        </>
      ),
    },
    {
      key: '4',
      label: 'members',
      children: (
        <>
          <MembersList org={org} />
        </>
      ),
    },
  ];

  return (
    <>
      <Header />
      <Skeleton loading={isGetOrgLoading}>
        <Tabs
          defaultActiveKey='1'
          items={tabsItems}
        />
      </Skeleton>
    </>
  );
}
