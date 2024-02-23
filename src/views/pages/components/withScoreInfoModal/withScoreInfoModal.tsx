import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import {
  Button,
  Modal,
  Input,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Card,
  CardBody,
  Label
} from "reactstrap";
import { AvForm, AvField, AvInput } from 'availity-reactstrap-validation';
import SiteForm from '../SiteForm';
import { toast } from 'react-toastify';
import { QUESTION_TYPE_FULL, QUESTION_TYPE } from 'src/config/constants';

export default function withScoreInfoModal(...params) {
  // do something with params
  return function HOCFactory<T>(WrappedComponent: any): any {
    let hocClass = class HOC<T> extends React.Component<any, any> {
      form;

      constructor(props) {
        super(props);
        this.form = React.createRef();
      }

      state = {
        selectedData: null,
        defaultModal: null,
      };

      openModal = async (row) => {
        // Init state
        this.setState({
            selectedData: null,
            defaultModal: null,
        });

        this.setState({ selectedData: row });
        this.toggleModal("defaultModal");
      }

      closeModal = () => {
        this.toggleModal("defaultModal");
      }
    
      toggleModal = state => {
        this.setState({
          [state]: !this.state[state]
        });
      };


      render() {
        const { selectedData } = this.state;
        return (
          <>
            <WrappedComponent {...this.props} closeModal={this.closeModal} openModal={this.openModal} />
            <Modal backdrop="static"
              size="lg"
              className="modal-dialog-centered"
              isOpen={this.state.defaultModal}
              toggle={() => this.props.toggleModal("defaultModal")}
            >
            <div className="modal-header">
                <div className="grid-icon size-30 icon-info icon-modal-benit ml-3 mt--1"></div>
                <h6 className="modal-title" id="modal-title-default">
                  <div>Score information</div>
                </h6>
                <button aria-label="Close" className="close" data-dismiss="modal"
                  type="button"
                  onClick={() => this.closeModal()}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              
              <div className="modal-body">
                { selectedData &&
                  <>
                    <div className="mb-2">
                      <span className="">
                        { QUESTION_TYPE_FULL[selectedData.param2].name }
                      </span>
                      <span className="ml-2 badge badge-question-type-speaking">
                        { QUESTION_TYPE_FULL[selectedData.param2].code }
                      </span>
                    </div>    
                    <div>
                      <table className="table table-flush dataTable">
                        <thead className="thead-light">
                          <tr role="row">
                            <th colSpan={2}>Score detail</th>
                          </tr>
                        </thead>
                        <tbody>
                        { (selectedData.param2 === QUESTION_TYPE.SPEAKING_READ_ALOUD 
                          || selectedData.param2 === QUESTION_TYPE.SPEAKING_REPEAT_SENTENCE
                          || selectedData.param2 === QUESTION_TYPE.SPEAKING_DESCRIBE_IMAGE
                          || selectedData.param2 === QUESTION_TYPE.SPEAKING_RETELL_LECTURE
                          || selectedData.param2 === QUESTION_TYPE.SPEAKING_ANSWER_SHORT_QUESTION ) &&
                            <>
                              <tr role="row" className="odd">
                                <td className="sorting_1">Content</td>
                                <td>{ selectedData.param5 }</td>
                              </tr>
                              <tr role="row" className="odd">
                                <td className="sorting_1">Pronunciation</td>
                                <td>{ selectedData.param6 }</td>
                              </tr>
                              <tr role="row" className="odd">
                                <td className="sorting_1">Fluency</td>
                                <td>{ selectedData.param7 }</td>
                              </tr>
                            </>
                          }
                          { (selectedData.param2 === QUESTION_TYPE.WRITING_SUMMARIZE_WRITTEN_TEXT) &&
                            <>
                              <tr role="row" className="odd">
                                <td className="sorting_1">Content</td>
                                <td>{ selectedData.param5 }</td>
                              </tr>
                              <tr role="row" className="odd">
                                <td className="sorting_1">Form</td>
                                <td>{ selectedData.param6 }</td>
                              </tr>
                              <tr role="row" className="odd">
                                <td className="sorting_1">Grammar</td>
                                <td>{ selectedData.param8 }</td>
                              </tr>
                              <tr role="row" className="odd">
                                <td className="sorting_1">Vocabulary</td>
                                <td>{ selectedData.param11 }</td>
                              </tr>
                            </>
                          }
                          { (selectedData.param2 === QUESTION_TYPE.WRITING_ESSAY) &&
                            <>
                              <tr role="row" className="odd">
                                <td className="sorting_1">Content</td>
                                <td>{ selectedData.param5 }</td>
                              </tr>
                              <tr role="row" className="odd">
                                <td className="sorting_1">Form</td>
                                <td>{ selectedData.param6 }</td>
                              </tr>
                              <tr role="row" className="odd">
                                <td className="sorting_1">Structure</td>
                                <td>{ selectedData.param7 }</td>
                              </tr>
                              <tr role="row" className="odd">
                                <td className="sorting_1">Grammar</td>
                                <td>{ selectedData.param8 }</td>
                              </tr>
                              <tr role="row" className="odd">
                                <td className="sorting_1">General</td>
                                <td>{ selectedData.param10 }</td>
                              </tr>
                              <tr role="row" className="odd">
                                <td className="sorting_1">Vocabulary</td>
                                <td>{ selectedData.param11 }</td>
                              </tr>
                              <tr role="row" className="odd">
                                <td className="sorting_1">Spelling</td>
                                <td>{ selectedData.param12 }</td>
                              </tr>
                            </>
                          }
                        </tbody>
                      </table>
                    </div>
                    <div>{ selectedData.totalQuestion }</div>
                    <div><span className="label-benit-sm btn-benit-yellow"><strong>Total</strong>: { parseFloat(selectedData.param8).toFixed(1)}</span></div>

                    <div className="mt-2">
                    { selectedData.param3 && 
                        <>
                            <audio controls controlsList="nodownload" id={ `player-${selectedData.id}` } src= { selectedData.param3 }></audio>
                        </>
                    }
                    </div>
                  </>
                }
              </div>
              <div className="modal-footer">
                <Button
                  data-dismiss="modal"
                  className="btn-benit-sm btn-benit-yellow"
                  type="button"
                  onClick={() => this.closeModal()}
                >
                  <span className="btn-inner--text">Close</span>
                </Button>
              </div>
          </Modal>
          </>
        );
      }
    };

    return hocClass;
  };
}
