import React, { Component } from 'react'
import { Button, Menu, Header } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'


class NavBar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;

    return (
    <div>
      <Menu borderless size='small'>
        <Menu.Item
          as={NavLink}
          exact to="/myevents"
          name='My Events'
          active={activeItem === 'myevents'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink}
          exact to="/"
          name='Add an Event'
          active={activeItem === 'addevents'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position='right'>
          <Header style={{ position: 'relative', padding: '10px' }} as='h1' textAlign='center'> Sloth Wall Event Planner </Header>
          </Menu.Menu>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button primary>My Account</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      </div>
    )
  }
}

export default NavBar;