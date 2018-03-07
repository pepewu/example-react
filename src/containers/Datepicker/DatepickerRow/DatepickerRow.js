import React from 'react';

const row = (props) => {
    return (
        <tr>
            {props.row.map(day => {
                let clsName = null;
                if (! day.dayNum) {
                    clsName = 'empty';
                }
                if (props.filledDays.indexOf(day.timeStamp) >= 0) {
                    clsName = 'filled';
                }

                return (
                    <td
                        key={day.timeStamp}
                        onClick={(e) => props.pickDate(e, day.timeStamp)}
                        className={clsName}
                    >{day.dayNum}</td>
                );
            })}
        </tr>
    );
};

export default row;