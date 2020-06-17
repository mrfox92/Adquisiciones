export class User {

    constructor(
        public name: string,
        // tslint:disable-next-line: variable-name
        public last_name: string,
        public email: string,
        public password: string,
        public getToken?: boolean,
        public id?: number,
        // tslint:disable-next-line: variable-name
        public role_id?: number,
        public slug?: string,
        public avatar?: string
    ) { }
}
