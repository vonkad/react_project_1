import React, {Component} from "react";
import BookShelf from "./BookShelf";
import {Link} from "react-router-dom";

export default class MainPage extends Component {
    render() {
        const allBooksOnShelves: BookData[] = this.props.onShelves;
        const onShelfChange = this.props.onShelfChange;


        return <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <BookShelf shelfName="Currently Reading"
                               onShelfChange={onShelfChange}
                               books={allBooksOnShelves.filter(bookData => bookData.shelf === "currentlyReading")}/>
                    <BookShelf shelfName="Want To Read"
                               onShelfChange={onShelfChange}
                               books={allBooksOnShelves.filter(bookData => bookData.shelf === "wantToRead")}/>
                    <BookShelf shelfName="Have Read"
                               onShelfChange={onShelfChange}
                               books={allBooksOnShelves.filter(bookData => bookData.shelf === "haveRead")}/>
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    }

}