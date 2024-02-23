// import React from "react";
// import { withRouter, Link } from "react-router-dom";

// //material-ui/core
// import Grid from "@material-ui/core/Grid";
// import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
// import Skeleton from "@material-ui/lab/Skeleton";

// // // @ts-ignore
// // import present from "../../../../assets/img/gif/present.gif"
// // // @ts-ignore
// // import contacts from "../../../../assets/img/gif/contacts.gif"
// // // @ts-ignore
// // import click from "../../../../assets/img/gif/click.gif"
// const rocket = require("assets/img/gif/rocket.gif")
// const flipcard = require("assets/img/gif/flipcard.gif")
// const shufflecard = require("assets/img/gif/shufflecard.gif")
// const hangman = require("assets/img/gif/hangman.gif")

// const BadgeCode = (props) => {
//   return (
//     <>
//       <Grid
//         container
//         direction="row"
//         spacing={1}
//         style={{ alignItems: "center", display: "flex" }}
//       >
//         <Grid item>
//           <div className="category-shortname">
//             Game
//           </div>
//         </Grid>
//         <Grid item>
//           <div className="type-name">Vocabs</div>
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// const QuestionBankCard = (props) => {
//   return (
//     <>
//         <div className="card-game">
//           <Link to={props.url}>
//             <Card className="element-card-question">
//               <Grid container className="card-question-practice">
//                 <Grid item xs={12} className="text-uppercase text-dark mb-0">
//                   <BadgeCode/>
//                   <div className="category-name-title">{props.name}</div>
//                   <div
//                     style={{
//                       textTransform: "none",
//                       display: "flex",
//                       flexDirection: "row",
//                     }}
//                   >
//                     <div style={{ paddingRight: 5 }}>
//                       <FiberManualRecordIcon className="dot-small" />
//                       <FiberManualRecordIcon className="dot-small" />
//                       <FiberManualRecordIcon className="dot-small" />
//                     </div>
//                   </div>
//                 </Grid>
//               </Grid>
//               <div className="card-image">
//                 <img src={props.img} alt="" style={{width: "100%", height: "260px"}}/>
//               </div>
//             </Card>
//           </Link>
//         </div>
//     </>
//   );
// };

// function Games() {
//     return (
//       <>
//         <div className="mt--11 container-fluid">
//           <Grid container direction="column">
//             <Grid item>
//               <div className="col game-header">
//                 <h3 className="question-title">Battle Games</h3>
//                 <span>
//                   <img src={rocket} alt="" width={100}/>
//                 </span>
//               </div>
//             </Grid>
//             <Grid item>
//                 <>
//                   <div className="practice-question-bank">
//                     <QuestionBankCard
//                       url="/platform/user/games/shufflecard"
//                       name="Shuffle Card"
//                       img={shufflecard}
//                     />
//                     <QuestionBankCard
//                       url="/platform/user/games/flipcard"
//                       name="Flip Card"
//                       img={flipcard}
//                     />
//                     <QuestionBankCard
//                       url="/platform/user/games/hangman"
//                       name="Hang Man"
//                       img={hangman}
//                     />
//                   </div>
//                 </>
//               {/*)}*/}
//             </Grid>
//           </Grid>
//         </div>
//       </>
//     );
// }

// export default withRouter(Games);
