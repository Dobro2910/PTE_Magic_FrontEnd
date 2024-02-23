import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

export const BlockScore = props => (
  <div className="block-recognition m-b-10">
    <p className="typeAnswer">{props.title}</p>
    <p className="typeAnswer pull-right">{props.score}</p>
  </div>
);

export const PteAnswerWriting = props => (
  <div>
    {/* { props.answer && <>
      <Row>
        <div className="col-md-4">
          <div className="col-md-12">
            <p className="typeAnswer">My answer</p>
          </div>
        </div>
        <div className="col-md-8">
          <div className="col-md-12">
            <p className="typeAnswer">
              <span dangerouslySetInnerHTML={{ __html: props.answer }} />
            </p>
          </div>
        </div>
      </Row>
      </>
    } */}
    { props.googleAnswer && <>
      <Row>
        <div className="col-md-4">
          <div className="col-md-12">
            <p className="typeAnswer">My answer</p>
          </div>
        </div>
        <div className="col-md-8">
          <div className="col-md-12">
            <p className="typeAnswer">
              <span dangerouslySetInnerHTML={{ __html: props.googleAnswer.markedTranscript }} />
            </p>
          </div>
        </div>
      </Row>
      <Row>
        <Col lg="4" className="mr-2">
          <BlockScore title={'Content'} score={props.googleAnswer.content} />
        </Col>
        <Col lg="4" className="mr-2" >
          <BlockScore title={'Form'} score={props.googleAnswer.form} />
        </Col>
        {props.questionType === 'WRITING_ESSAY' && (
          <Col lg="4" className="mr-2" >
            <BlockScore title={'Structure'} score={props.googleAnswer.structure} />
          </Col>
        )}
        <Col lg="4" className="mr-2" >
          <BlockScore title={'Grammar'} score={props.googleAnswer.grammar} />
        </Col>
        {props.questionType === 'WRITING_ESSAY' && (
          <Col lg="4" className="mr-2" >
            <BlockScore title={'General Input'} score={props.googleAnswer.generalInput} />
          </Col>
        )}
        <Col lg="4" className="mr-2" >
          <BlockScore title={'Vocabulary'} score={props.googleAnswer.vocabulary} />
        </Col>
        {props.questionType === 'WRITING_ESSAY' && (
          <Col lg="4" className="mr-2" >
            <BlockScore title={'Spelling'} score={props.googleAnswer.spelling} />
          </Col>
        )}
      </Row>
    </>
    }
  </div>
);
