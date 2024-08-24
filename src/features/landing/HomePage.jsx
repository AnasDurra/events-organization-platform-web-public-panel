import { FacebookFilled, LinkedinFilled, XOutlined } from '@ant-design/icons';
import { Button, theme } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';
import HappeningNowSection from './components/HappeningNowSection';
import OrganizersSection from './components/OrganizersSection';
import CategoryCard from './components/cards/CategoryCard';
import EventCardWithImage from './components/cards/EventCardWithImage';
import styles from './paper.module.css';
import WebFooter from './components/WebFooter';
import MainCarousel from './components/cards/MainCarousel';
import CategoriesSection from './components/CategoriesSection';
import SoonToHappenSection from './components/SoonToHappenSection';
export default function HomePage() {
    return (
        <div className='flex flex-col items-center justify-start w-full'>
            <MainCarousel />
            abdo

            <CategoriesSection />

            <OrganizersSection />

            <HappeningNowSection />

            <SoonToHappenSection />

            <WebFooter />
        </div>
    );
}
