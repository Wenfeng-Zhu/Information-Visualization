import React from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
        title: 'Home',
        path:'/',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title: 'Policies',
        path:'/policies',
        icon: <IoIcons.IoIosPaper/>,
        cName: 'nav-text'
    },
    {
        title: 'Population',
        path:'/population',
        icon: <IoIcons.IoMdPeople/>,
        cName: 'nav-text'
    },
    {
        title: 'Economy',
        path:'/economy',
        icon: <AiIcons.AiFillMoneyCollect/>,
        cName: 'nav-text'
    },
    {
        title: 'About us',
        path:'/information',
        icon: <FaIcons.FaInfo/>,
        cName: 'nav-text'
    },
]