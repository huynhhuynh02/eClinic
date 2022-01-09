export const getAge = (dateString) => {
    var birthday = new Date(dateString);
    var year = birthday.getFullYear();
    var currentDate =  new Date();
    var currentYear = currentDate.getFullYear();
    return currentYear - year;
};