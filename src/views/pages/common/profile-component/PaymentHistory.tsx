import axios from "axios";
import React from "react";
import TimeAgo from "react-timeago";
// core components
import Paging from "../../components/Paging";
import Skeleton from "@yisheng90/react-loading";
import MaterialTable from "material-table";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

const PaymentTimeline = (props) => {
  const { payment } = props;
  return (
    <div className="timeline-block">
      <span className="timeline-step badge-white size-45">
        {payment.paymentType === "Paypal" && (
          <i className="benit-icon icon-paypal size-45 ml-2" />
        )}
        {payment.paymentType === "Stripe" && (
          <i className="benit-icon icon-stripe size-45 ml-2" />
        )}
      </span>
      <div className="profile-content">
        {payment.billId && (
          <div className="pull-right">
            <a
              data-toggle="tooltip"
              title="View invoice"
              href={`https://storage.cloud.google.com/pte-storage-common/${payment.billId}`}
              target="_blank"
            >
              <span>
                <i
                  className="fas fa-file-invoice text-red"
                  style={{ fontSize: "25px" }}
                ></i>
              </span>
            </a>
          </div>
        )}
        <small className="text-muted font-weight-bold">
          <TimeAgo date={payment.createdDate} />
        </small>
        <ul className="mt-1 ml--3" style={{ fontSize: "13px" }}>
          {payment.packageInfoDisplay.map((item, i) => (
            <li key={`paymemt-package-${i}`}>{item}</li>
          ))}
        </ul>
        <div className="d-flex justify-content-between pt-0">
          <div>
            <h5 className="mt-0 mb-0">Total : ${payment.total}</h5>
          </div>
          <div className="text-right">
            <small className="text-muted">
              Voucher:{" "}
              <span className="text-danger">{payment.voucherCode || "--"}</span>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

class PaymentHistory extends React.Component<any, any> {
  state = {
    total: 0,
    page: 1,
    pageSize: 5,
    paymentHistory: null,
    loading: false,
  };

  componentDidMount() {
    this.loadData(this.state.page, this.state.pageSize);
  }

  loadData = async (page, pageSize) => {
    // getPaymentHistory
    this.setState({ loading: true });
    let response = await axios.post(`api/account/search-payment-history`, {
      page,
      pageSize,
    });
    this.setState({
      page: page,
      paymentHistory: response.data.data,
      total: response.data.total,
      loading: false,
    });
  };

  onPageChange = (page, pageSize) => {
    this.loadData(page, pageSize);
  };

  render() {
    const { loading, total, page, pageSize, paymentHistory } = this.state;
    console.log(paymentHistory);
    const columns = [
      {
        field: "createdDate",
        title: "DATE",
        render: (record) => <div>{record.createdDate.slice(0, 10)}</div>,
      },
      {
        title: "ITEMS",
        field: "packageInfoDisplay",
        render: (record) => (
          <div>
            {record.packageInfoDisplay && record.packageInfoDisplay[0]
              ? record.packageInfoDisplay[0].split(",")[0]
              : "--"}
          </div>
        ),
      },
      {
        title: "STATUS",
        field: "paymentStatus",
        render: (record) => (
          <div className="status-container">
            <span className="status-container-success">
              {record.paymentStatus}
            </span>
          </div>
        ),
      },
      {
        title: "TOTAL",
        field: "total",
        render: (record) => <div>$&nbsp;{record.total}</div>,
      },
      {
        title: "INVOICE",
        field: "action",
        render: (record) => (
          <a
            href={`https://storage.cloud.google.com/pte-storage-common/${record.billId}`}
            target="_blank"
          >
            View invoice
          </a>
        ),
      },
    ];
    return (
      <>
        <Card className="card-profile-payment">
          <div className="card-payment-head">
            <h5 className="h3 mb-0">Payment history</h5>
          </div>
          <CardContent>
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
                {paymentHistory && (
                  <>
                    {/* <div className="timeline timeline-one-side"
                        data-timeline-axis-style="dashed"
                        data-timeline-content="axis">
                          { paymentHistory && paymentHistory.map((item, i) => 
                              <PaymentTimeline key={`paymemt-timeline-${i}`} payment={ item } />
                            )
                          }
                      </div> */}
                    <MaterialTable
                      title={null}
                      data={paymentHistory}
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
          </CardContent>
        </Card>
      </>
    );
  }
}

export default PaymentHistory;
