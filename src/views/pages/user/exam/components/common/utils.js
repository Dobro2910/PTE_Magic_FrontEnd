
import DiffMatchPatch from 'diff-match-patch';

export const diffMatch = (text1, text2) => {
  if (text2 == null || text2 === '') {
    text2 = '';
  }
  const dmp = new DiffMatchPatch();
  
  dmp.Diff_Timeout = 10;
  dmp.Diff_EditCost = 4;

  // Remove
  text1 = text1.replace(/\./g, '');
  text1 = text1.replace(/\?/g, '');
  text1 = text1.replace(/\!/g, '');
  text1 = text1.replace(/\,/g, '');
  text1 = text1.replace(/\"/g, '');
  text1 = text1.toLowerCase();

  text2 = text2.toLowerCase();

  const d = dmp.diff_main(text1, text2);

  dmp.diff_cleanupSemantic(d);
  const ds = dmp.diff_prettyHtml(d);
  const tmp = ds;

  const tmpResult = (tmp.match(/<span>(.*?)<\/span>/g) || []).map(function(val) {
    return val.replace(/<\/?span>/g,'');
  });

  let score = (tmpResult.join('').length / text1.length) * 100;
  // score > 100 ? score = 100 : score;

  let result = {
    prettyHtml: ds,
    score: score
  }

  return result;
};

export const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;
    const result = [...arr];
    let itemToAdd = payload;
    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }
  
    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }
  
    return result;
  };
  
  export const generateItems = (count, creator) => {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(creator(i));
    }
    return result;
  };

  export const generateDnDAnswers = (question) => {
    const result = [];
    const idAnswers = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    idAnswers.map((item, i) => {
      let tmpAnswer = question['answer' + item];

      if (tmpAnswer !== null && tmpAnswer !== '') {
        let creator = {
          type: "draggable",
          id: item,
          props: {
            className: "card",
            style: { backgroundColor: pickColor() }
          },
          data: tmpAnswer
        };
        result.push(creator);
      }
    });
    return result;
  };

  const cardColors = [
  'azure',
  'beige',
  'bisque',
  'blanchedalmond',
  'burlywood',
  'cornsilk',
  'gainsboro',
  'ghostwhite',
  'ivory',
  'khaki'
];

const pickColor = () => {
  let rand = Math.floor(Math.random() * 10);
  return cardColors[rand];
};

