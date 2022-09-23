import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import styles from "./styles/ColorBoxStyles"
import classNames from "classnames";
import { withStyles } from "@material-ui/styles";

class ColorBox extends Component 
{
  constructor(props) 
  {
    super(props);
    this.state = { copied: false };
    this.changeCopyState = this.changeCopyState.bind(this);
  }
  
  changeCopyState() 
  {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }
  
  render() 
  {
    const { name, background, moreUrl, showingFullPalette, classes } = this.props;
    const { copied } = this.state;

    return (
        <div style={{ background }} className={classes.colorBox}>
          <div
            style={{ background }}
            className={classNames(classes.copyOverlay, {
              [classes.showOverlay]: copied
            })}
          />
          
          <div
            className={classNames(classes.copyMessage, {
              [classes.showMessage]: copied
            })}
          >
            <h1>Copied To Clipboard</h1>
            <p className={classes.copyText}>
              {background}
            </p>
          </div>
          
          <div className={classes.boxContent}>
            <span className={classes.colorName}>
              {name}
            </span>
          </div>
            
          <CopyToClipboard text={background} onCopy={this.changeCopyState}>
            <button className={classes.copyButton}>Copy</button>
          </CopyToClipboard>

          {showingFullPalette && (
            <Link to={moreUrl} onClick={e => e.stopPropagation()}>
              <span className={classes.seeMore}>More</span>
            </Link>
          )}
        </div>
    );
  }
}

export default withStyles(styles)(ColorBox);