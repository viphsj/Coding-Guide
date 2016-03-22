import React, { Component, PropTypes } from 'react';
import {
  MAX_PAGE,
  SIDE_PAGE
} from '../ConstValue';


class Pages extends Component{
  constructor(props) {
    super(props);
  }

  onPageClick(page) {
    this.props.onPageChange(page);
  }

  render() {
    let currentPage = this.props.currentPage, pageNum = this.props.pageNum, pages;

    let array = new Array(pageNum).fill(1); // it seems IE brower doesn't support this function.
    // if it unfortunately happened, you can use underscore instead of 'fill'
    // import _  from 'underscore';
    // let array = _.range(pageNum);

    if(pageNum <= MAX_PAGE) {
      pages = array.map((value, index) => {
        let current = false, realPage = index + 1;
        if(realPage == currentPage){
          current = true;
        }
        return (
          <PageController data={realPage} key={index} pageNumber={realPage}
             onPageClick={this.onPageClick.bind(this)}
            current={current} canClick={true}/>
        )
      });
    }else {

      pages = array.map((value, index) => {
        let current = false, realPage = index + 1, sidePage = SIDE_PAGE + 2;
        if(realPage == currentPage){
          current = true;
        }
        if(currentPage <= sidePage){
          if(realPage < currentPage + sidePage){
            return (
              <PageController data={realPage} pageNumber={realPage}
                 key={index} onPageClick={this.onPageClick.bind(this)}
                current={current} canClick={true}/>
            )
          }
        }else {
          if(realPage == currentPage - sidePage){
            return (
              <PageController data={"首页"} key={index}
                pageNumber={1}
                onPageClick={this.onPageClick.bind(this)}
                current={current} canClick={true}/>
            )
          }else if (realPage == (currentPage - (sidePage - 1))) {
            return (
              <PageController data={"..."}
                 key={index} onPageClick={this.onPageClick.bind(this)}
                current={current} canClick={false}/>
            )
          }else if (realPage > (currentPage -(sidePage - 1)) && realPage < (currentPage + sidePage)) {
            return (
              <PageController data={realPage} pageNumber={realPage}
                 key={index} onPageClick={this.onPageClick.bind(this)}
                current={current} canClick={true}/>
            )
          }
        }

        if(realPage == currentPage + sidePage){
          return (
            <PageController data={"..."} key={index}
              onPageClick={this.onPageClick.bind(this)}
              current={current} canClick={false}/>
          )
        }
        if(realPage == currentPage + (sidePage + 1)){
          return (
            <PageController data={"尾页"} key={index} pageNumber={pageNum}
              onPageClick={this.onPageClick.bind(this)}
              current={current} canClick={true}/>
          )
        }
      });
    }

    return (
      <div className="page_footer">
        <div className="page_footer_container">
          {pages}
        </div>
      </div>
    )
  }
}

export default Pages;
