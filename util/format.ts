import { format, parse } from 'date-fns'

function formatCurrency(amount: number = 0, currency_code: string = 'USD') {
    // Convert from cents (which is the default format Finch returns currency)
    amount /= 100;
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency_code,
    })
    return formatter.format(amount);
}

function formatPhoneNumber(phoneNumberString: string) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        var intlCode = (match[1] ? '+1 ' : '');
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
}

function formatDate(date: Date) {
    return format(date, 'yyyy-MM-dd')
}

function parseDate(date: string) {
    return parse(date, 'yyyy-MM-dd', new Date()).toLocaleDateString()
}

export { formatCurrency, formatPhoneNumber, formatDate, parseDate }