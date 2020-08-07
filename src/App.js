import React from 'react';
import logo from './logo.svg';
import './App.css';
const axios = require('axios').default;

// const App = ({title}) => {
//   return (
//     <div className="header">
//       {title}
//     </div>
//   );
// }
const testData = [
  {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook", id: 123},
  {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu", id: 456},
  {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook", id: 789},
];

class App extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     profiles: testData,
  //   };
  // }

  state = {
    profiles: testData,
  };

  addNewProfile = (profileData) => {
    console.log('App', profileData);
    this.setState(prevState =>  ({
      profiles: [...prevState.profiles, profileData]
    }))
  }

  render() {
    return (
      <div className="header">
        {this.props.title}
        <Form onSubmit={this.addNewProfile}/>
        <CardList profiles = {this.state.profiles}></CardList>
      </div>
    )
  }
};

const CardList = (props) => {
    return (
      <div>
        {props.profiles.map(profile => <Card key={profile.id} {...profile} />)}
      </div>
    )
};

class Form extends React.Component {
  // userNameInput = React.createRef();
  state = { userName: ''};

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state.userName);
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    // console.log(resp.data);
    this.props.onSubmit(resp.data);
    this.setState({userName: ''});
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}> 
        <input type="text" placeholder="Github Username" value={this.state.userName}
        onChange={event => this.setState({userName: event.target.value})} required></input>
        <button>Add Card</button>
      </form>
    )
  }
}

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url}></img>
        <div className="info">
          <div className="name"> {profile.name}</div>
          <div className="company"> {profile.company}</div>
        </div>
      </div>
    )
  }
}

export default App;
