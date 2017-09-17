export type Shelf = "wantToRead" | "currentlyReading" | "haveRead" | "none";

export default class BookData {
    constructor(id: string, title: string, authors: string[], smallThumbnailUrl: String, shelf: Shelf) {
        this.id = id;
        this.title = title;
        this.authors = authors;
        this.smallThumbnailUrl = smallThumbnailUrl;
        this.shelf = shelf;
    }

    id: string;
    title: string;
    authors: string[];
    shelf: Shelf;
    smallThumbnailUrl: string;
}