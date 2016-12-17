import React from 'react';

export default class SearchChannel extends React.Component {
    handleSearch() {
        let searchText = this.refs.searchInput.value.toLowerCase();
        
        this.props.onSearch(searchText);
    }
    render() {
        return (
            <div>
                <input
                    type="search"
                    placeholder="Search Channels"
                    className="search-channel"
                    ref="searchInput"
                    onChange={this.handleSearch.bind(this)}
                />
            </div>
        );
    }
}