import React from "react";
import "./App.css";
import "./entities/BookData";
import "./components/MainPage";
import {Route} from "react-router-dom";
import MainPage from "./components/MainPage";
import BookData from "./entities/BookData";
import {getAll, update} from "./BooksAPI";
import SearchPage from "./components/SearchPage";

export default class BooksApp extends React.Component {
    state = {
        books: []
    };

    componentDidMount() {
        _refreshAllBooksOnMyShelvesFromServer().then(books =>
            this.setState({books})
        )
    }

    render() {
        console.log("Called BooksApp render !");
        return (
            <div className="app">
                <Route exact path="/" render={() => <MainPage onShelfChange={this.onShelfChange}
                                                              onShelves={this.state.books}/>}/>
                <Route path="/search" render={() => <SearchPage onShelfChange={this.onShelfChange}
                                                                onShelves={this.state.books}/>}/>
            </div>
        )
    }

    onShelfChange = (bookData: BookData, targetShelf: string) => {
        const booksOnShelves = this.state.books;

        function isUpdatedBookInTheList(updatedBook) {
            for (const bookOnShelve of booksOnShelves) {
                if (bookOnShelve.id === updatedBook.id) {
                    return true;
                }
            }
            return false;
        }


        /// can send bookData to update, since it has the id property ...
        update(bookData, _getServerPlacementCodeFromOurs(targetShelf))
            .then(whatever => {
                if (isUpdatedBookInTheList(bookData)) {
                    bookData.shelf = targetShelf;
                    this.setState(state => {
                        return {books: state.books.map(book => book.id === bookData.id ? bookData : book)}
                    });
                } else {  // refresh the list
                    _refreshAllBooksOnMyShelvesFromServer().then(books =>
                        this.setState({books: books})
                    )
                }
            });


    }

}


export function turnBooksFromServerToBookData(books: Array<Object>): Array<BookData> {
    const result = [];
    if (books instanceof Array) {
        for (const book of books) {
            if (book && book.id) {
                result[result.length] = new BookData(book.id, book.title, book.authors, book.imageLinks ? book.imageLinks.smallThumbnail : null, _getOurPlacementCodeFromServers(book.shelf));
            }
        }
    }
    return result;
}

function _refreshAllBooksOnMyShelvesFromServer(): Promise<BookData[]> {
    return getAll().then(books => turnBooksFromServerToBookData(books))
}

function _getOurPlacementCodeFromServers(code) {
    return code === "read" ? "haveRead" : code;
}

function _getServerPlacementCodeFromOurs(code) {
    return code === "haveRead" ? "read" : code;
}


