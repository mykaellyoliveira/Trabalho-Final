export enum Gender{
    Male = 'm',
    Female = 'f'
}

export enum City{
    Sarandi = 's',
    Maringa = 'm'
}

export enum Plan{
    Básico = 'b',
    Médio = 'm',
    Avançado = 'a'
}

class Person{
    name: string;
    email: string;
    telephone: string;
    gender: Gender;
    city: City; 
    plan:Plan;
    date:Date;

    constructor(name:string, email: string, telephone:string, gender: Gender, city:City, plan:Plan, date:Date){
        this.name = name;
        this.email = email;
        this.telephone = telephone;
        this.gender = gender;
        this.city = city;
        this.plan = plan;
        this.date = date;
    }

}

export default Person 