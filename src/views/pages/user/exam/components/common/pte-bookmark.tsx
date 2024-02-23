import axios from 'axios';
import React, { Component } from "react";
import {
    UncontrolledTooltip
  } from "reactstrap";
import './pte-bookmark.scss'; 

class PteBookmark extends Component<any, any> {

    state = {
      bookmark: false
    };

    constructor(props) {
      super(props);
    }

    async componentDidMount() {
      let res = await axios.get(`/api/bookmark/check/${this.props.question.id}`);
      if (res.data) {
        this.setState({ bookmark: true });
      } else {
        this.setState({ bookmark: false });
      }
    }

    async componentWillReceiveProps(nextProps) {
      // console.log(nextProps)
      // console.log(this.props.question.id)
      if (this.props.question.id != nextProps.question.id) {
        console.log(`componentWillReceiveProps pte bookmark`)
        let res = await axios.get(`/api/bookmark/check/${nextProps.question.id}`);
        if (res.data) {
          this.setState({ bookmark: true });
        } else {
          this.setState({ bookmark: false });
        }
      }
    }

    onChangeBookmark = async () => {
      if (this.state.bookmark) {
        // Add
        await axios.delete(`/api/bookmark/${this.props.question.id}`);
        this.setState({ bookmark: false });
      } else {
        // Remove
        let link = `/platform/exam/question_bank?page=${this.props.page}&index=${this.props.index}&total=${this.props.total}&type=${this.props.question.type}${ this.props.repeated ? '&repeated=true' : '' }`;
        let param = {
            questionId: this.props.question.id,
            questionType: this.props.question.type,
            index: this.props.index,
            page: this.props.page,
            total: this.props.total,
            link
        }
        await axios.post(`/api/bookmark/add`, param);
        this.setState({ bookmark: true });
      }
    }

    render() {
        const { bookmark } = this.state;
        return (
            <>
                <div>
                    {/* <div className="heart"></div> */}
                    <a
                      className="table-action table-action-transcript text-lg"
                      href="#"
                      onClick={e => this.onChangeBookmark()}
                    >
                      { bookmark ? 
                        <i className="fas fa-bookmark text-bookmark"></i> 
                      :
                        <i className="far fa-bookmark"></i>
                      }
                      <span className="ml-2 text-sm">Bookmark</span>
                    </a>
                </div>
            </>
      );
    }
  }
  
  export default PteBookmark;
