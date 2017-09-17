import React, {Component} from "react";
import BookData from "../entities/BookData";
import Book from "./Book";

export default class SearchResults extends Component {
    render() {
        const booksData: BookData[] = this.props.books;
        const onShelfChange = this.props.onShelfChange;

        return <div className="search-books-results">
            <ol className="books-grid">{booksData.map(bookData => <li key={"search-" + bookData.id}><Book
                onShelfChange={onShelfChange} book={bookData}/></li>)}</ol>
        </div>
    }
}