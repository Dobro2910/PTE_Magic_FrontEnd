
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

class BenitHeader extends React.Component<any, any> {
  render() {
    return (
      <>
        {/* <div className="header pb-6">
          <Container fluid>
            <div className="header-body">
              <Row className="align-items-center py-4">
                <Col lg="6" xs="7">
                  <Breadcrumb
                    className="d-none d-md-inline-block"
                    listClassName="breadcrumb-links"
                  >
                    <BreadcrumbItem>
                      <a href="/" className="text-default" onClick={e => e.preventDefault()}>
                        <i className="fas fa-home" />
                      </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <a href="/" className="text-default" onClick={e => e.preventDefault()}>
                      { this.props.parentName }
                      </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem aria-current="page" className="active">
                      { this.props.name}
                    </BreadcrumbItem>
                  </Breadcrumb>
                </Col>
              </Row>
            </div>
          </Container>
        </div> */}

        <div className={this.props.padding ? "header bg-benit pb-0":"header bg-benit pb-6"}>
          <Container fluid>
            <div className="header-body">
              <Row className="align-items-center" style={{paddingBottom: "0.5rem"}}>
                <Col lg="6" xs="7">
                  <Breadcrumb
                    className="d-none d-md-inline-block"
                    listClassName="breadcrumb-links"
                  >
                    <BreadcrumbItem>
                      <a href="/" className="text-default" onClick={e => e.preventDefault()}>
                        <i className="fas fa-home" />
                      </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <a href="/" className="text-default" onClick={e => e.preventDefault()}>
                      { this.props.parentName }
                      </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem aria-current="page" className="active text-default">
                      { this.props.name}
                    </BreadcrumbItem>
                  </Breadcrumb>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default BenitHeader;
