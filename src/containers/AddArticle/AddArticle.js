import React, { Component } from 'react';
import axios from 'axios';
import Datepicker from '../Datepicker/Datepicker';
import { dateFromTimestamp } from '../../utils';

class AddArticle extends Component {
    state = {
        fields: {
            day: {
                atts: {
                    type: 'text',
                    value: '',
                    placeholder: 'Day (YYYY-MM-DD)',
                },
                validation: {
                    required: true,
                    pattern: '(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))'
                },
                touched: false,
                valid: false
            },
            title: {
                atts: {
                    type: 'text',
                    value: '',
                    placeholder: 'Article title',
                },
                validation: {
                    required: true
                },
                touched: false,
                valid: false
            },
            description: {
                atts: {
                    type: 'text',
                    value: '',
                    placeholder: 'Short description',
                },
                validation: {},
                touched: false,
                valid: true
            },
            url: {
                atts: {
                    type: 'url',
                    value: '',
                    placeholder: 'URL',
                },
                validation: {
                    required: true,
                    pattern: '^(ftp|http|https)://[^ "]+$'
                },
                touched: false,
                valid: false
            }
        },
        formIsValid: false,
        loading: false
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('https://front-end-daily.firebaseio.com/articles.json', {
            day: new Date(this.state.fields.day.atts.value + 'T00:00').getTime(),
            title: this.state.fields.title.atts.value,
            description: this.state.fields.description.atts.value,
            url: this.state.fields.url.atts.value,
            unread: true
        }).then(response => {
            this.props.triggerFetchArticles();
            this.props.history.push('/all');
            this.props.postMsg(<span>Added <strong>{this.state.fields.title.atts.value}</strong></span>);
        });
    }

    checkValidity = (value = '', rules = {}) => {
        let isValid = true;

        if (rules.required) {
            isValid = (value.length ? true : false) && isValid;
        }

        if (rules.pattern) {
            isValid = value.match(rules.pattern) && isValid
        }
        return isValid;
    }

    onFieldChange = (e, field) => {
        let updatedForm = {
            ...this.state.fields
        }

        let updatedField = updatedForm[field];
        let formIsValid = true;

        updatedField.atts.value = e.target.value;
        updatedField.touched = true;
        updatedField.valid = this.checkValidity(e.target.value, updatedField.validation);
        updatedForm[field] = updatedField;

        for (let field in updatedForm) {
            formIsValid = updatedForm[field].valid && formIsValid;
        }

        this.setState({
            fields: updatedForm,
            formIsValid: formIsValid
        });
    }

    pickDateHandler = (e, timestamp) => {
        if (!timestamp) return;
        this.setState({
            fields: {
                ...this.state.fields,
                day: {
                    ...this.state.fields.day,
                    valid: true,
                    touched: true,
                    atts: {
                        ...this.state.fields.day.atts,
                        value: dateFromTimestamp(timestamp),
                    }
                }
            }
        });
    }

    render() {
        const fields = Object.keys(this.state.fields)
            .map(field => (
                <div key={field} className="formField">
                    <input
                        {...this.state.fields[field].atts}
                        className={(!this.state.fields[field].valid && this.state.fields[field].touched) ? 'error' : null}
                        onChange={(e) => this.onFieldChange(e, field)} />
                </div>
            ));

        return (
            <form onSubmit={this.onSubmitHandler} noValidate>
                <header className="pageHeader">
                    <h1>Add new article</h1>
                </header>

                <Datepicker articles={this.props.articles} pickDate={this.pickDateHandler} />

                {fields}

                <div className="formField">
                    <button type="submit" disabled={!this.state.formIsValid}>Add article</button>
                </div>
            </form>
        );
    }
}

export default AddArticle;