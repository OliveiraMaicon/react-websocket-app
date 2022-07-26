import React, { Component } from 'react';
import logo from './logo.svg';
import ProfileList from './ProfileList'

interface HomeProps {
    message: string;
}

interface HomeState {
    valid: boolean;
  }
  
export default class Home extends Component<HomeProps, HomeState> {

    constructor(props: HomeProps) {
        super(props);
      }

      render() {
       
        let body = null;
          body = (
            <div className="Buttons">
              <ProfileList auth={'asdad'}/>
            </div>
          );
    
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo"/>
              <h1 className="App-title">Welcome to React</h1>
              {body}
            </header>
          </div>
        );
      }
}
