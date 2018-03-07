import React from 'react';
import {NavLink} from 'react-router-dom';

const sidebar = () => (
    <nav className="appNav">
        <div className="appNav__wrap">
            <NavLink to="/" exact className="appNav__item">
                <i className="icon-calendar-check-o"></i>
                <span className="appNav__title">Today</span>
            </NavLink>
            <NavLink to="/all" className="appNav__item">
                <i className="icon-list-alt"></i>
                <span className="appNav__title">All</span>
            </NavLink>
            <NavLink to="/add" className="appNav__item">
                <i className="icon-plus"></i>
                <span className="appNav__title">Add</span>
            </NavLink>
        </div>
    </nav>
);

export default sidebar;