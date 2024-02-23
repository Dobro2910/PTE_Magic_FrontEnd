import axios from "axios";
import React from "react";
import TimeAgo from "react-timeago";
// reactstrap components
import { Card, CardHeader, CardBody } from "reactstrap";
// core components

import Paging from "../../components/Paging";
import Skeleton from "@yisheng90/react-loading";
import MaterialTable from "material-table";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const VoucherTimeline = (props) => {
  const { voucher } = props;
  return (
    <div className="timeline-block">
      <span className="timeline-step badge-white size-45">
        <i className="benit-icon icon-pack-mock size-45 ml-2" />
      </span>
      <div className="profile-content voucher-history">
        <div className="d-flex justify-content-between pt-0">
          <div>
            <h5 className="text-dark font-weight-bold">
              <span>{voucher.voucherTicketCode} </span>
            </h5>
          </div>
          <div className="text-right mt--1">
            <small className="text-muted">
              <i className="fas fa-clock mr-1" />
              <TimeAgo date={voucher.createdDate} />
            </small>
          </div>
        </div>
        <div className="d-flex justify-content-between pt-0">
          <div>
            <h5 className="mt-0 mb-0"></h5>
          </div>
          <div className="text-right mt--1">
            <small className="text-muted">
              <span className="text-danger">
                Campaign: {voucher.voucherCampaignCode || "--"}
              </span>
            </small>
          </div>
        </div>
        <div className="campaign-title">
          <span>
            * {voucher.voucherCampaign ? voucher.voucherCampaign.name : "--"}
          </span>
        </div>
        <div className="acl-container d-flex justify-content-center mb-1 mt-1">
          <div>
            <span className="description-acl">Subscription days</span>
            <span className="acl-data">
              {voucher.packageItem && voucher.packageItem.subscriptionDays > 0 && (
                <span className="acl-package text-success">
                  <i className="fas fa-arrow-up"></i>
                  {voucher.packageItem.subscriptionDays}{" "}
                </span>
              )}
              <span className="acl-data-total">
                {voucher.subscriptionDays || "--"}
              </span>
            </span>
          </div>
          <div>
            <span className="description-acl">AI Scoring</span>
            <span className="acl-data">
              {voucher.packageItem && voucher.packageItem.numberAiScoring > 0 && (
                <span className="acl-package text-success">
                  <i className="fas fa-arrow-up"></i>
                  {voucher.packageItem.numberAiScoring}{" "}
                </span>
              )}
              <span className="acl-data-total">
                {voucher.numberAiScoring || "--"}
              </span>
            </span>
          </div>
          <div>
            <span className="description-acl">Exam mock</span>
            <span className="acl-data">
              {voucher.packageItem && voucher.packageItem.numberExamMock > 0 && (
                <span className="acl-package text-success">
                  <i className="fas fa-arrow-up"></i>
                  {voucher.packageItem.numberExamMock}{" "}
                </span>
              )}
              <span className="acl-data-total">
                {voucher.numberExamMock || "--"}
              </span>
            </span>
          </div>
          <div>
            <span className="description-acl">Score mock</span>
            <span className="acl-data">
              {voucher.packageItem && voucher.packageItem.numberScoreMock > 0 && (
                <span className="acl-package text-success">
                  <i className="fas fa-arrow-up"></i>
                  {voucher.packageItem.numberScoreMock}{" "}
                </span>
              )}
              <span className="acl-data-total">
                {voucher.numberScoreMock || "--"}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

class VoucherHistory extends React.Component<any, any> {
  state = {
    total: 0,
    page: 1,
    pageSize: 5,
    voucherHistory: null,
    loading: false,
  };

  componentDidMount() {
    this.loadData(this.state.page, this.state.pageSize);
  }

  loadData = async (page, pageSize) => {
    // getvoucherHistory
    this.setState({ loading: true });
    let response = await axios.post(`api/account/search-voucher-history`, {
      page,
      pageSize,
    });

    this.setState({
      page: page,
      voucherHistory: response.data.data,
      total: response.data.total,
      loading: false,
    });
  };

  onPageChange = (page, pageSize) => {
    this.loadData(page, pageSize);
  };

  render() {
    const { loading, total, page, pageSize, voucherHistory } = this.state;
    console.log("voucher", voucherHistory);

    const columns = [
      {
        field: "createdDate",
        title: "DATE",
        render: (record) => <div>{record.createdDate.slice(0, 10)}</div>,
      },
      {
        title: "VOUCHER CODE",
        field: "voucherTicketCode",
      },
      {
        title: "SUBSCRIPTION",
        field: "subscriptionDays",
        render: (record) => (
          <div className="display-flex-row">
            <ArrowUpwardIcon style={{ color: "#2dce89" }} />
            {record.packageItem ? record.packageItem.subscriptionDays : "--"}
          </div>
        ),
      },
      {
        title: "MOCK TEST",
        field: "numberExamMock",
        render: (record) => (
          <div className="display-flex-row">
            <ArrowUpwardIcon style={{ color: "#2dce89" }} />
            {record.packageItem ? record.packageItem.numberExamMock : "--"}
          </div>
        ),
      },
      // {
      //   title: "SCORE MOCK",
      //   field: "subscriptionDays",
      //   render: (record) => (
      //     <div className="display-flex-row">
      //       <ArrowUpwardIcon style={{ color: "#2dce89" }} />
      //       {record.packageItem ? record.packageItem.numberScoreMock : "--"}
      //     </div>
      //   ),
      // },
    ];

    return (
      <>
        <Card className="card-profile-payment">
          <div className="card-payment-head">
            <h5 className="h3 mb-0">Voucher history</h5>
          </div>
          <CardBody>
            {loading ? (
              <>
                <Skeleton width="100%" height="2rem" />
                <Skeleton width="100%" height="2rem" />
                <Skeleton width="100%" height="2rem" />
                <Skeleton width="100%" height="2rem" />
                <Skeleton width="100%" height="2rem" />
                <Skeleton width="100%" height="2rem" />
              </>
            ) : (
              <>
                {voucherHistory && (
                  <>
                    <MaterialTable
                      title={null}
                      data={voucherHistory}
                      columns={columns}
                      options={{
                        paging: false,
                        pageSize: 10,
                        search: false,
                        toolbar: false,
                        sorting: false,
                      }}
                      // components={{
                      //   Toolbar: (props) => <div>Table</div>,
                      // }}
                      // onChangePage={this.onPageChange}
                    />
                    <Paging
                      total={total}
                      page={page}
                      limit={pageSize}
                      onChange={this.onPageChange}
                    />
                  </>
                )}
              </>
            )}
          </CardBody>
        </Card>
      </>
    );
  }
}

export default VoucherHistory;
