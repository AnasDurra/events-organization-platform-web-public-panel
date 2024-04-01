import React from 'react';
import { Outlet } from 'react-router-dom';
import { FaWpforms } from 'react-icons/fa';
import { Col, Input, Menu, Row } from 'antd';
import { FaFileAlt } from 'react-icons/fa';
import './FormLayout.css';
export default function FormLayout() {
  return (
    <div className='flex flex-col  h-screen bg-gray-100  '>
      <header className='sticky top-0 z-10 my-2'>
        <Row
          align={'middle'}
          justify={'space-between'}
        >
          <Col span={4}>
            <Row>
              <Col>
                <FaFileAlt className='text-xl mx-2'></FaFileAlt>
              </Col>
              <Col>
                <Input placeholder='Form name'></Input>
              </Col>
            </Row>
          </Col>

          <Col span={16}>
            <ul className='flex space-x-4'>
              <li
                onClick={() => {
                  console.log('submissions');
                }}
                className='cursor-pointer hover:text-blue-500'
              >
                Submissions
              </li>
              <li
                onClick={() => {
                  console.log('settings');
                }}
                className='cursor-pointer hover:text-blue-500'
              >
                Settings
              </li>
            </ul>
          </Col>
          <Col className='mr-5'>
            currently assigned to
            <a className='text-sky-600'> @event</a>
          </Col>
        </Row>
      </header>
      <main className='border flex-1 paper'>
        <Outlet />
      </main>
    </div>
  );
}
