import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/css/components/Sidebar.css';

const Sidebar = () => {
    return (
        <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
            activeKey="/home">
            <div className="sidebar-sticky"></div>
            <Nav.Item>
                <Nav.Link as={Link} to="/master-barang">Master Barang</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/transaction">Transaction</Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

export default Sidebar;
