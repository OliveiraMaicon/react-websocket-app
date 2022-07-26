import React, { Component } from 'react';


interface Profile {
  id: string;
  email: string;
}

interface Person {
    id: string;
    name: string;
}

interface ProfileListProps {
  auth: string;
}

interface ProfileListState {
  profiles: Array<Profile>;
  persons: Array<Person>;
  isLoading: boolean;
}

class ProfileList extends Component<ProfileListProps, ProfileListState> {

  constructor(props: ProfileListProps) {
    super(props);

    this.state = {
      profiles: [],
      persons: [],
      isLoading: false
    };
  }

  async componentDidMount() {
    this.setState({isLoading: true});
   

    const response = await fetch('http://localhost:8080/profiles'); // <2>
    const data = await response.json();
    this.setState({profiles: data, isLoading: false});

    const socket = new WebSocket('ws://localhost:8080/ws/profiles');
    
    socket.addEventListener('message', async (event: any) => {
      const message = JSON.parse(event.data);
      console.log("evento msg")
      console.log("evento msg", message)
      const request = await fetch(`http://localhost:8080/profiles/${message.id}`); // <3>
      const profile = await request.json();
      this.state.profiles.push(profile);
      this.setState({profiles: this.state.profiles});
    });


    const personResponse = await fetch('http://localhost:8080/persons'); // <2>
    const personData = await personResponse.json();
    console.log(personData)
    this.setState({persons: personData, isLoading: false});

    const personSocket = new WebSocket('ws://localhost:8080/ws/persons');
    
    personSocket.addEventListener('message', async (event: any) => {
      const message = JSON.parse(event.data);
      console.log("evento msg", message)
      const request = await fetch(`http://localhost:8080/persons/${message.id}`); // <3>
      const person = await request.json();
      this.state.persons.push(person);
      this.setState({persons: this.state.persons});
    });
  }

  render() {
    const {profiles, persons, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <>
        <h2>Profile List</h2>
        {profiles.map((profile: Profile) =>
          <div key={profile.id}>
            {profile.email}<br/>
          </div>
        )}
         <h2>Person List</h2>
        {persons.map((person: Person) =>
          <div key={person.id}>
            {person.name}<br/>
          </div>
        )}
      </>
      
    );
  }
}

export default ProfileList;
