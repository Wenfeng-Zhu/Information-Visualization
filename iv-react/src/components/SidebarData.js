import React from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
        title: 'Home',
        path:'/~zhuw',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title: 'Policies',
        path:'/~zhuw/policies',
        icon: <IoIcons.IoIosPaper/>,
        cName: 'nav-text'
    },
    {
        title: 'Population',
        path:'/~zhuw/population',
        icon: <IoIcons.IoMdPeople/>,
        cName: 'nav-text'
    },
    {
        title: 'Economy',
        path:'/~zhuw/economy',
        icon: <AiIcons.AiFillMoneyCollect/>,
        cName: 'nav-text'
    },
    {
        title: 'About us',
        path:'/~zhuw/information',
        icon: <FaIcons.FaInfo/>,
        cName: 'nav-text'
    },
]