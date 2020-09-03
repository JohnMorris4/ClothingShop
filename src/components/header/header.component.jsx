import React from "react";
import {connect} from 'react-redux'
import './header.styles.scss';

import {HeaderContainer,
    LogoContainer,
    OptionsContainer,
    OptionLink} from './header.styles';
import {createStructuredSelector} from "reselect";
import {selectCartHidden} from "../../redux/cart/cart.selectors";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import { ReactComponent as Logo } from '../../assets/crown.svg';
import {auth} from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

const Header = ({currentUser, hidden}) => (
    <HeaderContainer>
        <LogoContainer  to='/'>
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>SHOP</OptionLink>
            <OptionLink to='/contact'>CONTACT</OptionLink>
            {
                currentUser ?
                    <OptionLink as='div' onClick={()=>auth.signOut()}>Sign Out</OptionLink>
                    :
                    <OptionLink to='/signin'>Sign In</OptionLink>
            }
            <CartIcon />
        </OptionsContainer>

        {
            hidden ? null :
            <CartDropdown />
        }

    </HeaderContainer>
)
const mapStateToPropes = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})


export default connect(mapStateToPropes)(Header);
