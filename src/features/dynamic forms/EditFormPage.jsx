import { Form } from 'antd';
import debounce from 'lodash.debounce';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import './EditFormPage.css';
import DroppableGroup from './components/DroppableGroup';
import PropertiesSidebar from './components/PropertiesSidebar';
import Sidebar from './components/Sidebar';
import {
    useAddNewFieldMutation,
    useAddNewGroupMutation,
    useGetFormQuery,
    useRemoveGroupMutation,
    useUpdateGroupMutation,
} from './dynamicFormsSlice';
import { onDragEnd } from './utils-drag';

export default function EditFormPage() {
    let { form_id } = useParams();
    const { data: { result: DBform } = { result: {} }, isSuccess: isFetchFormSuccess } = useGetFormQuery(form_id);
    const [addNewGroup] = useAddNewGroupMutation();
    const [addNewField] = useAddNewFieldMutation();
    const [updateGroup] = useUpdateGroupMutation();
    const [removeGroup] = useRemoveGroupMutation();
    // const [groups, setGroups] = useState([]);
    const [selectedField, setSelectedField] = useState(null);
    const [AntDform] = Form.useForm();

    const handleSelectField = (field) => {
        setSelectedField((prevSelectedField) =>
            prevSelectedField && prevSelectedField.id === field.id ? null : field
        );
    };

    const debounceUpdateGroup = debounce(updateGroup, 500);
    const handleGroupNameChange = (groupId, newName) => {
        debounceUpdateGroup({ fields: { name: newName }, group_id: groupId });
    };

    const handleDescriptionChange = (groupId, newDescription) => {
        // setGroups(groups.map((group) => (group.id === groupId ? { ...group, description: newDescription } : group)));
    };

    const handleUpdateProperties = (updatedField) => {
        /*  setGroups((groups) =>
            groups.map((group) => ({
                ...group,
                fields: group.fields.map((field) => {
                    if (field.id === selectedField.id) {
                        return updatedField;
                    }
                    return field;
                }),
            }))
        ); */

        setSelectedField(updatedField);
    };

    const handleDeleteField = () => {
        /* setGroups((groups) =>
            groups.map((group) => ({
                ...group,
                fields: group.fields.filter((field) => field.id !== selectedField.id),
            }))
        ); */

        setSelectedField(null);
    };

    const handleDeleteGroup = (groupId) => {
        removeGroup({ group_id: groupId });
    };

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
                onDragEnd({ result, currentGroups: DBform?.groups, addNewField });
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
                <div className='grid grid-cols-6 gap-2 mx-auto'>
                    <div className='custom-scrollbar col-start-2 col-span-3 h-[90vh] my-2  p-2 w-full bg-slate-400 bg-transparent overflow-y-auto'>
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
                    <div className='col-start-6 col-span-1 sticky top-0 bg-gray-50'>
                        {selectedField ? (
                            <PropertiesSidebar
                                field={selectedField}
                                onUpdateProperties={handleUpdateProperties}
                                onDeleteField={handleDeleteField}
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
