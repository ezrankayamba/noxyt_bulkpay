import React, {Component} from 'react';

class Pagination extends Component {
    render() {
        const {pageNo, pages, onPageChange} = this.props
        let pList = []
        let from = pageNo - 2 > 1 ? pageNo - 2 : 1
        let to = from + 5 < pages ? from + 5 : pages
        for (let i = from; i <= to; i++) {
            pList.push(i)
        }
        return (
            <div className="border-top pt-2">
                <div className="btn-group">
                    {pageNo > 1 && <>
                        <button className="btn btn-sm btn-outline-info pl-3 pr-3" onClick={() => onPageChange(1)}>First</button>
                        <button className="btn btn-sm btn-outline-info pl-3 pr-3" onClick={() => onPageChange(pageNo - 1)}>Previous
                        </button>
                    </>}
                    {pList.map(p => <button key={p}
                                            className={`${p === pageNo ? 'active ' : ''}btn btn-sm btn-outline-info pl-3 pr-3`}
                                            onClick={() => onPageChange(p)}>{p}</button>)}
                    {pageNo !== pages && <>
                        <button className="btn btn-sm btn-outline-info pl-3 pr-3" onClick={() => onPageChange(pageNo + 1)}>Next
                        </button>
                        <button className="btn btn-sm btn-outline-info pl-3 pr-3" onClick={() => onPageChange(pages)}>Last</button>
                    </>}
                </div>
            </div>
        );
    }
}

export default Pagination;