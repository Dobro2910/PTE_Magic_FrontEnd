import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import account, { AccountState } from './account';
import mockTest, { MockTestState } from './mock_test';
import questionBank, { QuestionBankState } from './question_bank';
import exam, { ExamState } from './exam';
import question, { QuestionState } from './question';
import cart, { CartState } from './cart';
import acl, { AclState } from './acl';
import store, { StoreState } from './store';
import payment, { PaymentState } from './payment';
import voucher, { VoucherState } from './voucher';
import activate, { ActivateState } from './activate';
import pack, { PackState } from './pack';
import banner, { BannerState } from './banner';
import transcript, { TranscriptState } from './transcript';

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly loadingBar: any;
  readonly account: AccountState;
  readonly mockTest: MockTestState;
  readonly questionBank: QuestionBankState;
  readonly exam: ExamState;
  readonly question: QuestionState;
  readonly cart: CartState;
  readonly acl: AclState;
  readonly store: StoreState;
  readonly payment: PaymentState;
  readonly voucher: VoucherState;
  readonly activate: ActivateState;
  readonly pack: PackState;
  readonly banner: BannerState;
  readonly transcript: TranscriptState;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  loadingBar,
  account,
  mockTest,
  questionBank,
  exam,
  question,
  cart,
  acl,
  store,
  payment,
  voucher,
  activate,
  pack,
  banner,
  transcript
});

export default rootReducer;
