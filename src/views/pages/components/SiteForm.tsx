import React from "react";
import axios from 'axios';
import _ from 'lodash';
import $ from 'jquery';

// nodejs library that concatenates classes
// reactstrap components
import {
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import { AvForm, AvField } from 'availity-reactstrap-validation';
// core components

class SiteForm extends React.Component<any, any> {
  state = {
    area_code: null,
    building_code: null,
    level_code: null,
    room_code: null,
    areas : [],
    buildings: [],
    levels: [],
    rooms: [],
    loading: true,
    selectedData: null
  };

  siteFormRef;

  constructor(props) {
    super(props);
    this.siteFormRef = React.createRef();
  }

  async componentDidMount() {
    const { data } = this.props;
    this.setState({ ...data.site_id, selectedData: data, loading: true });
    let areasData = await axios.get(`/api/sites?site_type=area`);
    this.setState({ areas : areasData.data.rows });
    await this.loadComboxData(this.state.area_code, this.state.building_code, this.state.level_code);
    this.setState({ loading: false });
  }

  loadComboxData = async (area_code, building_code?, level_code?) => {
    // Get list area code
    // let areas = await axios.get(`/api/sites?site_type=area`);
    // Get list building code by Area code
    let buildings = [];
    if (!_.includes(this.props.hideFields, 'building') && area_code) {
      let data = await axios.get(`/api/sites?site_type=building&area_code=${area_code}`);
      buildings = data.data.rows;
    }
    
    let levels = [];
    if (!_.includes(this.props.hideFields, 'level') && building_code) {
      let data = await axios.get(`/api/sites?site_type=level&area_code=${area_code}&building_code=${building_code}`);
      levels = data.data.rows;
    }

    let rooms = [];
    if (!_.includes(this.props.hideFields, 'room') && level_code) {
      let data = await axios.get(`/api/sites?site_type=room&area_code=${area_code}&building_code=${building_code}&level_code=${level_code}`);
      rooms = data.data.rows;
    }

    this.setState({ buildings, levels, rooms });
    // console.log(this.siteFormRef.site_id.area_code);
  }
  
  onChangeAreaCode = (e) => {
    this.setState({ area_code: e.target.value });
    this.loadComboxData(e.target.value);
  }

  onChangeBuildingCode = (e) => {
    this.setState({ building_code: e.target.value });
    console.log(`Change building code: ${e.target.value}`);
    this.loadComboxData(this.state.area_code, e.target.value);
  }

  onChangeLevelCode = (e) => {
    this.setState({ level_code: e.target.value });
    this.loadComboxData(this.state.area_code, this.state.building_code, e.target.value);
  }

  onChangeRoomCode = (e) => {
    console.log(e.target.value);
    this.setState({ room_code: e.target.value })
  }

  callbackData = () => {
    const data = { area_code: this.state.area_code, building_code: this.state.building_code,
      level_code: this.state.level_code, room_code: this.state.room_code  };
    return data;
  }

  handleSubmit = (event, errors, values) => {
    console.log(errors);
    this.setState({ errors });
  }

  render() {
    const { areas, buildings, levels, rooms, loading, selectedData } = this.state;
    const { hideFields } = this.props;
    return (
      <>
        { !loading ? <AvForm role="form1" model={selectedData} 
          ref={f => (this.siteFormRef = f)} onSubmit={this.handleSubmit}  >
        <Row>
          <Col xs="6" sm="6">
            <FormGroup>
              <InputGroup className="input-group-merge input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-map-big required" />
                  </InputGroupText>
                </InputGroupAddon>
                <AvField type="select" helpMessage="Chọn khu vực"
                  onChange={ this.onChangeAreaCode.bind(this) }
                  name="site_id.area_code" className="modal-input-split" required>
                    { areas 
                    && areas.map((item, i) => <option key={`area-${item._id}`} value={item.area_code}>{item.site_name}</option>)
                    }
                </AvField>
              </InputGroup>
            </FormGroup>
          </Col>
          { !_.includes(hideFields, 'building') && 
          <Col xs="6" sm="6">
            <FormGroup>
              <InputGroup className="input-group-merge input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-building required" />
                  </InputGroupText>
                </InputGroupAddon>
                <AvField type="select" helpMessage="Chọn tòa nhà"
                  onChange={this.onChangeBuildingCode.bind(this) }
                  name="site_id.building_code" className="modal-input-split" required>
                  { buildings 
                    && buildings.map((item, i) => <option key={`building-${item._id}`} value={item.building_code}>{item.site_name}</option>)
                  }
                </AvField>
              </InputGroup>
            </FormGroup>
          </Col>
          }
        </Row>
        <Row>
          { !_.includes(hideFields, 'level') && 
          <Col xs="6" sm="6">
            <FormGroup>
              <InputGroup className="input-group-merge input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-building required" />
                  </InputGroupText>
                </InputGroupAddon>
                <AvField helpMessage="Chọn tầng"
                  onChange={this.onChangeLevelCode.bind(this) }
                  type="select" name="site_id.level_code" className="modal-input-split">
                  { levels 
                    && levels.map((item, i) => <option key={`level-${item._id}`} value={item.level_code}>{item.site_name}</option>)
                  }
                </AvField>
              </InputGroup>
            </FormGroup>
          </Col>
          }
          { !_.includes(hideFields, 'room') && 
          <Col xs="6" sm="6">
          <FormGroup>
            <InputGroup className="input-group-merge input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-building required" />
                </InputGroupText>
              </InputGroupAddon>
              <AvField helpMessage="Chọn phòng"
                onChange={this.onChangeRoomCode.bind(this) }
                type="select" name="site_id.room_code" className="modal-input-split">
                { rooms 
                  && rooms.map((item, i) => <option key={`room-${item._id}`} value={item.room_code}>{item.site_name}</option>)
                }
              </AvField>
            </InputGroup>
          </FormGroup>
        </Col>
          }
        </Row>
        </AvForm>
        : <div className="text-center">Loading ...</div>}
      </>
    );
  }
}
export default SiteForm;
