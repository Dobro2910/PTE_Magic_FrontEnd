
import React from "react";
// reactstrap components
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Container,
  Row,
  Col
} from "reactstrap";

class TimelineHeader extends React.Component<any, any> {
  render() {
    return (
      <>
        <div className="header header-dark pb-6 content__title content__title--calendar">
          <Container fluid>
            <div className="header-body">
              <Row className="align-items-center py-4">
                <Col lg="6" xs="7">
                  <h6 className="fullcalendar-title h2 text-white d-inline-block mb-0">
                    {this.props.name}
                  </h6>{" "}
                  <Breadcrumb
                    className="d-none d-md-inline-block ml-lg-4"
                    listClassName="breadcrumb-links breadcrumb-dark"
                  >
                    <BreadcrumbItem>
                      <a href="#pablo" className="text-default"  onClick={e => e.preventDefault()} >
                        <i className="fas fa-home" />
                      </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <a href="#pablo" className="text-default"  onClick={e => e.preventDefault()} >
                        {this.props.parentName}
                      </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem aria-current="page" className="active">
                      <span >{this.props.name}</span>
                    </BreadcrumbItem>
                  </Breadcrumb>
                </Col>
                {/* <Col className="mt-3 mt-md-0 text-md-right" lg="6" xs="5">
                  <Button className="btn-neutral" color="default" size="sm">
                    New
                  </Button>
                  <Button className="btn-neutral" color="default" size="sm">
                    Filters
                  </Button>
                </Col> */}
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default TimelineHeader;
