import React from 'react';
import TodayArticle from './TodayArticle/TodayArticle';
import { getMonthName } from '../../utils';

const today = (props) => {
    const now = new Date();
    let y = now.getFullYear();
    let m = now.getMonth() + 1;
    let d = now.getDate();

    if (m <= 9) m = '0' + m;
    if (d <= 9) d = '0' + d;
    let nowStamp = new Date(`${y}-${m}-${d}T00:00`).getTime();

    let articles = props.articles
        .filter(article => {
            return article.day === nowStamp;
        }) 
        .map(article => (
            <TodayArticle key={article.url} data={article} onReadToggle={props.toggleRead} />
        ));


    return (
        <div>
            <div className="calendarCard">
                <span className="calendarCard__month">{getMonthName(now.getMonth())}</span>
                <span className="calendarCard__day">{now.getDate()}</span>
                <span className="calendarCard__year">{y}</span>
            </div>

            {articles.length ? articles : <p style={{textAlign: 'center'}}>No articles found for today</p>}
        </div>
    );
};

export default today;