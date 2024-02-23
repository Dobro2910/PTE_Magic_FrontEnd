
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

class AlternativeHeader extends React.Component {
  render() {
    return (
      <>
        <div className="header pb-6">
          <Container fluid>
            <div className="header-body">
              <Row className="align-items-center py-4">
                <Col lg="6" xs="7">
                  <Breadcrumb
                    className="d-none d-md-inline-block ml-md-4"
                    listClassName="breadcrumb-links"
                  >
                    <BreadcrumbItem>
                      <a href="#" className="text-default" onClick={e => e.preventDefault()}>
                        <i className="fas fa-home" />
                      </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <a href="#" className="text-default" onClick={e => e.preventDefault()}>
                        Home
                      </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem aria-current="page" className="active">
                      Dashboard
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

export default AlternativeHeader;
