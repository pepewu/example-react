export const dateFromTimestamp = (timestamp) => {
    const dt = new Date(timestamp);
    let y = dt.getFullYear();
    let m = dt.getMonth() + 1;
    let d = dt.getDate();

    if (m <= 9) {
        m = '0' + m;
    }

    if (d <= 9) {
        d = '0' + d;
    }

    return `${y}-${m}-${d}`;
}

export const getMonthName = (m) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return monthNames[m];
}