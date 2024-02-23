import React, { useState } from 'react';
import {Grid} from "@material-ui/core";
export default class MockTestIntroHeader extends React.Component<any, any> {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <>
        <Grid className="mkt-into-header-top">
          <Grid className="mkt-intro-header-container">
            <Grid className="mkt-into-header-name">
              <h2 style={{color: "white"}}>PTE MAGIC MOCK TEST</h2>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="mkt-into-header-bottom">
        </Grid>
      </>
    );
  }
}
