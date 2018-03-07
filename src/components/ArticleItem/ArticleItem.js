import React from 'react';
import { dateFromTimestamp } from '../../utils';

const item = (props) => {
    const dateString = dateFromTimestamp(props.article.day);
    const iconType = props.article.unread ? 'icon-ok' : 'icon-doc-text';

    return (
        <article className="listItem">
            <h2 className="listItem__title">
                <a href={props.article.url} target="_blank">
                    {props.article.title}
                </a>
            </h2>
            
            <ul className="listItem__tools">
                <li>
                    <i className="icon-clock"></i>
                    <time>{dateString}</time>
                </li>
                <li onClick={props.onReadToggle} className="link" role="button">
                    <i className={iconType}></i>
                    mark as {props.article.unread ? 'read' : 'unread'}
                </li>
                <li onClick={props.onDelete} className="link" role="button">
                    <i className="icon-cancel"></i>delete
                </li>
            </ul>
        </article>
    );
}

export default item;