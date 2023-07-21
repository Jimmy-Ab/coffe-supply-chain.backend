const getId = () => {
    const chars = "0123456789ABC0123456789DEFGHIJK0123456789LM0123456789NO0123456789PQRST0123456789UVWXTZ";
    const _date = new Date();
    const _year = _date.getFullYear();
    const _month = _date.getMonth() + 1;
    const _day = _date.getDate();

    const string_length = 10;
    let randomstring = '';
    randomstring = _day.toString() + "_" + _month.toString() + "_" + _year.toString() + "_";
    for (let i = 0; i < string_length; i++) {
        const rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
}

module.exports = getId;