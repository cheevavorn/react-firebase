import React, { Component } from "react";

// import message component for render
import Message from "./Message";

// third libs
import _ from "lodash";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    let app = this.props.db.database().ref("messages");
    app.on("value", snapshot => {
      this.getData(snapshot.val());
    });
  }

  getData(values) {
    let messagesVal = values;
    let messages = _(messagesVal)
      .keys()
      .map(messageKey => {
        let cloned = _.clone(messagesVal[messageKey]);
        cloned.key = messageKey;
        return cloned;
      })
      .value();
    this.setState({
      messages
    });
  }

  render() {
    let messageNode = this.state.messages.map(message => {
      return (
        <div key={message.key} className="card">
          <div className="card-content">
            <Message
              msgKey={message.key}
              message={message.message}
              db={this.props.db}
            />
          </div>
        </div>
      );
    });

    return <div>{messageNode}</div>;
  }
}

export default MessageList;
