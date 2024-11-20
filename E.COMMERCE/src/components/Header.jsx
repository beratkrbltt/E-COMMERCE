
import '../css/Header.css';
import { CiShoppingBasket } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { FaRegMoon } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer } from '../redux/slices/basketSlice';
import React, { useEffect, useState } from 'react';


function Header() {


    const navigate = useNavigate();

    const [theme, setTheme] = useState(false);

    const { products } = useSelector((store) => store.basket)

    const dispatch = useDispatch();

    useEffect(() => {
        const body = document.body;
        if (theme) {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
    }, [theme]);

    const changeTheme = () => {
        setTheme(!theme);
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className='flex-row' onClick={() => navigate("/")}>
                <img className='logo' src='./src/images/K_logo.png' /> <p className='logo-text'></p>
            </div>

            <div className='flex-row'>
                <input className='search-input' type="text" placeholder='Bir şeyler ara' />
                <div>
                    {theme ? <FaRegMoon className='icon' onClick={changeTheme} /> : <CiLight className='icon' onClick={changeTheme} />}
                    <Badge onClick={() => dispatch(setDrawer())} badgeContent={products.length} color="error">
                        <CiShoppingBasket style={{ marginRight: '6px' }} className='icon' />
                    </Badge>
                </div>
            </div>
        </div>
    )
}

export default Header;