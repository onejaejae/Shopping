/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { Icon, Badge } from 'antd';


function RightMenu(props) {
  const user = useSelector(state => state.user)
 
  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  // 빈객체의 없는 프로퍼티에 접근하면 undefined가 된다
  // 그러나 빈객체의 없는 프로퍼티에 프로퍼티로 접근하면 에러가 발생한다
  // user가 빈 객체일 시점에서 user.userData는 undefined가 되므로 undefined는 false이다
  // && 연산자는 왼쪽부터 검사하고 왼쪽이 false일 경우 조건 식을 살피지 않으므로 !user.userData.isAuth가 에러를 발생하지 않는다
  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
         <Menu.Item key="history">
          <Link to={`/user/history`}>History</Link>
        </Menu.Item>
        <Menu.Item key="upload">
          <Link to={"/product/upload"}>Upload</Link>
        </Menu.Item>
        <Menu.Item key="shoppingCart">
          {user.userData && 
            <Link to={'/user/cart'}>
              <Badge count={user.userData.cart.length}>
                  <Icon type="shopping-cart" style={{ fontSize : 30, marginBottom : 3}}/>
              </Badge>
            </Link>
          }
        
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

