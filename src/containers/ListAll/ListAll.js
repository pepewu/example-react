import React, { Component } from 'react';
import ArticleItem from '../../components/ArticleItem/ArticleItem';

class All extends Component {
    state = {
        filter: 'all',
        filteredArticles: this.props.articles,
        search: null
    }

    searchTimer = null;

    setFilter = (filter, search, articles = this.props.articles) => {
        let filteredArticles = [];
        let term = search;

        if (search === null) {
            term = this.state.search
        }

        if (search !== null && search.length < 3) {
            term = '';
        }

        switch (filter) {
            case 'all':
                filteredArticles = [...articles];
                break;
            case 'unread':
                filteredArticles = articles.filter(article => article.unread);
                break;
            case 'read':
                filteredArticles = articles.filter(article => !article.unread);
                break;
            default:
                filteredArticles = articles;
                break;
        }

        if (term) {
            filteredArticles = filteredArticles
                .filter(article => article.title.toLowerCase().indexOf(term) !== -1);
        }

        this.setState({
            filter: filter,
            filteredArticles: filteredArticles,
            search: term
        });
    }

    searchHandler = (term) => {
        clearTimeout(this.searchTimer);
        this.searchTimer = setTimeout(() => {
            this.setFilter(this.state.filter, term, this.props.articles);
        }, 500);
    }

    componentWillReceiveProps = (newProps) => {
        this.setFilter(this.state.filter, this.state.search, newProps.articles);
    }

    render() {
        if (!this.props.articles.length) return <p>No articles</p>;

        const articles = this.state.filteredArticles
            .map(article => {
                return <ArticleItem
                    key={article.id}
                    onDelete={() => this.props.deleteItem(article.id)}
                    onReadToggle={() => this.props.toggleRead(article.id)}
                    article={article} />
            });
        
        return (
            <div>
                <header className="pageHeader">
                    <h1>Articles list</h1>
                </header>

                <nav className="filters">
                    <ul>
                        <li
                            className={this.state.filter === 'all' ? 'active' : null}
                            onClick={() => this.setFilter('all', null)}
                        >All</li>
                        <li
                            className={this.state.filter === 'unread' ? 'active' : null}
                            onClick={() => this.setFilter('unread', null)}
                        >Unread</li>
                        <li
                            className={this.state.filter === 'read' ? 'active' : null}
                            onClick={() => this.setFilter('read', null)}
                        >Read</li>
                    </ul>
                </nav>

                <div className="formField">
                    <input type="text" placeholder="Search by title&hellip;" onChange={(e) => this.searchHandler(e.target.value)} />
                </div>

                {articles}
            </div>
        );
    }
};

export default All;