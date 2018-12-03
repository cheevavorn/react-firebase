import React from "react";
import trim from "trim";

class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  onChange = e => {
    this.setState({
      message: e.target.value
    });
  };

  onKeyUp = e => {
    if (e.keyCode === 13 && trim(e.target.value) !== "") {
      e.preventDefault();
      let dbCon = this.props.db.database().ref("/messages");

      dbCon.push({
        message: trim(e.target.value)
      });

      this.setState({
        message: ""
      });
    }
  };

  render() {
    return (
      <form>
        <textarea
          className="textarea"
          placeholder="Type a message"
          cols="100"
          value={this.state.message}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
        />
      </form>
    );
  }
}

export default MessageBox;
