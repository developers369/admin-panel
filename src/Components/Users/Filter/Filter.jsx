import React, { Component } from 'react';
import Button from '../../../ReusableComponent/Button';
import SelectTag from '../../../ReusableComponent/SelectTag';
import "./Filter.scss"

let optionArrayForSort = ["--SELECT--", "Name", "Email", "Contact"]
let optionArrayForFilter = ["--SELECT--", "Today", "Yesterday"]

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        console.log("sort", this.props.sort);
        console.log("filter", this.props.filter);
    }

    render() { 
        console.log("sort", this.props.sort);
        console.log("filter", this.props.filter);
        return ( 
            <div className="filter-container">

                <div className="filter-content">
                    <div className="filter-select-tag">
                        <div className="filter-field-div">
                            <label className="filter-label">Sort by</label>
                            <SelectTag 
                                selectId="sort"
                                selectClass="selectTag"
                                selectValue={this.props.sort}
                                optionArray={optionArrayForSort}
                                onChange={this.props.handleSort}
                            />
                        </div>

                        <div className="filter-field-div">
                            <label className="filter-label">Filter</label>
                            <SelectTag 
                                selectId="filter"
                                selectClass="selectTag"
                                selectValue={this.props.filter}
                                optionArray={optionArrayForFilter}
                                onChange={this.props.handleFilter}
                            />
                        </div>
                    </div>

                    <div className="filter-action-button">
                        <Button
                            btnclass="apply-btn"
                            btnName="Apply"
                            onClick={this.props.handleApply}
                        />
                        <Button
                            btnclass="clear-btn"
                            btnName="Clear"
                            onClick={this.props.handleClear}
                        />

                        
                    </div>
                </div>

            </div>
        );
    }
}
 
export default Filter;