import React, { Component } from "react";

// component import
import Header from "./components/Header";
import MessageList from "./components/MessageList";
import MessageBox from "./components/MessageBox";

// firebase import
import firebase from "firebase";

class App extends Component {
  constructor(props) {
    super(props);
    var config = {
      apiKey: "AIzaSyBaXcy2aMNU_ZOk2s2DmQrSBDDrAl0WC0E",
      authDomain: "react-firebase-886eb.firebaseapp.com",
      databaseURL: "https://react-firebase-886eb.firebaseio.com",
      projectId: "react-firebase-886eb",
      storageBucket: "react-firebase-886eb.appspot.com",
      messagingSenderId: "875606545477"
    };
    firebase.initializeApp(config);
  }

  render() {
    let title = "Simple Firebase App";
    return (
      <div className="container">
        <Header title={title} />
        <div className="columns">
          <div className="column is-3" />
          <div className="column is-6">
            <MessageList db={firebase} />
          </div>
        </div>
        <div className="columns">
          <div className="column is-3" />
          <div className="column is-6">
            <MessageBox db={firebase} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
