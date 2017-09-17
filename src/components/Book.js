import React, {Component} from "react";
import BookData from "../entities/BookData";

export default class Book extends Component {
    render() {


        const props = this.props;
        const bookData : BookData = props.book;
        const onShelfChange = function(event) { props.onShelfChange(bookData, event.target.value) };
        console.log("Called Book = "+bookData.id+", "+bookData.shelf+" render !");

        return <div className="book">
            <div className="book-top">
                {bookData.smallThumbnailUrl && <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+bookData.smallThumbnailUrl+'")' }}></div>}
                <div className="book-shelf-changer">
                    <select value={bookData.shelf} onChange={onShelfChange}>
                        <option value="moveto" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="haveRead">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{bookData.title}</div>
            {bookData.authors && <div className="book-authors">{bookData.authors.join(", ")}</div>}
        </div>

    }


}

