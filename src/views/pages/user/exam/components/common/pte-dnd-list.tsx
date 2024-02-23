import React from 'react';
import { IPteQuestion } from 'src/shared/model/pte-question.model';
import LoadingBar from 'react-redux-loading-bar';
import { EXAM_GROUP, QUESTION_TYPE } from 'src/config/constants';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag, generateDnDAnswers } from './utils';
import { Button, Col, Row, Table } from 'reactstrap';
export interface IPteDnDListProps {
  question: IPteQuestion;
}

export interface IPteDnDListState {
  scene: any;
}

const columnNames = ['Source', 'Target'];

export default class PteDnDList extends React.Component<IPteDnDListProps, IPteDnDListState> {
  constructor(props) {
    super(props);

    this.onColumnDrop = this.onColumnDrop.bind(this);
    this.onCardDrop = this.onCardDrop.bind(this);
    this.getCardPayload = this.getCardPayload.bind(this);
    this.state = {
      scene: {
        type: 'container',
        props: {
          orientation: 'horizontal'
        },
        children: [
          {
            id: 'column0',
            type: 'container',
            name: columnNames[0],
            props: {
              orientation: 'vertical',
              id: 'reorder-container-vertical',
              className: 'card-container reorder-contaniner '
            },
            children: generateDnDAnswers(this.props.question)
          },
          {
            id: 'column1',
            type: 'container',
            name: columnNames[1],
            props: {
              orientation: 'vertical',
              id: 'reorder-container-vertical',
              className: 'card-container reorder-contaniner '
            },
            children: []
          }
        ]
      }
    };
  }

  // Get answer of common component
  getAnswer = () => {
    var answer = [];
    for (var i = 0; i < this.state.scene.children[1].children.length; i++) {
      // answer = answer + this.state.scene.children[1].children[i].id + ', ';
      answer.push(this.state.scene.children[1].children[i].id);
    }
    return answer.join(', ');
  };

  render() {
    return (
      <div className="card-scene" id="re-order-paragraph">
        {/* <pre>{ JSON.stringify(this.state.scene, null, 2) }</pre> */}
        <Container orientation="horizontal" onDrop={this.onColumnDrop} dragHandleSelector=".column-drag-handle">
          <Row>
            {this.state.scene.children.map(column => {
              return (
                <Draggable key={column.id} className="col-md-6">
                  <Col md="12" className={column.props.className + 'panel panel-info padding0'}>
                    <div className="card-column-header panel-heading">
                      <h3 className="panel-title ng-binding">{column.name}</h3>
                    </div>
                    <Container
                      {...column.props}
                      groupName="col"
                      onDrop={e => this.onCardDrop(column.id, e)}
                      getChildPayload={index => this.getCardPayload(column.id, index)}
                      dragClass="card-ghost"
                      dropClass="card-ghost-drop"
                      onDragEnter={() => {
                        // tslint:disable-next-line
                        console.log('drag enter:', column.id);
                      }}
                      onDragLeave={() => {
                        // tslint:disable-next-line
                        console.log('drag leave:', column.id);
                      }}
                    >
                      {column.children.map(card => {
                        return (
                          <Draggable key={card.id}>
                            <div {...card.props} style={{backgroundColor: "#fff3d2", fontWeight: 700, border: "1px solid #e6dada"}}>
                              <p>{card.data}</p>
                            </div>
                          </Draggable>
                        );
                      })}
                    </Container>
                  </Col>
                  
                </Draggable>
              );
            })}
          </Row>
        </Container>
      </div>
    );
  }

  getCardPayload(columnId, index) {
    return this.state.scene.children.filter(p => p.id === columnId)[0].children[index];
  }

  onColumnDrop(dropResult) {
    const scene = Object.assign({}, this.state.scene);
    scene.children = applyDrag(scene.children, dropResult);
    this.setState({
      scene
    });
  }

  onCardDrop(columnId, dropResult) {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const scene = Object.assign({}, this.state.scene);
      const column = scene.children.filter(p => p.id === columnId)[0];
      const columnIndex = scene.children.indexOf(column);

      const newColumn = Object.assign({}, column);
      newColumn.children = applyDrag(newColumn.children, dropResult);
      scene.children.splice(columnIndex, 1, newColumn);

      this.setState({
        scene
      });
    }
  }
}
