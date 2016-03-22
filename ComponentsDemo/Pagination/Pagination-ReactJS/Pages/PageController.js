import React, { Component, PropTypes } from 'react';

class PageController extends Component{
  constructor(props) {
    super(props);
  }

  onPageClick() {
    if(this.props.current || !this.props.canClick){
      return false
    }
    let page = this.props.pageNumber;
    this.props.onPageClick(page);
  }

  render() {
    let pageClass = "footer__page ";
    if(this.props.current){
      pageClass += 'footer__page--active';
    }
    return (
      <div className={pageClass} onClick={this.onPageClick.bind(this)}>{this.props.data}</div>
    );
  }
}

export default PageController;
