export type Author = {
    _id: string;
    firstName: string;
    secondName: string;
    avatar: string;
}

export type Article = {
    _id: string;
    author: Author;
    likes: string[];
    reposts: string[];
    bookmarks: string[];
    commentsCount: number;
    createdAt: Date;
    updatedAt: Date;
    text?: string;
    images?: string[];
    repostedArticle?: Article;
}

export type GetArticlesDto = {
    data: Article[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
}