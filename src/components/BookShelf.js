import React, {Component} from "react";
import BookData from "../entities/BookData";
import Book from "./Book";

export default class BookShelf extends Component {
    render() {
        const shelfName: string = this.props.shelfName;
        const bookDatas: BookData[] = this.props.books;
        const onShelfChange : ((bookData: BookData, targetShelf: string) => void) = this.props.onShelfChange;

        return <div className="bookshelf" key={shelfName.replace(' ','')}>
            <h2 className="bookshelf-title">{shelfName}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">{bookDatas.map(bookData => <li key={bookData.id}><Book onShelfChange={onShelfChange} book={bookData}/></li>)}</ol>
            </div>
        </div>
    }
}