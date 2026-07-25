export function formatToday() {
    return new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date());
}

export function payDate(tanggal: number) {
    const now = new Date();

    let month = now.getMonth();
    let year = now.getFullYear();

    if (tanggal < now.getDate()) {
        month++;

        if (month > 11) {
            month = 0;
            year++;
        }
    }

    const full_date = new Date(year, month, tanggal);

    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(full_date);
}
