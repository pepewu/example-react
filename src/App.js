import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';

import Sidebar from './components/Sidebar/Sidebar';
import AddArticle from './containers/AddArticle/AddArticle';
import Today from './components/Today/Today';
import ListAll from './containers/ListAll/ListAll';
import Messanger from './containers/Messanger/Messanger';

import axios from 'axios';

class App extends Component {
    state = {
        articles: null,
        favourites: null,
        loading: true,
        messangerMessage: ''
    }

    componentWillMount = () => {
        this.getArticles();
    }

    getArticles = () => {
        axios.get('https://front-end-daily.firebaseio.com/articles.json')
            .then(response => {this.prepareArticles(response.data)})
            .catch(error => {
                this.setState({
                    loading: false
                });
            });
    }

    prepareArticles = (data) => {
        const articles = Object.keys(data)
            .map(id => {
                return {
                    ...data[id],
                    id: id
                }
            })
            .sort((prev, next) => prev.day > next.day);
        
        this.setState({
            articles: articles,
            loading: false
        });
    }

    deleteItem = (id) => {
        const afterDelete = this.state.articles.filter(article => article.id !== id);
        this.setState({
            articles: afterDelete
        });
        axios.delete(`https://front-end-daily.firebaseio.com/articles/${id}.json`)
            .then(response => console.log(response))
            .catch(erroe => console.log(erroe));
    }

    toggleRead = (id) => {
        const afterToggle = [...this.state.articles];
        const index = afterToggle.findIndex(article => article.id === id);
        const updatedArticle = {
            ...afterToggle[index],
            unread: !afterToggle[index].unread
        }
        afterToggle.splice(index, 1, updatedArticle);
        this.setState({
            articles: afterToggle
        });
        axios.patch(`https://front-end-daily.firebaseio.com/articles/${id}.json`, {
            unread: updatedArticle.unread
        })
            // .then(response => console.log(response))
            // .catch(erroe => console.log(erroe));
    }

    postMsg = (msg) => {
        this.setState({ messangerMessage: msg});
    }

    render() {
        return (
            <main className="app">
                <div className="l-sidebar">
                    <Sidebar />
                </div>

                <div className="l-content" id="itemList">
                    <div className="items">
                        <Switch>
                            <Route path="/add" render={(props) => <AddArticle
                                {...props}
                                triggerFetchArticles={this.getArticles}
                                articles={this.state.articles}
                                postMsg={this.postMsg} />}
                            />

                            <Route path="/all" render={() => {
                                return this.state.articles
                                    ? <ListAll articles={this.state.articles} deleteItem={this.deleteItem} toggleRead={this.toggleRead} />
                                    : <h1>Loading...</h1>
                            }} />

                            <Route path="/" exact render={() => {
                                return this.state.articles
                                    ? <Today articles={this.state.articles} toggleRead={this.toggleRead} />
                                    : <h1>Loading...</h1>
                            }} />
                            <Route render={() => <h1>404</h1>} />
                        </Switch>
                    </div>
                </div>

                <Messanger msg={this.state.messangerMessage} />
            </main>
        );
    }
}

export default App;
