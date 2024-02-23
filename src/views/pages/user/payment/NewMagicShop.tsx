import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import { Button, Card, CardContent } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import Hidden from "@material-ui/core/Hidden";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CustomSlider from "src/components/Sliders/CustomSlider";
import { saveOne, getAll,changeQuantity } from "src/reducers/cart";
import { getPackages } from "src/reducers/pack";
import { IRootState } from "src/reducers";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";
import CircularProgress from '@material-ui/core/CircularProgress';
const iconBook = require("assets/img/icons/icon_book.svg");
const iconReading = require("assets/img/icons/icon-27.svg");
const iconPencilPapper = require("assets/img/icons/icon_paper_and_pencil.svg");

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiCard-root": {
        boxShadow: "none",
        border: "2px solid #000000",
        borderRadius: 5,
        maxHeight: 1000,
        // transition: "box-shadow 200ms ease,transform 200ms ease",
        // "&:hover": {
        //   transform: "translate(-0.75rem, -0.25rem)",
        //   boxShadow: "8px 8px 0 !important",
        // },
        "& h2": {
          fontSize: "20px !important",
        },
      },
      "& .MuiButton-root": {
        borderRadius: 5,
        border: "2px solid #000000",
        maxWidth: "248px",
        width: "100%",
        textTransform: "none",
        transition: "box-shadow 200ms ease,transform 200ms ease",
        "&:hover": {
          transform: "translate(-0.75rem, -0.25rem)",
          boxShadow: "8px 8px 0 #000 !important",
        },
      },
      "& .MuiListItem-gutters": {
        paddingLeft: "0px !important",
      },
      "& .MuiAccordion-root": {
        boxShadow: "none",
        border: "2px solid #000000",
        borderRadius: 5,
      },
    },
    description: {
      fontSize: "13px",
      fontWeight: 400,
      textAlign: "center",
    },
    getPrice: {
      textAlign: "center",
      "& span:first-child": {
        fontSize: "20px",
      },
    },
    price: {
      fontSize: "50px !important",
      fontWeight: 600,
      textAlign: "center",
    },
    chooseDays: {
      fontSize: "15px !important",
      fontWeight: 600,
    },
    include: {
      fontSize: "15px !important",
      fontWeight: 600,
    },
    chooseTests: {
      fontSize: "16px !important",
      fontWeight: 600,
    },
    title: {
      fontSize: "44px",
      fontWeight: 600,
      color: "#000000",
      textTransform: "capitalize",
    },
    pricingContainer: {},
    horizontal: {
      width: "100%",
      margin: "0px",
      borderTop: "2px solid #000000",
    },
    getStarted: {
      backgroundColor: "#ffffff",
      color: "#000000",
      marginTop: 20,
    },
    upgrade: {
      marginTop: 20,
      backgroundColor: "#ed0008",
      color: "#ffffff",
      border: "none !important",
      "&:hover": {
        backgroundColor: "#ed0008",
      },
    },
    includeContent: {
      marginBottom: "20px !important",
    },
    upperContent: {
      textAlign: "center",
      "& div:first-child": {
        textAlign: "center",
      },
    },
    iconBook: {
      width: 80,
      marginTop: "15px",
    },
    iconReading: {
      width: 80,
      marginTop: "15px",
    },
    iconPencilPaper: {
      width: 65,
      marginTop: "15px",
    },
    sliderStyle: {
      padding: "35px 10px 0px",
    },
    green: {
      color: "green",
    },
    red: {
      color: "red",
    },
    redText: {
      textDecoration: "line-through"
    },
    responsiveUpperContent: {
      textAlign: "center",
      padding: 18,
    },
    responsiveMainContent: {
      padding: 18,
    },
  })
);

interface StateProps {
  cart: Array<any>;
  packs: Array<any>;
  loading: boolean;
  carts: any;
}

interface DispatchProps {
  saveOne: any;
  getPackages: any;
  getAll: any;
  changeQuantity: any;

}

interface MagicShopProps {
  title?: boolean;
  history?: any
}

type Props = MagicShopProps & StateProps & DispatchProps;

