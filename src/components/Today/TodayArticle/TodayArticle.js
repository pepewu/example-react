import React from 'react';

const article = (props) => {
    return (
        <article className="todayArticle">
            <h2 className="todayArticle__title"><a href={props.data.url} target="_blank">{props.data.title}</a></h2>
            {props.data.description ? <p className="todayArticle__description">{props.data.description}</p> : null}

            {props.data.unread ? (
                <div className="todayArticle__tools formField">
                    <button onClick={() => props.onReadToggle(props.data.id)}>
                        <i className="icon-ok"></i> Mark as read
                    </button>
                </div>
            ) : null}
                
        </article>
    );
};

export default article;