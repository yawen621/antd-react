import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Avatar, Badge } from 'antd';
import { adminRouter } from '../../routes'
// 高阶组件中的withRouter，作用就是将一个组件包裹进Route里面，然后react-router的三个对象history，location，math就会被放进这个组件的props属性中
// 用Navlink的方法也可以
import { withRouter, NavLink } from 'react-router-dom'
import './frame.less'
import logo from './logo.png'
import { DownOutlined } from '@ant-design/icons'
import {connect} from 'react-redux'
import {getNotificationsList} from '../../actions/notifications'
// const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const mapState=state=>{
  // console.log(state)
  return{
    notificationsCount:state.notfications.list.filter(item=>item.hasRead===false).length
  }
}
@connect(mapState,{getNotificationsList})
@withRouter
class Frame extends Component {
  componentDidMount(){
    this.props.getNotificationsList()
  }
  // onMenuClick = ({ key }) => {
  //   // console.log(key)
  //   this.props.history.push(key)
  // }
  onDropDownMenuClick=({key})=>{
    console.log(key)
    this.props.history.push(key)
  }
  renderDropdown=()=> (
    <Menu onClick={this.onDropDownMenuClick}>
      <Menu.Item
      key="/admin/notifications">
        <Badge dot={Boolean(this.props.notificationsCount)}>
          通知中心
          </Badge>
      </Menu.Item>
      <Menu.Item
      key="/admin/settings"
      >
        个人设置
      </Menu.Item>
      <Menu.Item
      key="/login"
      >
        退出登录
      </Menu.Item>
    </Menu>
  );

  render() {
    //设置跳转后刷新侧边栏不高亮 
    const selectedKeyArr = this.props.location.pathname.split('/')
    selectedKeyArr.length = 3

    const menus = adminRouter.filter(route => route.isNav === true)
    return (
      <Layout style={{ minHeight: '100%' }}>
        <Header className="header qf-header" style={{ background: '#fff' }}>
          <div className="qf-logo">
            <img src={logo} alt="QFADMIN" />
          </div>
          <div>
            <Dropdown overlay={this.renderDropdown()}>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3934180438,3804911389&fm=26&gp=0.jpg" /> <span>欢迎您!路飞</span>
                <Badge count={this.props.notificationsCount} offset={[-10, -10]}>
                  <DownOutlined />
                </Badge>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={[selectedKeyArr.join('/')]}
              onClick={this.onMenuClick}
              style={{ height: '100%', borderRight: 0 }}
            >
              {
                menus.map(item => {
                  return (
                    <Menu.Item key={item.pathname}>
                      <NavLink to={item.pathname}>
                        <item.icon />
                        {item.title}
                      </NavLink>
                    </Menu.Item>
                  )
                })
              }
            </Menu>
          </Sider>
          <Layout style={{ padding: '16px' }}>
            <Content
              className="site-layout-background"
              style={{
                margin: 0,
                background: '#fff',
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default Frame