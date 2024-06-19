import { Form, Skeleton, Tabs, message } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddressesForm from './AddressesForm';
import BasicForm from './BasicForm';
import ContactInfoForm from './ContactInfoForm';
import Header from './Header';
import MembersList from './MembersList';
import {
    useAddContactMutation,
    useAddOrgAddressMutation,
    useConfigureOrgMutation,
    useGetOrgQuery,
    useNewCoverPicMutation,
    useNewProfilePicMutation,
    useRemoveContactMutation,
    useRemoveOrgAddressMutation,
} from '../orgSlice';
import { contactTypeIds } from '../constants';

export default function ConfigOrgPage() {
    let { orgId = 1 } = useParams();

    const [basicForm] = Form.useForm();
    const [addressForm] = Form.useForm();
    const [contactInfoForm] = Form.useForm();

    const {
        data: { result: org } = { result: {} },
        isLoading: isGetOrgLoading,
        isFetching: isGetOrgFetching,
        isSuccess: isGetOrgSuccess,
    } = useGetOrgQuery(orgId);

    const [configureOrg, { isLoading: isConfigLoading }] = useConfigureOrgMutation();
    const [newCoverPic, { isLoading: isCoverLoading }] = useNewCoverPicMutation();
    const [newProfilePic, { isLoading: isProfileLoading }] = useNewProfilePicMutation();

    const [addOrgAddress, { isLoading: isAddAddressLoading }] = useAddOrgAddressMutation();
    const [removeOrgAddress, { isLoading: isRemoveAddressLoading }] = useRemoveOrgAddressMutation();

    const [addContact, { isLoading: isAddContactLoading }] = useAddContactMutation();
    const [removeContact, { isLoading: isRemoveContactLoading }] = useRemoveContactMutation();

    const idToFieldName = Object.entries(contactTypeIds).reduce((acc, [fieldName, id]) => {
        acc[id] = fieldName;
        return acc;
    }, {});

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

    const handleContactInfoFinish = async (newContactInfo) => {
        const oldContactInfo = org.contacts.reduce((acc, contact) => {
            const fieldName = idToFieldName[contact.contact.id];
            if (fieldName) {
                acc[contact.contact.id] = {
                    content: contact.content,
                    id: contact.id,
                    contact_id: contact.contact.id,
                };
            }
            return acc;
        }, {});

        const newContactInfoWithIds = Object.entries(newContactInfo).reduce((acc, [key, value]) => {
            const contactId = contactTypeIds[key];
            if (contactId) {
                acc[contactId] = value;
            }
            return acc;
        }, {});

        const keys = Object.keys(newContactInfoWithIds);

        console.log(keys);

        for (const key of keys) {
            const oldContent = oldContactInfo[key];
            const newContent = newContactInfoWithIds[key];

            if (newContent !== oldContent?.content) {
                if (oldContent?.content) {
                    await removeContact({
                        contact_id: oldContent.contact_id,
                        orgId: org.id,
                    })
                        .unwrap()
                        .catch((e) => message.error(`Failed to remove ${idToFieldName[key]}`));
                }
                if (newContent) {
                    await addContact({
                        contact_id: key,
                        content: newContent,
                        orgId: org.id,
                    })
                        .unwrap()
                        .catch((e) => message.error(`Failed to add ${idToFieldName[key]}`));
                }
            }
        }

        for (const oldKey of Object.keys(oldContactInfo)) {
            if (!keys.includes(oldKey)) {
                await removeContact({
                    contact_id: oldContactInfo[oldKey].contact_id,
                    orgId: org.id,
                })
                    .unwrap()
                    .catch((e) => message.error(`Failed to remove ${idToFieldName[oldKey]}`));
            }
        }

        message.success('Contact information updated successfully');
    };

    useEffect(() => {
        if (isGetOrgSuccess) {
            basicForm.setFieldsValue({
                name: org?.name,
                bio: org?.bio,
                description: org?.description,
            });

            const contactInfo = org.contacts.reduce((acc, contact) => {
                const fieldName = idToFieldName[contact.contact.id];
                if (fieldName) {
                    acc[fieldName] = contact.content;
                }
                return acc;
            }, {});

            contactInfoForm.setFieldsValue(contactInfo);
        }
    }, [isGetOrgSuccess, isGetOrgFetching, contactInfoForm, basicForm]);

    const tabsItems = [
        {
            key: '1',
            label: 'Basic',
            children: (
                <BasicForm
                    orgData={org}
                    form={basicForm}
                    loading={isConfigLoading || isCoverLoading || isProfileLoading}
                    onFinish={(fields) => {
                        if (fields?.profileImage) {
                            newProfilePic({ file: fields?.profileImage?.file, orgId: orgId })
                                .unwrap()
                                .then()
                                .catch((e) => message.error('Failed to update profile image'));
                        }
                        if (fields?.coverImage) {
                            newCoverPic({ file: fields?.coverImage?.file, orgId: orgId })
                                .unwrap()
                                .then()
                                .catch((e) => message.error('Failed to update cover image'));
                        }
                        configureOrg({
                            ...fields,
                            organization_id: orgId,
                            profileImage: undefined,
                            coverImage: undefined,
                        })
                            .unwrap()
                            .then()
                            .catch((e) => message.error('Failed to update organization'));
                    }}
                />
            ),
        },
        {
            key: '2',
            label: 'Address',
            children: (
                <AddressesForm
                    org={org}
                    isOrgLoading={isGetOrgLoading}
                    form={addressForm}
                    addOrgAddress={handleAddOrgAddress}
                    removeOrgAddress={handleRemoveOrgAddress}
                    loading={isAddAddressLoading || isRemoveAddressLoading}
                />
            ),
        },
        {
            key: '3',
            label: 'Contact info',
            children: (
                <ContactInfoForm
                    form={contactInfoForm}
                    onFinish={handleContactInfoFinish}
                    loading={isAddContactLoading || isRemoveContactLoading}
                />
            ),
        },
        /*   {
            key: '4',
            label: 'Members',
            children: <MembersList org={org} />,
        }, */
    ];

    return (
        <div className='grid grid-cols-10 w-full'>
            <div className='md:col-span-10 lg:col-span-8 md:col-start-2 lg:col-start-1 '>
                {/*                 <Header />
                 */}{' '}
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
