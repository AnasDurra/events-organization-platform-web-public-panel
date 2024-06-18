import { Divider, Modal, Segmented } from 'antd';
import React, { useState } from 'react';
import { useGetBadgesQuery } from '../../gamification/gamificationSlice';

export default function BadgesModal({ isOpen, myBadges, onClose }) {
    const [tab, setTab] = useState('myBadges');

    const { data: { result: allBadges } = { result: [] } } = useGetBadgesQuery();

    return (
        <Modal
            open={isOpen}
            footer={null}
            onClose={onClose}
            closable
            onCancel={onClose}
        >
            <div
                className='h-[60svh] overflow-auto px-4'
                style={{ scrollbarWidth: 'thin' }}
            >
                <div className='flex justify-center items-center'>
                    <Segmented
                        defaultValue='myBadges'
                        className='mb-8'
                        onChange={(value) => setTab(value)}
                        options={[
                            {
                                label: 'My Collected Badges',
                                value: 'myBadges',
                            },
                            {
                                label: 'Not Collected Yet',
                                value: 'notCollected',
                            },
                        ]}
                    />
                </div>
                {tab == 'myBadges' && (
                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-8'>
                        {myBadges.map((badge) => (
                            <div
                                key={'modal' + badge.badge_id}
                                className='flex flex-col justify-center items-center border-x-4 border-x-secondary  p-1 '
                            >
                                <img
                                    src={`data:image/svg+xml;utf8,${encodeURIComponent(badge?.badge_shape?.svg)}`}
                                    className='w-[9em]'
                                />

                                <div className='text-lg font-bold bg-gradient-to-r from-[#fbaf51] via-[#ce355f] to-[#a986af] inline-block text-transparent bg-clip-text'>
                                    {badge?.reward_name}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {tab == 'notCollected' && (
                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-8'>
                        {allBadges
                            .filter(
                                (badge) => !myBadges.some((myBadge) => myBadge.badge_id == badge.id) && !badge.anonymous
                            )
                            .map((badge) => (
                                <div
                                    key={'modal' + badge.id}
                                    className='flex flex-col justify-between items-center border-t-8 border-t-primary border-b-secondary   p-1 '
                                >
                                    <div className='mt-4 text-center'>
                                        <div className='text-lg font-bold bg-gradient-to-r mt-[-0.5em] from-[#fbaf51] via-[#ce355f] to-[#a986af] inline-block text-transparent bg-clip-text'>
                                            {badge?.reward?.name}
                                        </div>
                                        
                                        <img
                                            src={`data:image/svg+xml;utf8,${encodeURIComponent(badge?.shape?.svg)}`}
                                            className='w-[9em] h-[9em]'
                                        />
                                    </div>

                                    <div
                                        className={`flex flex-col ${'mt-[-0.5em]'}  w-full justify-start h-full items-center`}
                                    >
                                        <Divider
                                            plain
                                            className='text-primary'
                                        >
                                            Rules
                                        </Divider>
                                        <div className='text-pretty text-left text-gray-500'>
                                            {badge?.reward?.rule?.conditions ? (
                                                <div>
                                                    {badge?.reward?.rule?.conditions.map((condition, condIndex) => (
                                                        <>
                                                            <span
                                                                key={condIndex}
                                                                className='text-sm'
                                                            >
                                                                {`${condIndex + 1}. ${condition.definedData.name} ${
                                                                    condition.operator.name
                                                                } ${condition.value}`}
                                                            </span>
                                                            <br></br>
                                                        </>
                                                    ))}
                                                </div>
                                            ) : (
                                                'No rules'
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </Modal>
    );
}
