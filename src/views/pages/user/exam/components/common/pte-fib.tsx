import React from 'react';
import { IPteQuestion } from 'src/shared/model/pte-question.model';
import { Container, Draggable } from 'react-smooth-dnd';
import $ from 'jquery';
import { SUCCESS } from 'src/utils/action-type.util';

export interface IPteFillInTheBlankProps {
  question: IPteQuestion;
  correctAnswer?: boolean;
}

export interface IPteFillInTheBlankState {
  question: string;
  dndData: {};
  containerVisible: {};
  dragPayload: any;
}

export default class PteFillInTheBlank extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  state = {
    question: '',
    dndData: {},
    containerVisible: {},
    dragPayload: null,
    timeReceiveAnswer: 0
  };

  componentWillReceiveProps({ correctAnswer }) {
    if (correctAnswer !== false) {
      let question = this.props.question;
      if (this.state.timeReceiveAnswer === 0) {
        switch (question.type) {
          case 'LISTENING_FIB_L':
            this.processShowAnswer_LISTENING_FIB_L();
            this.setState({timeReceiveAnswer: 1})
            break;
          case 'READING_FIB_R_W':
            this.processShowAnswer_READING_FIB_R_W();
            this.setState({timeReceiveAnswer: 1})
            break;
          case 'READING_FIB_R':
            this.processShowAnswer_READING_FIB_R();
            this.setState({timeReceiveAnswer: 1})
            break;
          default:
            break;
        }
      }
    }
  }

  processShowAnswer_LISTENING_FIB_L= () => {
    let userAnswers = this.getAnswer();
    let areas = $(".container-LISTENING_FIB_L");
    for (let i = 0; i < areas.length; i++) {
      let area = areas[i];
      let answer
      if (this.getCssClassAnswer_READING_FIB_R(userAnswers, i)) {
        area.children.item(0).style.borderColor = "#12d3bf"
        area.children.item(0).style.color = "#12d3bf"
      } else {
        area.children.item(0).style.borderColor = "#ff6666"
        area.children.item(0).style.color = "#ff6666"
        answer = `<span class="badge badge-white drag-inline-answer">
        (${this.getTextAnswer_LISTENING_FIB_L(i)})
      </span>`;
        $(area).append(answer);
      }
    }
  }

  processShowAnswer_READING_FIB_R_W = () => {
    let userAnswers = this.getAnswer();
    console.log(userAnswers);
    let areas = $(".container-select_READING_FIB_R_W");
    for (let i = 0; i < areas.length; i++) {
      let area = areas[i];
      let answer
      if (this.getCssClassAnswer_READING_FIB_R(userAnswers, i)) {
        area.children.item(0).style.borderColor = "#12d3bf"
        area.children.item(0).style.color = "#12d3bf"
      } else {
        area.children.item(0).style.borderColor = "#ff6666"
        area.children.item(0).style.color = "#ff6666"
        answer = `<span class="badge badge-white drag-inline-answer">
        (${this.getTextAnswer_LISTENING_FIB_L(i)})
      </span>`;
        $(area).append(answer);
      }
    }
  }

  processShowAnswer_READING_FIB_R = () => {
    let userAnswers = this.getAnswer();
    let areas = $("#dragInput > .smooth-dnd-container.horizontal");
    for (let i = 0; i < areas.length; i++) {
      let area = areas[i];
      let answer = `<span class="badge badge-white drag-answer">
        <i class="fas ${this.getCssClassAnswer_READING_FIB_R(userAnswers, i) ? 'fa-check color-answer-correct' : 'fa-times color-answer-wrong'} fib-checkbox-answer"></i>
        ${this.getTextAnswer_READING_FIB_R(i)}
      </span>`;
      $(area).append(answer);
    }
  }

  getCssClassAnswer_READING_FIB_R = (userAnswers, index) => {
    let answers = this.props.question.expectAnswer.split(',');
    if (answers[index].trim() === userAnswers[index].trim()) {
      return true; //"color-answer-correct";
    } else {
      return false;// "color-answer-wrong";
    }
  }

  getTextAnswer_READING_FIB_R = (index) => {
    let answers = this.props.question.expectAnswer.split(',');
    let text = this.props.question[`answer${answers[index].trim()}`];
    return text;
  }

  getTextAnswer_LISTENING_FIB_L = (index) => {
    let answers = this.props.question.expectAnswer.split(',');
    let text = answers[index].trim();
    return text;
  }

  // Get answer of common component
  getAnswer = () => {
    let answers = [];
    let question = this.props.question;
    switch (question.type) {
      case 'LISTENING_FIB_L':
        $('.input_answer').each(function() {
          answers.push($(this).val());
        });
      case 'READING_FIB_R_W':
        $('.select_READING_FIB_R_W').each(function() {
          answers.push(
            $(this)
              .find('option:selected')
              .text()
          );
        });
        break;
      case 'READING_FIB_R':
        var count = (question.text.match(/@Blank@/g) || []).length;
        for (let i = 0; i < count; i++) {
          let id = 'answerArea' + i;
          if (this.state.dndData[id].length > 0) {
            if (this.state.dndData[id][0]) {
              answers.push(this.state.dndData[id][0].key);
            }
          } else {
            answers.push('');
          }
        }
        break;
      default:
        break;
    }
    return answers;
  };

  componentWillMount() {
    this.loadData();
  }

  loadData = () => {
    var description = '';
    var question = this.props.question;
    switch (question.type) {
      case 'LISTENING_FIB_L':
        description = question.description.replace(
          /@Blank@/g,
          `<div style="display: inline-block; position: relative" class="container-LISTENING_FIB_L">
          <input type="text" name="input" class="input_answer pte-writing-input input_answer_fib_l"/>
          </div>`
        );
        break;
      case 'READING_FIB_R_W':
        description = question.text;
        if (question.answerA !== '' && question.answerA != null) {
          var txt = this.buildSelectElement(question.answerA);
          description = description.replace(/@Blank@/, txt);
        }
        if (question.answerB !== '' && question.answerB != null) {
          var txt = this.buildSelectElement(question.answerB);
          description = description.replace(/@Blank@/, txt);
        }
        if (question.answerC !== '' && question.answerC != null) {
          var txt = this.buildSelectElement(question.answerC);
          description = description.replace(/@Blank@/, txt);
        }
        if (question.answerD !== '' && question.answerD != null) {
          var txt = this.buildSelectElement(question.answerD);
          description = description.replace(/@Blank@/, txt);
        }
        if (question.answerE !== '' && question.answerE != null) {
          var txt = this.buildSelectElement(question.answerE);
          description = description.replace(/@Blank@/, txt);
        }
        // more answer
        if (question.answerF !== '' && question.answerF != null) {
          var txt = this.buildSelectElement(question.answerF);
          description = description.replace(/@Blank@/, txt);
        }
        if (question.answerG !== '' && question.answerG != null) {
          var txt = this.buildSelectElement(question.answerG);
          description = description.replace(/@Blank@/, txt);
        }
        if (question.answerH !== '' && question.answerH != null) {
          var txt = this.buildSelectElement(question.answerH);
          description = description.replace(/@Blank@/, txt);
        }
        if (question.answerI !== '' && question.answerI != null) {
          var txt = this.buildSelectElement(question.answerI);
          description = description.replace(/@Blank@/, txt);
        }
        if (question.answerJ !== '' && question.answerJ != null) {
          var txt = this.buildSelectElement(question.answerJ);
          description = description.replace(/@Blank@/, txt);
        }
        break;
      case 'READING_FIB_R':
        // Split question
        let dndObj = { answerArea: [] };
        for (var i = 0; i < 10; i++) {
          dndObj['answerArea' + i] = [];
        }
        this.state.dndData = dndObj;
        this.buildDropAreas(question);

        var count = (question.text.match(/@Blank@/g) || []).length;
        for (let i = 0; i < count; i++) {
          let id = 'answerArea' + i;
          this.state.containerVisible[id] = true;
        }

        break;
    }

    this.setState({ question: description });
  };

  buildDropAreas = question => {
    // Build data for answer area
    this.state.dndData['answerArea'].push({ label: question.answerA, key: 'A' });
    this.state.dndData['answerArea'].push({ label: question.answerB, key: 'B' });
    this.state.dndData['answerArea'].push({ label: question.answerC, key: 'C' });
    this.state.dndData['answerArea'].push({ label: question.answerD, key: 'D' });
    this.state.dndData['answerArea'].push({ label: question.answerE, key: 'E' });

    // more answer
    if (question.answerF !== '' && question.answerF !== null) {
      this.state.dndData['answerArea'].push({ label: question.answerF, key: 'F' });
    }
    if (question.answerG !== '' && question.answerG !== null) {
      this.state.dndData['answerArea'].push({ label: question.answerG, key: 'G' });
    }
    if (question.answerH !== '' && question.answerH !== null) {
      this.state.dndData['answerArea'].push({ label: question.answerH, key: 'H' });
    }
    if (question.answerI !== '' && question.answerI !== null) {
      this.state.dndData['answerArea'].push({ label: question.answerI, key: 'I' });
    }
    if (question.answerJ !== '' && question.answerJ !== null) {
      this.state.dndData['answerArea'].push({ label: question.answerJ, key: 'J' });
    }
  };

  prepareFillInTheBlanksR = () => {
    var question = this.props.question;
    var count = (question.text.match(/@Blank@/g) || []).length;
    for (let i = count; i < 10; i++) {
      let id = '#answerArea' + i;
      $(id).remove();
    }

    let dragInput = $('#dragInput')[0];
    let partialTexts = question.text.split('@Blank@');
    if (partialTexts.length > count) {
      let startTextSpan = document.createElement('span');
      startTextSpan.className = 'dragArea';
      startTextSpan.innerHTML = partialTexts[0];
      dragInput.insertBefore(startTextSpan, dragInput.children[0]);

      for (let i = 1; i <= count; i++) {
        let textSpan = document.createElement('span');
        textSpan.className = 'dragArea';
        textSpan.innerHTML = partialTexts[i];
        dragInput.insertBefore(textSpan, dragInput.children[i * 2]);
      }
    } else if (partialTexts.length === count) {
      if (question.text.indexOf('@Blank@') > 0) {
        let startTextSpan = document.createElement('span');
        startTextSpan.className = 'dragArea';
        startTextSpan.innerHTML = partialTexts[0];
        dragInput.insertBefore(startTextSpan, dragInput.children[0]);

        for (let i = 1; i <= count; i++) {
          let textSpan = document.createElement('span');
          textSpan.className = 'dragArea';
          textSpan.innerHTML = partialTexts[i];
          this.insertAfter(textSpan, dragInput.children[i * 2]);
        }
      } else {
        for (let i = 0; i < count; i++) {
          let textSpan = document.createElement('span');
          textSpan.className = 'dragArea';
          textSpan.innerHTML = partialTexts[i];
          this.insertAfter(textSpan, dragInput.children[i * 2]);
        }
      }
    } else {
      for (let i = 0; i < count; i++) {
        let textSpan = document.createElement('span');
        textSpan.className = 'dragArea';
        textSpan.innerHTML = partialTexts[i];
        this.insertAfter(textSpan, dragInput.children[i * 2]);
      }
    }
  };

  insertAfter = (newNode, referenceNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  };

  buildSelectElement = answer => {
    let arrAnswer = answer.split('/');
    let optTmp = '';
    for (let data of arrAnswer) {
      optTmp = optTmp + '<option>' + data + '</option>';
    }
    let sel = '<select name="select" class="select_READING_FIB_R_W "><option value=""></option>' + optTmp + '</select>';
    let divSel = '<div class="container-select_READING_FIB_R_W" style="position: relative;display: inline-block">' + sel + '</div>';
    return divSel;
  };

  applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;

    const result = [...arr];
    let itemToAdd = payload;

    if (result.length === 1 && addedIndex !== null) {
      this.state.dragPayload = result.pop();
    }

    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }

    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    } else {
      if (this.state.dragPayload) {
        result.splice(result.length, 0, this.state.dragPayload);
        this.state.dragPayload = null;
      }
    }

    return result;
  };

  applyDragForDeparture = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;

    const result = [...arr];
    let itemToAdd = payload;

    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }

    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    } else {
      if (this.state.dragPayload) {
        result.splice(result.length, 0, this.state.dragPayload);
        this.state.dragPayload = null;
      }
    }

    return result;
  };

  componentDidMount() {
    if (this.props.question.type === 'READING_FIB_R') {
      this.prepareFillInTheBlanksR();
    }
  }

  render() {
    return (
      <div>
        {this.props.question.type !== 'READING_FIB_R' ? (
          <div className="text-fz-18 text-lh-40" dangerouslySetInnerHTML={{ __html: this.state.question }} />
        ) : (
          <div id="fib-drag-container" >
            <div id="dragInput">
              {this.state.containerVisible['answerArea0'] ? (
                <Container
                  // id="answerArea0"
                  groupName="1"
                  orientation="horizontal"
                  key="1"
                  getChildPayload={i => this.state.dndData['answerArea0'][i]}
                  onDrop={e =>
                    this.setState({ dndData: { ...this.state.dndData, answerArea0: this.applyDrag(this.state.dndData['answerArea0'], e) } })
                  }
                >
                  {this.state.dndData['answerArea0'].map(item => {
                    return (
                      <>
                        {item && (
                          <Draggable key={"answerArea0" + item.key}>
                            <div>{item.label}</div>
                          </Draggable>
                        )}
                      </>
                    );
                  })}
                </Container>
              ) : null}
              {this.state.containerVisible['answerArea1'] ? (
                <>
                <Container
                  // id="answerArea1"
                  groupName="1"
                  orientation="horizontal"
                  getChildPayload={i => this.state.dndData['answerArea1'][i]}
                  onDrop={e =>
                    this.setState({ dndData: { ...this.state.dndData, answerArea1: this.applyDrag(this.state.dndData['answerArea1'], e) } })
                  }
                >
                  {this.state.dndData['answerArea1'].map(item => {
                    return (
                      <>
                        {item && (
                          <Draggable key={`answerArea1-${item.key}`}>
                            <div>{item.label}</div>
                          </Draggable>
                        )}
                      </>
                    );
                  })}
                </Container>
                </>
              ) : null}
              {this.state.containerVisible['answerArea2'] ? (
                <Container
                  // id="answerArea2"
                  groupName="1"
                  orientation="horizontal"
                  getChildPayload={i => this.state.dndData['answerArea2'][i]}
                  onDrop={e =>
                    this.setState({ dndData: { ...this.state.dndData, answerArea2: this.applyDrag(this.state.dndData['answerArea2'], e) } })
                  }
                >
                  {this.state.dndData['answerArea2'].map(item => {
                    return (
                      <>
                        {item && (
                          <Draggable key={`answerArea2-${item.key}`}>
                            <div>{item.label}</div>
                          </Draggable>
                        )}
                      </>
                    );
                  })}
                </Container>
              ) : null}
              {this.state.containerVisible['answerArea3'] ? (
                <Container
                  // id="answerArea3"
                  groupName="1"
                  orientation="horizontal"
                  getChildPayload={i => this.state.dndData['answerArea3'][i]}
                  onDrop={e =>
                    this.setState({ dndData: { ...this.state.dndData, answerArea3: this.applyDrag(this.state.dndData['answerArea3'], e) } })
                  }
                >
                  {this.state.dndData['answerArea3'].map(item => {
                    return (
                      <>
                        {item && (
                          <Draggable key={`answerArea3-${item.key}`}>
                            <div>{item.label}</div>
                          </Draggable>
                        )}
                      </>
                    );
                  })}
                </Container>
              ) : null}
              {this.state.containerVisible['answerArea4'] ? (
                <Container
                  // id="answerArea4"
                  groupName="1"
                  orientation="horizontal"
                  getChildPayload={i => this.state.dndData['answerArea4'][i]}
                  onDrop={e =>
                    this.setState({ dndData: { ...this.state.dndData, answerArea4: this.applyDrag(this.state.dndData['answerArea4'], e) } })
                  }
                >
                  {this.state.dndData['answerArea4'].map(item => {
                    return (
                      <>
                        {item && (
                          <Draggable key={`answerArea4-${item.key}`}>
                            <div>{item.label}</div>
                          </Draggable>
                        )}
                      </>
                    );
                  })}
                </Container>
              ) : null}
              {this.state.containerVisible['answerArea5'] ? (
                <Container
                  // id="answerArea5"
                  groupName="1"
                  orientation="horizontal"
                  getChildPayload={i => this.state.dndData['answerArea5'][i]}
                  onDrop={e =>
                    this.setState({ dndData: { ...this.state.dndData, answerArea5: this.applyDrag(this.state.dndData['answerArea5'], e) } })
                  }
                >
                  {this.state.dndData['answerArea5'].map(item => {
                    return (
                      <>
                        {item && (
                          <Draggable key={`answerArea5-${item.key}`}>
                            <div>{item.label}</div>
                          </Draggable>
                        )}
                      </>
                    );
                  })}
                </Container>
              ) : null}
              {this.state.containerVisible['answerArea6'] ? (
                <Container
                  // id="answerArea6"
                  groupName="1"
                  orientation="horizontal"
                  getChildPayload={i => this.state.dndData['answerArea6'][i]}
                  onDrop={e =>
                    this.setState({ dndData: { ...this.state.dndData, answerArea6: this.applyDrag(this.state.dndData['answerArea6'], e) } })
                  }
                >
                  {this.state.dndData['answerArea6'].map(item => {
                    return (
                      <>
                        {item && (
                          <Draggable key={`answerArea6-${item.key}`}>
                            <div>{item.label}</div>
                          </Draggable>
                        )}
                      </>
                    );
                  })}
                </Container>
              ) : null}
              {this.state.containerVisible['answerArea7'] ? (
                <Container
                  // id="answerArea7"
                  groupName="1"
                  orientation="horizontal"
                  getChildPayload={i => this.state.dndData['answerArea7'][i]}
                  onDrop={e =>
                    this.setState({ dndData: { ...this.state.dndData, answerArea7: this.applyDrag(this.state.dndData['answerArea7'], e) } })
                  }
                >
                  {this.state.dndData['answerArea7'].map(item => {
                    return (
                      <>
                        {item && (
                          <Draggable key={`answerArea7-${item.key}`}>
                            <div>{item.label}</div>
                          </Draggable>
                        )}
                      </>
                    );
                  })}
                </Container>
              ) : null}
              {this.state.containerVisible['answerArea8'] ? (
                <Container
                  // id="answerArea8"
                  groupName="1"
                  orientation="horizontal"
                  getChildPayload={i => this.state.dndData['answerArea8'][i]}
                  onDrop={e =>
                    this.setState({ dndData: { ...this.state.dndData, answerArea8: this.applyDrag(this.state.dndData['answerArea8'], e) } })
                  }
                >
                  {this.state.dndData['answerArea8'].map(item => {
                    return (
                      <>
                        {item && (
                          <Draggable key={`answerArea8-${item.key}`}>
                            <div>{item.label}</div>
                          </Draggable>
                        )}
                      </>
                    );
                  })}
                </Container>
              ) : null}
              {this.state.containerVisible['answerArea9'] ? (
                <Container
                  // id="answerArea9"
                  groupName="1"
                  orientation="horizontal"
                  getChildPayload={i => this.state.dndData['answerArea9'][i]}
                  onDrop={e =>
                    this.setState({ dndData: { ...this.state.dndData, answerArea9: this.applyDrag(this.state.dndData['answerArea9'], e) } })
                  }
                >
                  {this.state.dndData['answerArea9'].map(item => {
                    return (
                      <>
                        {item && (
                          <Draggable key={`answerArea9-${item.key}`}>
                            <div>{item.label}</div>
                          </Draggable>
                        )}
                      </>
                    );
                  })}
                </Container>
              ) : null}
            </div>
            <Container
              groupName="1"
              orientation="horizontal"
              getChildPayload={i => this.state.dndData['answerArea'][i]}
              onDrop={e =>
                this.setState({
                  dndData: { ...this.state.dndData, answerArea: this.applyDragForDeparture(this.state.dndData['answerArea'], e) }
                })
              }
            >
              {this.state.dndData['answerArea'].map(item => {
                return (
                  <>
                    {item && (
                      <Draggable key={ "answerArea" + item.key}>
                        <div>{item.label}</div>
                      </Draggable>
                    )}
                  </>
                );
              })}
            </Container>
          </div>
        )}
      </div>
    );
  }
}