const NewMagicShop: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState<number>(0);
  const [bundleDayValue, setBundleDayValue] = useState<number>(0);
  const [bundleTestValue, setBundleTestValue] = useState<number>(0);
  const [testValue, setTestValue] = useState<number>(0);
  const [mockValue, setMockValue] = useState<number>(0);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [mocktestPack, setMockTestPack] = useState<any>(null);
  const [questionBankPack, setQuestionBankPack] = useState<any>(null);
  const [bundlePack, setBundlePack] = useState<any>(null);
  const [mockPrice, setMockPrice] = useState<number>(0);
  const [mockTestPackageID, setMockTestPackageID] = useState<number>(null);
  const [questionBankPackageID, setQuestionBankPackageID] = useState<number>(null);
  const [questionBankPrice, setQuestionBankPrice] = useState<number>(0);
  const [bundlePackageID, setBundlePackageID] = useState<number>(null);
  const [bundleBankPrice, setBundlePrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
  const [loading3, setLoading3] = useState<boolean>(false);

  const handleChangeAccordion =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleChangeQuestionBank = (event: any, newValue: any) => {
    const mark = questionBankMarks.filter(mark => mark.value === newValue)
    setQuestionBankPackageID(mark[0].packageId)
    setValue(newValue);
    questionBankPack.packageItems.map((item) => {
      if (item.subscriptionDays === newValue) {
        setQuestionBankPrice(item.cost);
      }
    });
  };

  const handleChangeDayBundle = (event: any, newValue: any) => {
    const mark = bundlePack.packageItems.filter(pack => (pack.subscriptionDays === newValue && pack.numberExamMock === bundleTestValue))
    if (mark.length > 0){
      setBundlePackageID(mark[0].id)
      setBundleDayValue(newValue)
      setBundlePrice(mark[0].cost)
    }
  };

  const handleChangeTestBundle = (event: any, newValue: any) => {
    const mark = bundlePack.packageItems.filter(pack => pack.subscriptionDays === bundleDayValue && pack.numberExamMock === newValue)
    if (mark.length > 0){
      setBundlePackageID(mark[0].id)
      setBundleTestValue(newValue)
      setBundlePrice(mark[0].cost)
    }
  };

  const handleChangeMockTest = (event: any, newValue: any) => {
    const mark = mockTestMarks.filter(mark => mark.value === newValue)
    setMockTestPackageID(mark[0].packageId)
    setMockValue(newValue);
    mocktestPack.packageItems.map((item) => {
      if (item.numberExamMock === newValue) {
        setMockPrice(item.cost);
      }
    });
  };

  const addItemToCart = async (packageId, type) => {
    setLoading(true)
    const carts = props.carts;

    if (carts.length > 0){
      carts.map(async cart => {
        if (cart.packInfo) {
          if (cart.packInfo.packageGroupId == mocktestPack.id && type == "mock_test" && cart.packInfo.id != mockTestPackageID) {
            await props.changeQuantity({...cart.data, quantity: 0});
          }
          if (cart.packInfo.packageGroupId == questionBankPack.id && type == "question_bank" && cart.packInfo.id != questionBankPackageID) {
            await props.changeQuantity({...cart.data, quantity: 0});
          }
          if (cart.packInfo.packageGroupId == bundlePack.id && type == "bundle" && cart.packInfo.id != bundlePackageID) {
            await props.changeQuantity({...cart.data, quantity: 0});
          }
        } else {
          await props.changeQuantity({...cart.data, quantity: 0});
        }
      })
    }

    const data = await props.saveOne({ quantity: 1, packageId: packageId });

    if (data){
      setLoading(false);
      props.history.push(
          `/platform/user/cart`
      );
    }
  };

  const addItemToCart2 = async (packageId, type) => {
    setLoading2(true)
    const carts = props.carts;

    if (carts.length > 0){
      carts.map(async cart => {
        if (cart.packInfo) {
          if (cart.packInfo.packageGroupId == mocktestPack.id && type == "mock_test" && cart.packInfo.id != mockTestPackageID) {
            await props.changeQuantity({...cart.data, quantity: 0});
          }
          if (cart.packInfo.packageGroupId == questionBankPack.id && type == "question_bank" && cart.packInfo.id != questionBankPackageID) {
            await props.changeQuantity({...cart.data, quantity: 0});
          }
          if (cart.packInfo.packageGroupId == bundlePack.id && type == "bundle" && cart.packInfo.id != bundlePackageID) {
            await props.changeQuantity({...cart.data, quantity: 0});
          }
        } else {
          await props.changeQuantity({...cart.data, quantity: 0});
        }
      })
    }

    const data = await props.saveOne({ quantity: 1, packageId: packageId });

    if (data){
      setLoading2(false);
      props.history.push(
          `/platform/user/cart`
      );
    }
  };

  const addItemToCart3 = async (packageId, type) => {
    setLoading3(true)
    const carts = props.carts;

    if (carts.length > 0){
      carts.map(async cart => {
        if (cart.packInfo) {
          if (cart.packInfo.packageGroupId == mocktestPack.id && type == "mock_test" && cart.packInfo.id != mockTestPackageID) {
            await props.changeQuantity({...cart.data, quantity: 0});
          }
          if (cart.packInfo.packageGroupId == questionBankPack.id && type == "question_bank" && cart.packInfo.id != questionBankPackageID) {
            await props.changeQuantity({...cart.data, quantity: 0});
          }
          if (cart.packInfo.packageGroupId == bundlePack.id && type == "bundle" && cart.packInfo.id != bundlePackageID) {
            await props.changeQuantity({...cart.data, quantity: 0});
          }
        } else {
          await props.changeQuantity({...cart.data, quantity: 0});
        }
      })
    }

    const data = await props.saveOne({ quantity: 1, packageId: packageId });

    if (data){
      setLoading3(false);
      props.history.push(
          `/platform/user/cart`
      );
    }
  };

  const dateTextValue = (value: number) => `${value} days`;
  const testTextValue = (value: number) => `${value} tests`;

  let title = true;
  if (props.title == false) {
    title = false;
  }

  let mockTestMarks = []
  if (mocktestPack != null){
    mocktestPack.packageItems
      .sort((a, b) => a.numberExamMock > b.numberExamMock ? 1 : -1)
      .map(item => {
      mockTestMarks.push({
        value : item.numberExamMock,
        packageId : item.id
      })
    })
  }

  let questionBankMarks = []
  if (questionBankPack != null){
    questionBankPack.packageItems
      .sort((a, b) => a.subscriptionDays > b.subscriptionDays ? 1 : -1)
      .map(item => {
      questionBankMarks.push({
        value : item.subscriptionDays,
        packageId : item.id
      })
    })
  }

  let bundleDayMarks = []
  let bundleTestMarks = []
  if (bundlePack != null){
    bundlePack.packageItems
      .sort((a, b) => a.subscriptionDays > b.subscriptionDays ? 1 : -1)
      .map(item => {

        if (bundleDayMarks.filter(b => b.value === item.subscriptionDays).length === 0){
          bundleDayMarks.push({
            value : item.subscriptionDays
          })
        }
      })


    bundlePack.packageItems
      .sort((a, b) => a.numberExamMock > b.numberExamMock ? 1 : -1)
      .map(item => {

        if (bundleTestMarks.filter(b => b.value === item.numberExamMock).length === 0){
          bundleTestMarks.push({
            value : item.numberExamMock
          })
        }
      })
  }

  useEffect(() => {
    if (mockTestMarks.length > 0){
      setMockTestPackageID(mocktestPack.packageItems[0].id)
      setMockPrice(mocktestPack.packageItems[0].cost)
    }
  },[mocktestPack])

  useEffect(() => {
    if (questionBankMarks.length > 0){
      setQuestionBankPackageID(questionBankPack.packageItems[0].id)
      setQuestionBankPrice(questionBankPack.packageItems[0].cost)
    }
  },[questionBankPack])

  useEffect(() => {
    if (bundleDayMarks.length > 0){
      bundlePack.packageItems
        .sort((a, b) => a.cost > b.cost ? 1 : -1)
      setBundlePrice(bundlePack.packageItems[0].cost)
      setBundlePackageID(bundlePack.packageItems[0].id)
      setBundleDayValue(bundleDayMarks[0].value)
      setBundleTestValue(bundleTestMarks[0].value)
    }
  },[bundlePack])


  useEffect(() => {
    props.getPackages();
  }, []);

  useEffect(() => {
    props.packs
      .filter((p) => p.name === "MOCK TEST")
      .map((filterPack) => setMockTestPack(filterPack));

    props.packs
      .filter((p) => p.name === "QUESTION BANK")
      .map((filterPack) => setQuestionBankPack(filterPack));

    props.packs
      .filter((p) => p.name === "BUNDLE")
      .map((filterPack) => setBundlePack(filterPack));

  }, [props.packs]);
  
  return (
    <div className={classes.root}>
      {title ? <h1 className={classes.title}>Pricing</h1> : ""}

      <Grid container spacing={3} className={classes.pricingContainer}>
        <Hidden smDown>
          <Grid item xs={4}>
            <Card>
              <CardContent className={classes.upperContent}>
                <div>
                  <h2>Question Bank</h2>
                  <p className={classes.description}>
                    Practice questions bank in 4 skills
                  </p>
                  <img
                    src={iconBook}
                    alt="question-bank"
                    className={classes.iconBook}
                  />
                </div>
                <div className={classes.getPrice} style={{ marginTop: 10 }}>
                  <span>AUD</span>
                  <span className={classes.price}>{questionBankPrice}</span>
                </div>
                <div className={classes.sliderStyle}>
                  <CustomSlider
                    name="days"
                    value={value}
                    onChange={handleChangeQuestionBank}
                    min={questionBankMarks.length > 0 ? questionBankMarks[0].value : 0}
                    max={questionBankMarks.length > 0 ? questionBankMarks[questionBankMarks.length - 1].value : 1}
                    step={null}
                    marks={questionBankMarks}
                    valueText={dateTextValue}
                  />
                </div>
                <Button
                    className={classes.getStarted}
                    onClick={() => addItemToCart(questionBankPackageID,"question_bank")}
                    disabled={loading}
                >
                  Purchase
                  {loading && (
                    <CircularProgress style={{position: "absolute",width:20,height:20}} />
                  )} 
                </Button>
              </CardContent>
              <hr className={classes.horizontal} />
              <CardContent className={classes.includeContent}>
                <p className={classes.include}>
                  Having packages of questions bank:
                </p>
                <List>
                  <ListItem>
                    <CheckIcon className={classes.green} />
                    <span>Full Access to Question Bank</span>
                  </ListItem>
                  <ListItem>
                    <CheckIcon className={classes.green} />
                    <span>AI scoring for Speaking</span>
                  </ListItem>
                  <ListItem>
                    <CheckIcon className={classes.green} />
                    <span>AI scoring for Writing</span>
                  </ListItem>
                  <ListItem>
                    <CheckIcon className={classes.green} />
                    <span>Check sample answers</span>
                  </ListItem>
                  <ListItem>
                    <ClearIcon className={classes.red} />
                    <span className={classes.redText}>AI Scored Mock Test</span>
                  </ListItem>
                  <ListItem>
                    <ClearIcon className={classes.red} />
                    <span className={classes.redText}>Full score report with details</span>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardContent
                className={classes.upperContent}
                style={{ backgroundColor: "#ffd000" }}
              >
                <div>
                  <h2>Bundle</h2>
                  <p className={classes.description}>
                    Questions and Mock tests bundle
                  </p>
                  <img
                    className={classes.iconReading}
                    src={iconReading}
                    alt="question-bank"
                  />
                </div>

                <div className={classes.getPrice}>
                  <span>AUD</span>
                  <span className={classes.price}>{bundleBankPrice}</span>
                </div>
                <div className={classes.sliderStyle}>
                  <CustomSlider
                    name="days"
                    value={bundleDayValue}
                    onChange={handleChangeDayBundle}
                    min={bundleDayMarks.length > 0 ? bundleDayMarks[0].value : 0}
                    max={bundleDayMarks.length > 0 ? bundleDayMarks[bundleDayMarks.length - 1].value : 1}
                    step={null}
                    marks={bundleDayMarks}
                    valueText={dateTextValue}
                  />
                </div>
                <div className={classes.sliderStyle}>
                  <CustomSlider
                    name="tests"
                    value={bundleTestValue}
                    onChange={handleChangeTestBundle}
                    min={bundleTestMarks.length > 0 ? bundleTestMarks[0].value : 0}
                    max={bundleTestMarks.length > 0 ? bundleTestMarks[bundleTestMarks.length - 1].value : 1}
                    step={null}
                    marks={bundleTestMarks}
                    valueText={testTextValue}
                  />
                </div>
                <Button
                  className={classes.upgrade}
                  onClick={() => addItemToCart2(bundlePackageID,"bundle")}
                  disabled={loading2}
                >
                  Purchase
                  {loading2 && (
                    <CircularProgress style={{position: "absolute",width:20,height:20}} />
                  )} 
                </Button>
              </CardContent>
              <hr className={classes.horizontal} />
              <CardContent className={classes.includeContent}>
                <p className={classes.include}>
                  Everything in questions bank and mocktest plus:
                </p>
                <List>
                <ListItem>
                    <CheckIcon className={classes.green} />
                    <span>Full Access to Question Bank</span>
                  </ListItem>
                  <ListItem>
                    <CheckIcon className={classes.green} />
                    <span>AI scoring for Speaking</span>
                  </ListItem>
                  <ListItem>
                    <CheckIcon className={classes.green} />
                    <span>AI scoring for Writing</span>
                  </ListItem>
                  <ListItem>
                    <CheckIcon className={classes.green} />
                    <span>Check sample answers</span>
                  </ListItem>
                  <ListItem>
                    <CheckIcon className={classes.green} />
                    <span>AI Scored Mock Test</span>
                  </ListItem>
                  <ListItem>
                    <CheckIcon className={classes.green} />
                    <span>Full score report with details</span>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardContent className={classes.upperContent}>
                <div>
                  <h2>Mock Test</h2>
                  <p className={classes.description}>
                    Package of PTE Mock Tests
                  </p>
                  <img
                    className={classes.iconPencilPaper}
                    src={iconPencilPapper}
                    alt="question-bank"
                  />
                </div>
                <div className={classes.getPrice}>
                  <span>AUD</span>
                  <span className={classes.price}>{mockPrice}</span>
                </div>
                <div className={classes.sliderStyle}>
                  <CustomSlider
                    name="tests"
                    value={mockValue}
                    onChange={handleChangeMockTest}
                    min={mockTestMarks.length > 0 ? mockTestMarks[0].value : 0}
                    max={mockTestMarks.length > 0 ? mockTestMarks[mockTestMarks.length - 1].value : 1}
                    step={null}
                    marks={mockTestMarks}
                    valueText={testTextValue}
                  />
                </div>
               <Button
                   className={classes.getStarted}
                    onClick={() => addItemToCart3(mockTestPackageID,"mock_test")}
                   disabled={loading3}
               >
                 Purchase
                  {loading3 && (
                     <CircularProgress style={{position: "absolute",width:20,height:20}} />
                  )} 
               </Button>
              </CardContent>
              <hr className={classes.horizontal} />
              <CardContent className={classes.includeContent}>
                <p className={classes.include}>
                  Multiple packages of mock tests:
                </p>
                <List>
                  <ListItem>
                    <CheckIcon className={classes.green} />
                    <span>AI Scored Practice Test</span>
                  </ListItem>
                  <ListItem>
                    <CheckIcon className={classes.green} />
                    <span>Full score report with details</span>
                  </ListItem>
                  <ListItem>
                    <ClearIcon className={classes.red} />
                    <span className={classes.redText}>Full Access to Question Bank</span>
                  </ListItem>
                  <ListItem>
                    <ClearIcon className={classes.red} />
                    <span className={classes.redText}>Check sample answers</span>
                  </ListItem>
                  <ListItem>
                    <ClearIcon className={classes.red} />
                    <span className={classes.redText}>AI Scoring for Speaking</span>
                  </ListItem>
                  <ListItem>
                    <ClearIcon className={classes.red} />
                    <span className={classes.redText}>AI Scoring for Writing</span>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <Grid item xs={12}>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChangeAccordion("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <h2>Questions bank</h2>
              </AccordionSummary>
              <div className={classes.responsiveUpperContent}>
                <div>
                  <h2>Question Bank</h2>
                  <p className={classes.description}>
                    Practice questions bank in 4 skills
                  </p>
                  <img
                    src={iconBook}
                    alt="question-bank"
                    className={classes.iconBook}
                  />
                </div>
                <div className={classes.getPrice} style={{ marginTop: 30 }}>
                  <span>AUD</span>
                  <span className={classes.price}>{questionBankPrice}</span>
                </div>
                <div>
                  <p className={classes.chooseDays}>Days</p>
                  <CustomSlider
                    name="days"
                    // labelColor="#fff"
                    value={value}
                    onChange={handleChangeQuestionBank}
                    min={questionBankMarks.length > 0 ? questionBankMarks[0].value : 0}
                    max={questionBankMarks.length > 0 ? questionBankMarks[questionBankMarks.length - 1].value : 1}
                    step={null}
                    marks={questionBankMarks}
                    valueText={dateTextValue}
                  />
                </div>
                <Link to="/platform/user/cart">
                  <Button
                    className={classes.upgrade}
                    style={{ marginBottom: 20 }}
                  >
                    Add to cart
                  </Button>
                </Link>
              </div>
              <hr className={classes.horizontal} />
              <div className={classes.responsiveMainContent}>
                <p className={classes.include}>
                  Having packages of questions bank:
                </p>
                <List>
                <ListItem>
                    <CheckIcon className={classes.green} />
                    <span>Full Access to Question Bank</span>
                  </ListItem>
                  <ListItem>
                    <CheckIcon className={classes.green} />
                    <span>AI scoring for Speaking</span>
                  </ListItem>
                  <ListItem>
                    <CheckIcon className={classes.green} />
                    <span>AI scoring for Writing</span>
                  </ListItem>
                  <ListItem>
                    <CheckIcon className={classes.green} />
                    <span>Check sample answers</span>
                  </ListItem>
                  <ListItem>
                    <ClearIcon className={classes.red} />
                    <span className={classes.redText}>AI Scored Mock Test</span>
                  </ListItem>
                  <ListItem>
                    <ClearIcon className={classes.red} />
                    <span className={classes.redText}>Full score report with details</span>
                  </ListItem>
                </List>
              </div>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Accordion
              style={{ backgroundColor: "#ffd000" }}
              expanded={expanded === "panel2"}
              onChange={handleChangeAccordion("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <h2>Bundle</h2>
              </AccordionSummary>
              <div className={classes.responsiveUpperContent}>
                <div>
                  <h2>Bundle</h2>
                  <p className={classes.description}>
                    Questions and Mock tests bundle
                  </p>
                  <img
                    className={classes.iconReading}
                    src={iconReading}
                    alt="question-bank"
                  />
                </div>

                <div className={classes.getPrice} style={{ marginTop: 22 }}>
                  <span>AUD</span>
                  <span className={classes.price}>{bundleBankPrice}</span>
                </div>
                <div>
                  <CustomSlider
                    name="days"
                    // labelColor="#fff"
                    value={bundleDayValue}
                    onChange={handleChangeDayBundle}
                    min={bundleDayMarks.length > 0 ? bundleDayMarks[0].value : 0}
                    max={bundleDayMarks.length > 0 ? bundleDayMarks[bundleDayMarks.length - 1].value : 1}
                    step={null}
                    marks={bundleDayMarks}
                    valueText={dateTextValue}
                  />
                </div>
                <div>
                  <CustomSlider
                    name="tests"
                    value={bundleTestValue}
                    onChange={handleChangeTestBundle}
                    min={bundleTestMarks.length > 0 ? bundleTestMarks[0].value : 0}
                    max={bundleTestMarks.length > 0 ? bundleTestMarks[bundleTestMarks.length - 1].value : 1}
                    step={null}
                    marks={bundleTestMarks}
                    valueText={testTextValue}
                  />
                </div>
                <Link to="/platform/user/cart">
                  <Button className={classes.upgrade}>Add to cart</Button>
                </Link>
              </div>
              <hr className={classes.horizontal} />
              <div className={classes.responsiveMainContent}>
                <p className={classes.include}>
                  Everything in questions bank and mocktest plus:
                </p>
                <List>
                <ListItem>
                    <CheckIcon className={classes.green} />
                    <span>Full Access to Question Bank</span>
                  </ListItem>
                  <ListItem>
                    <CheckIcon className={classes.green} />
                    <span>AI scoring for Speaking</span>
                  </ListItem>
                  <ListItem>
                    <CheckIcon className={classes.green} />
                    <span>AI scoring for Writing</span>
                  </ListItem>
                  <ListItem>
                    <CheckIcon className={classes.green} />
                    <span>Check sample answers</span>
                  </ListItem>
                  <ListItem>
                    <CheckIcon className={classes.green} />
                    <span>AI Scored Mock Test</span>
                  </ListItem>
                  <ListItem>
                    <CheckIcon className={classes.green} />
                    <span>Full score report with details</span>
                  </ListItem>
                </List>
              </div>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChangeAccordion("panel3")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <h2>Mock Test</h2>
              </AccordionSummary>
              <div className={classes.responsiveUpperContent}>
                <div>
                  <h2>Mock Test</h2>
                  <p className={classes.description}>
                    Package of PTE Mock Tests
                  </p>
                  <img
                    className={classes.iconPencilPaper}
                    src={iconPencilPapper}
                    alt="question-bank"
                  />
                </div>
                <div className={classes.getPrice} style={{ marginTop: 22 }}>
                  <span>AUD</span>
                  <span className={classes.price}>{mockPrice}</span>
                </div>
                <div>
                  <p className={classes.chooseTests}>Number of tests</p>
                  <CustomSlider
                    name="tests"
                    value={mockValue}
                    onChange={handleChangeMockTest}
                    min={mockTestMarks.length > 0 ? mockTestMarks[0].value : 0}
                    max={mockTestMarks.length > 0 ? mockTestMarks[mockTestMarks.length - 1].value : 1}
                    step={null}
                    marks={mockTestMarks}
                    valueText={testTextValue}
                  />
                </div>
                <Link to="/platform/user/cart">
                  <Button className={classes.getStarted}>Add to cart</Button>
                </Link>
              </div>
              <hr className={classes.horizontal} />
              <div className={classes.responsiveMainContent}>
                <p className={classes.include}>
                  Multiple packages of mock tests:
                </p>
                <List>
                <ListItem>
                    <CheckIcon className={classes.green} />
                    <span>AI Scored Practice Test</span>
                  </ListItem>
                  <ListItem>
                    <CheckIcon className={classes.green} />
                    <span>Full score report with details</span>
                  </ListItem>
                  <ListItem>
                    <ClearIcon className={classes.red} />
                    <span className={classes.redText}>Full Access to Question Bank</span>
                  </ListItem>
                  <ListItem>
                    <ClearIcon className={classes.red} />
                    <span className={classes.redText}>Check sample answers</span>
                  </ListItem>
                  <ListItem>
                    <ClearIcon className={classes.red} />
                    <span className={classes.redText}>AI Scoring for Speaking</span>
                  </ListItem>
                  <ListItem>
                    <ClearIcon className={classes.red} />
                    <span className={classes.redText}>AI Scoring for Writing</span>
                  </ListItem>
                </List>
              </div>
            </Accordion>
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ cart, pack }: IRootState) => {
  return {
    cart: cart.cart,
    loading: cart.loading,
    packs: pack.packs,
    carts: cart.carts
  };
};

const mapDispatchToProps = {
  saveOne,
  getPackages,
  getAll,
  changeQuantity
};

export default connect<StateProps, DispatchProps, MagicShopProps>(
  mapStateToProps,
  mapDispatchToProps
)(NewMagicShop);
