import React, { useState } from 'react';
import hamburgerButton from '../../images/Hamburger_icon.png'
import calenderIcon from '../../images/calendar.png'
import homeIcon from '../../images/home.png'
import messagesIcon from '../../images/message.png'
import performanceIcon from '../../images/speedometer.png'
import clipbaordIcon from '../../images/clipboard.png'
import settingsIcon from '../../images/setting.png'
import profileIcon from '../../images/profile.png'
// import logo from '../../images/WorkplaceWise_logo.png'
import { NavLink } from 'react-router-dom';
import './Header.css'

const Sidebar = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/",
            name: "Home",
            icon: homeIcon
        },
        {
            path: "/discussions/",
            name: "Messages",
            icon: messagesIcon
        },
        {
            path: "/tasks/",
            name: "Tasks",
            icon: clipbaordIcon
        },
        {
            path: "/calendar/",
            name: "Calendar",
            icon: calenderIcon
        },
        {
            path: "/perfomance/",
            name: "Performance",
            icon: performanceIcon
        },
        {
            path: "/settings/",  // no settings path yet, so make sure to change this if it ends up being different
            name: "Settings",
            icon: settingsIcon
        },
        {
            path: "/profile/",
            name: "Profile",
            icon: profileIcon
        }
    ];

    return (
        <div className="container">
            <div style={{ width: isOpen ? "200px" : "50px", background: isOpen ? "#61677A" : "none"}} className="sidebar">
                <div className="top_section" style={{ background: isOpen ? "#61677A" : "none" }}>
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Menu</h1>
                    <div style={{ marginLeft: isOpen ? "40px" : "0px" }} className="bars">
                        <img src={hamburgerButton} onClick={toggle} width={30} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeclassname="active" style={{ display: isOpen ? "flex" : "none" }}>
                            <div className="icon"> <img src={item.icon} width={30} /> </div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
