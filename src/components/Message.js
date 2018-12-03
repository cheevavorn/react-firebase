import React, { Component } from "react";

var delete_style = {
  float: "right"
};

const Modal = ({
  children,
  updateFunction,
  closeModal,
  isShowModal,
  title
}) => {
  let showModalClass = isShowModal ? "is-active" : "";
  return (
    <div className={`modal ${showModalClass}`}>
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" onClick={closeModal} />
        </header>
        <section className="modal-card-body">
          <div className="content">{children}</div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={updateFunction}>
            Save changes
          </button>
          <button className="button" onClick={closeModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      messageUpdate: props.message
    };
  }

  onClickDelete(e) {
    e.preventDefault();
    let dbCon = this.props.db.database().ref("messages");
    dbCon.child(this.props.msgKey).remove();
  }

  onChange(e) {
    this.setState({
      messageUpdate: e.target.value
    });
  }

  toggleModal() {
    this.setState(prevState => {
      let toggleIsShowModal = !prevState.isShowModal;
      return {
        isShowModal: toggleIsShowModal
      };
    });
  }

  updateFunction(e) {
    e.preventDefault();
    let msgObj = { message: this.state.messageUpdate };
    let dbCon = this.props.db.database().ref("/messages");
    dbCon
      .child(this.props.msgKey)
      .update(msgObj)
      .then(() => this.toggleModal());
  }

  render() {
    return (
      <div>
        {this.props.message}
        <a
          style={delete_style}
          className="button is-danger"
          onClick={e => this.onClickDelete(e)}
        >
          Delete
        </a>

        <a
          style={delete_style}
          className="button is-info"
          onClick={() => this.toggleModal()}
        >
          Update
        </a>
        <Modal
          updateFunction={e => this.updateFunction(e)}
          closeModal={() => this.toggleModal()}
          isShowModal={this.state.isShowModal}
          title={"Edit message"}
        >
          <textarea
            className="textarea"
            placeholder="comment"
            cols="100"
            onChange={e => this.onChange(e)}
            value={this.state.messageUpdate}
          />
        </Modal>
      </div>
    );
  }
}

export default Message;
