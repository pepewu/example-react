import React, { PureComponent } from 'react';
import DatepickerRow from './DatepickerRow/DatepickerRow';
import DatepickerHeader from './DatepickerHeader/DatepickerHeader';

class Datepicker extends PureComponent {
    state = {
        y: '',
        m: '',
        d: ''
    }

    componentWillMount() {
        console.log('[Datepicker] ComponenWillMount');
        const now = new Date();
        this.setState({
            y: now.getFullYear(),
            m: now.getMonth(),
            d: now.getDate()
        });
    }

    componentDidMount() {
        console.log('[Datepicker] ComponenDidMount');
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(nextProps === this.props);
    //     console.log(nextState === this.state);
    //     console.log(nextProps, this.props);
    //     return true;
    // }

    renderMonth = () => {
        let filledDays = [];
        if (this.props.articles) {
            filledDays = this.props.articles.map(article => article.day);
        }

        const monthStartDate = new Date(+this.state.y, +this.state.m, 1),
            monthStart = monthStartDate.getTime(),
            firstDay = monthStartDate.getDay(),
            monthNext = new Date(+this.state.y, +this.state.m + 1, 1).getTime(),
            monthLength = Math.round((monthNext - monthStart) / 86400000),
            emptyCount = firstDay !== 0 ? (firstDay - 1) : 6;

        let monthData = [];
        for (let c = 0; c < emptyCount; c++) {
            monthData.push({ timeStamp: Math.random() });
        }
        for (let c = 1; c <= monthLength; c++) {
            monthData.push({
                dayNum: c,
                timeStamp: monthStart + ((c - 1) * 86400000)
            });
        }

        let rows = [];
        for (let i = 0; i <= 36; i = i + 7) {
            let rowData = monthData.slice(i, i + 7);
            rows.push(
                <DatepickerRow
                    key={Math.random()}
                    row={rowData}
                    filledDays={filledDays}
                    pickDate={this.props.pickDate}
                />
            );
        }

        return rows;
    }

    switchMonth = (v) => {
        let m = this.state.m + v;
        let y = this.state.y;
        
        if (m < 0) {
            m = 11;
            y--;
        }

        if (m > 11) {
            m = 0;
            y++;
        }

        this.setState({ y: y, m: m, d: 1 });
    }

    render() {
        console.log('[Datepicker] render');
        return (
            <div className="datePicker formField">
                <DatepickerHeader
                    switchMonth={this.switchMonth}
                    month={this.state.m}
                    year={this.state.y}
                />
                <table>
                    <thead>
                        <tr>
                            <th>Mo</th>
                            <th>Tu</th>
                            <th>We</th>
                            <th>Th</th>
                            <th>Fr</th>
                            <th>Sa</th>
                            <th>Su</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.renderMonth()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Datepicker;