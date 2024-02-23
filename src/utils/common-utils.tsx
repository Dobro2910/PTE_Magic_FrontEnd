import paginationFactory from "react-bootstrap-table2-paginator";
import React from 'react';
import _ from 'lodash';

export const hasAnyAuthority = (authorities: string[], hasAnyAuthorities: string[]) => {
    if (authorities && authorities.length !== 0) {
        if (hasAnyAuthorities.length === 0) {
        return true;
        }
        return hasAnyAuthorities.some(auth => authorities.includes(auth));
    }
    return false;
};

export const isFreeUser = (authorities: string[]) => {
  let result = true;
  if (authorities && authorities.length !== 0) {
    authorities.map(role => {
      if (role === 'ROLE_ADMIN' || role === 'ROLE_SUBSCRIPTION_USER') {
        result = false;
      }
    });
  }
  return result;
};

export const limitContent = (authorities: string[], data, length) => {
  let result = true;
  if (authorities && authorities.length !== 0) {
    authorities.map(role => {
      if (role === 'ROLE_ADMIN' || role === 'ROLE_SUBSCRIPTION_USER') {
        result = false;
      }
    });
  }

  if (result) {
    return data.slice(0, length);
  }
  return data;
};

export const truncateText = (text, length) => {
    if (text && text.length > length) {
        text = text.substring(0, length - 3) + "...";
    }
    return text;
}

export const pagination = paginationFactory({
    page: 1,
    alwaysShowAllBtns: true,
    showTotal: true,
    withFirstAndLast: false,
    sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
      <div className="dataTables_length row-table" id="datatable-basic_length">
        <label>
          Show{" "}
          {
            <select
              name="datatable-basic_length"
              aria-controls="datatable-basic"
              className="form-control form-control-sm"
              onChange={e => onSizePerPageChange(e.target.value)}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          }{" "}
          entries.
        </label>
      </div>
    )
  });

export const attachMediaStream = (element, stream) => {
  element.srcObject = stream;
}

/**
 * Check if the passed object is a promise
 * @param value the object to check
 */
export const isPromise = (value): boolean => {
  if (value !== null && typeof value === 'object') {
    return value && typeof value.then === 'function';
  }
  return false;
};


export const getUrlParameter = (name, search) => {
  var url = new URL("http://localhost" + search); // using a dummy url for parsing
  return url.searchParams.get(name) || '';
};

export const randomProgress = () => {
  // return Math.floor(Math.random() * 101);
  return 100;
}

export const calculateProgress = (numberTested, total) => {
  if (!numberTested) {
    return 0;
  }
  let result = numberTested / total * 100;
  result = Math.min(100, result);
  return result.toFixed(1);
}

export const calculateProgressColor = (numberTested, total) => {
  if (!numberTested) {
    return "danger";
  }
  let result = numberTested / total * 100;
  result = Math.min(100, result);
  
  if (result < 50) {
    return "danger";
  } else {
    return "success";
  }

}

export const calculateProgressEachPack = (arrQuestionIds, testedQuestionIds) => {
  if (!testedQuestionIds) {
    return 0;
  }
  let countTested = 0;
  testedQuestionIds.split(',').forEach(questionId => {
    if (_.includes(arrQuestionIds, questionId)) {
      countTested++;
    }
  })
  let result = countTested / arrQuestionIds.length * 100;
  result = Math.min(100, result);
  return result.toFixed(1);
}

// export const getPaymentCost = (packId) => {
//   let value = 0;
//   switch (packId) {
//     case 1:
//         value = 119;
//         break;
//     case 2:
//         value = 59;
//         break;  
//     case 3:
//         value = 25;
//         break;
//     case 4:
//         value = 30;
//         break;
//     case 5:
//         value = 50;
//         break;
//     case 6:
//         value = 35;
//         break;
//     case 7:
//         value = 50;
//         break;
//     case 10:
//         value = 99;
//         break;
//     case 11:
//         value = 199;
//         break;
//     default:
//         break;
//   }

//   return value;
// }