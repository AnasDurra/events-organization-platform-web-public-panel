import { Form } from 'antd';
import debounce from 'lodash.debounce';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import './EditFormPage.css';
import DroppableGroup from './components/DroppableGroup';
import PropertiesSidebar from './components/PropertiesSidebar';
import Sidebar from './components/Sidebar';
import { SidebarItemsIDs, debounceTime } from './constants';
import {
    useAddNewFieldMutation,
    useAddNewFieldOptionMutation,
    useAddNewGroupMutation,
    useAddValidationRuleMutation,
    useGetFormQuery,
    useRemoveFieldMutation,
    useRemoveFieldOptionMutation,
    useRemoveGroupMutation,
    useRemoveValidationRuleMutation,
    useUpdateFieldOptionNameMutation,
    useUpdateGroupFieldMutation,
    useUpdateGroupMutation,
} from './dynamicFormsSlice';
import { onDragEnd } from './utils-drag';

export default function EditFormPage() {
    let { form_id } = useParams();
    const { data: { result: DBform } = { result: {} }, isSuccess: isFetchFormSuccess } = useGetFormQuery(form_id);

    const [addNewGroup] = useAddNewGroupMutation();
    const [addNewField] = useAddNewFieldMutation();
    const [addNewFieldOption] = useAddNewFieldOptionMutation({ fixedCacheKey: 'shared-update-option' });
    const [addValidationRule] = useAddValidationRuleMutation({ fixedCacheKey: 'shared-update-val-rule' });

    const [updateGroup] = useUpdateGroupMutation();
    const [updateGroupField, { isError: isUpdateFormFieldError }] = useUpdateGroupFieldMutation({
        fixedCacheKey: 'shared-update-field',
    });
    const [updateFieldOption] = useUpdateFieldOptionNameMutation({ fixedCacheKey: 'shared-update-option' });

    const [removeGroup] = useRemoveGroupMutation();
    const [removeField] = useRemoveFieldMutation();
    const [removeFieldOption] = useRemoveFieldOptionMutation({ fixedCacheKey: 'shared-update-option' });
    const [removeValidationRule] = useRemoveValidationRuleMutation({ fixedCacheKey: 'shared-update-val-rule' });

    // const [groups, setGroups] = useState([]);
    const [selectedField, setSelectedField] = useState(null);
    const [AntDform] = Form.useForm();

    const handleSelectField = (field) => {
        setSelectedField((prevSelectedField) => (prevSelectedField && prevSelectedField.id == field.id ? null : field));
    };
    const handleDeselectField = (field) => {
        setSelectedField(null);
    };

    const debounceUpdateGroup = debounce(updateGroup, debounceTime);
    const handleGroupNameChange = (groupId, newName) => {
        debounceUpdateGroup({ fields: { name: newName }, group_id: groupId });
    };

    const handleDescriptionChange = (groupId, newDescription) => {
        debounceUpdateGroup({ fields: { description: newDescription }, group_id: groupId });

        // setGroups(groups.map((group) => (group.id == groupId ? { ...group, description: newDescription } : group)));
    };

    const debounceUpdateGroupField = debounce(updateGroupField, debounceTime);
    const debounceUpdateFieldOption = debounce(updateFieldOption, debounceTime);

    const handleUpdateProperties = (updatedField) => {
        if (updatedField?.validationRules?.length) {
            console.log(updatedField);
            if (updatedField.validationRules[0].delete) {
                removeValidationRule(updatedField.validationRules[0].validation_rule_id);
            } else {
                console.log(updatedField);
                addValidationRule({ field_id: updatedField.id, ...updatedField.validationRules[0] })
                    .unwrap()
                    .catch((e) => {
                        if (e?.data?.statusCode == 409) {
                            removeValidationRule(
                                selectedField?.validationRules?.find(
                                    (rule) => rule.rule == updatedField.validationRules[0].rule
                                ).id
                            )
                                .unwrap()
                                .then(() => {
                                    addValidationRule({
                                        field_id: updatedField.id,
                                        ...updatedField.validationRules[0],
                                    });
                                });
                        }
                    });
            }
        }
        const updatedFieldValues = {
            name: updatedField.name,
            label: updatedField.label,
            required: updatedField.required,
            position: updatedField.position,
        };

        let currentFieldValues;

        DBform.groups.forEach((group) => {
            const field = group.fields.find((field) => field.id == updatedField.id);

            if (field) {
                currentFieldValues = {
                    name: field.name,
                    label: field.label,
                    required: field.required,
                    position: field.position,
                };
            }
        });

        const fieldsToUpdate = {};

        Object.keys(updatedFieldValues).forEach((key) => {
            if (updatedFieldValues[key] != currentFieldValues[key] && key != 'options') {
                fieldsToUpdate[key] = updatedFieldValues[key];
            }
        });

        const hasFieldsToUpdate = Object.keys({ ...fieldsToUpdate }).length > 0;
        if (hasFieldsToUpdate) {
            debounceUpdateGroupField({ fields: { field_id: updatedField?.id, ...fieldsToUpdate } });
        }

        if (updatedField?.fieldType?.id == SidebarItemsIDs.RADIO) {
            if (updatedField.options) {
                DBform.groups.forEach((group) => {
                    const field = group.fields.find((field) => field.id == updatedField.id);

                    if (field) {
                        const updatedOptionsMap = new Map(
                            updatedField.options.map((option) => [option.id, option.name])
                        );
                        const currentOptionsMap = new Map(field.options.map((option) => [option.id, option.name]));

                        const optionsToAdd = updatedField.options.filter((option) => !currentOptionsMap.has(option.id));

                        const optionsToRemove = field.options.filter((option) => !updatedOptionsMap.has(option.id));

                        console.log('toadd: ', optionsToAdd);
                        console.log('recm: ', optionsToRemove);
                        console.log('recm: ', currentOptionsMap);
                        console.log('upda: ', updatedField);

                        optionsToAdd.forEach((option) => {
                            addNewFieldOption({
                                field_id: updatedField?.id,
                                name: option.name,
                            });
                        });

                        optionsToRemove.forEach((option) => {
                            removeFieldOption({ option_id: option.id });
                        });

                        updatedField.options.forEach((updatedOption) => {
                            const currentOptionName = currentOptionsMap.get(updatedOption.id);
                            console.log(currentOptionName);
                            if (updatedOption.name !== currentOptionName) {
                                debounceUpdateFieldOption({ option_id: updatedOption.id, name: updatedOption.name });
                            }
                        });
                    }
                });
            }
        }
    };

    const handleDeleteField = () => {
        removeField({ field_id: selectedField.id, form_id }).then(() => setSelectedField(null));
    };

    const handleDeleteGroup = (groupId) => {
        removeGroup({ group_id: groupId, form_id });
    };

    useEffect(() => {
        if (!DBform || !selectedField) return;

        const newSelectedField = DBform.groups
            ?.flatMap((group) => group.fields)
            .find((field) => field.id == selectedField?.id);

        setSelectedField(newSelectedField);
    }, [DBform, selectedField, isUpdateFormFieldError]);

    useEffect(() => {
        if (isFetchFormSuccess && DBform?.groups?.length == 0) {
            addNewGroup({
                name: 'default group1',
                description: 'default description',
                position: 1,
                fields: [],
                form_id,
            });
        }
    }, [DBform?.groups?.length, addNewGroup, form_id, isFetchFormSuccess]);

    useEffect(() => {
        AntDform.setFieldsValue(DBform);
    }, [AntDform, DBform]);

    return (
        <DragDropContext
            onDragEnd={(result) => {
                onDragEnd({
                    result,
                    currentGroups: DBform?.groups,
                    form_id,
                    addNewField,
                    addNewGroup,
                    updateGroup,
                    updateGroupField,
                });
            }}
        >
            <Form
                form={AntDform}
                onFinish={() => {}}
                labelCol={{
                    md: { span: 10 },
                    lg: { span: 4 },
                }}
                wrapperCol={{
                    md: { span: 14 },
                    lg: { span: 10 },
                }}
                labelAlign='left'
            >
                <div className='grid grid-cols-6 gap-2 mx-auto h-[92vh]'>
                    <div className='custom-scrollbar col-start-2 col-span-3 my-2  p-2 w-full bg-slate-400 bg-transparent overflow-y-auto'>
                        <Droppable
                            droppableId={'base-form'}
                            type='group'
                        >
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {DBform?.groups &&
                                        DBform?.groups.map((group, index) => (
                                            <Draggable
                                                key={'draggable' + group.id}
                                                draggableId={group.id}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{ ...provided.draggableProps.style }}
                                                        ref={provided.innerRef}
                                                    >
                                                        <DroppableGroup
                                                            key={group.id}
                                                            group={group}
                                                            groupIndex={index}
                                                            selectedField={selectedField}
                                                            onSelectField={handleSelectField}
                                                            onNameChange={handleGroupNameChange}
                                                            onDescriptionChange={handleDescriptionChange}
                                                            onDelete={handleDeleteGroup}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                    <div className='col-start-6 col-span-1 sticky top-0 bg-gray-50 '>
                        {selectedField ? (
                            <PropertiesSidebar
                                field={selectedField}
                                onUpdateProperties={handleUpdateProperties}
                                onDeleteField={handleDeleteField}
                                onClose={handleDeselectField}
                            />
                        ) : (
                            <Sidebar />
                        )}
                    </div>
                </div>
            </Form>
        </DragDropContext>
    );
}
