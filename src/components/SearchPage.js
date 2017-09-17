import React, {Component} from "react";
import {Link} from "react-router-dom";
import SearchResults from "./SearchResults";
import {search} from "../BooksAPI";
import {turnBooksFromServerToBookData} from "../App";

export default class SearchPage extends Component {
    state = {
        query: '',
        books: []
    };

    onQueryUpdate = event => {

        const query = event.target.value.trim();
        const searchPage = this;


        this.setState(state => {
            return {query:query, books:state.books}
        });

        _searchBooks(query, 1000).then(books => {
            searchPage.setState(state => {
                return {state:state.query, books:books}
            });
        });

    };

    _getBooksWithUpdatedShelfs() {
        function _getBookIdToShelfPositionMap(books: Array<BookData>) : any {
            const result = {};
            books.forEach(book => result[book.id] = book.shelf);
            return result;
        }

        const onShelves = this.props.onShelves;
        const shelfPositionMap = _getBookIdToShelfPositionMap(onShelves);
        return this.state.books.map(book => {
            if (shelfPositionMap.hasOwnProperty(book.id)) {
                book.shelf = shelfPositionMap[book.id];
            } else {
                book.shelf = "none";
            }
            return book;
        });
    }

    render() {
        console.log("Call SearchPage render !");
        const query = this.state.query;
        const books = this.state.books;
        const onShelfChange = this.props.onShelfChange;


        return <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" value={query}
                           onChange={this.onQueryUpdate}/>
                </div>
            </div>
            <SearchResults onShelfChange={onShelfChange} books={this._getBooksWithUpdatedShelfs()}/>
        </div>

    }

}

function _searchBooks(query: string): Promise<Array<BookData>> {
    return search(query, 100).then(books => turnBooksFromServerToBookData(books))
}