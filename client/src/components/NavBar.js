import React, { Component } from 'react'
import { Button, Menu, Header } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'


class NavBar extends Component {
  constructor(props){
    super(props);
    this.state = { activeItem: 'home', isLoggedIn: false, user: null };
    this.logOut = this.logOut.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentDidMount(){
    fetch('/api/currentuser')
        .then(res => res.json())
        .then(user => {
          if(user!==null) {
            this.setState({user: user, isLoggedIn: true})
          }
        })
        .catch( error => console.log(error));
  }

  logOut(){
    fetch('/api/logout')
        .then(res=>res.json())
        .then((res)=>{
          if(res){
            this.setState({isLoggedIn: false, user: null});
          }
        })
        .catch(error=>console.log(error));
  }

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
            {
              this.state.isLoggedIn ?
                  <Button primary
                          onClick={this.logOut}>
                    Log Out
                  </Button>
                  :
                  <div>
                    <Button primary
                            as={NavLink}
                            exact to="/signup"
                            name="Sign Up"
                            active={activeItem === 'signup'}
                            onClick={this.handleItemClick}
                    >
                      Sign Up
                    </Button>
                    <Button primary
                      as={NavLink}
                      exact to="/login"
                      name="Log In"
                      active={activeItem === 'login'}
                      onClick={this.handleItemClick}
                    >
                      Log In
                    </Button>
                  </div>
            }
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      </div>
    )
  }
}

export default NavBar;