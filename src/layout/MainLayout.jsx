import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

const MainLayout = () => {
    return (
        <div className='w-11/12 mx-auto min-h-screen flex flex-col'>
            <Navbar/>
           <main className={'grow'}>
             <Outlet ></Outlet>
           </main>
            <Footer/>
        </div>
    );
};

export default MainLayout;