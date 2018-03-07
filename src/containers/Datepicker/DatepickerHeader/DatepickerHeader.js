import React from 'react';
import {getMonthName} from '../../../utils';

const dph = (props) => {
    return (
        <table className="datePicker__header">
            <tbody>
                <tr>
                    <td className="datePicker__prevnext" onClick={() => props.switchMonth(-1)}>
                        <i className="icon-angle-left"></i>
                    </td>
                    <td className="empty">
                        {getMonthName(props.month)} {props.year}
                    </td>
                    <td className="datePicker__prevnext" onClick={() => props.switchMonth(1)}>
                        <i className="icon-angle-right"></i>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default dph;