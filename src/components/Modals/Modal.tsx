import React from "react";
// reactstrap components
import {
  Button,
  Modal,
} from "reactstrap";

class Modals extends React.Component<any,any> {
  render() {
    return (
      <>
        <Modal
          className="modal-dialog-centered pte-magic-modal"
          isOpen={this.props.open}
          // toggle={() => this.toggleModal("notificationModal")}
        >
          <div className="p-3">
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={this.props.onClose}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          {this.props.children}
        </Modal>
      </>
    );
  }
}

export default Modals;