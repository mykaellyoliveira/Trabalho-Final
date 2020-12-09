export var Gender;
(function (Gender) {
    Gender["Male"] = "m";
    Gender["Female"] = "f";
})(Gender || (Gender = {}));
export var City;
(function (City) {
    City["Sarandi"] = "s";
    City["Maringa"] = "m";
})(City || (City = {}));
export var Plan;
(function (Plan) {
    Plan["B\u00E1sico"] = "b";
    Plan["M\u00E9dio"] = "m";
    Plan["Avan\u00E7ado"] = "a";
})(Plan || (Plan = {}));
class Person {
    constructor(name, email, telephone, gender, city, plan, date) {
        this.name = name;
        this.email = email;
        this.telephone = telephone;
        this.gender = gender;
        this.city = city;
        this.plan = plan;
        this.date = date;
    }
}
export default Person;
