export class Provider {

    constructor(
        public id: number,
        public rut: string,
        public name: string,
        // tslint:disable-next-line: variable-name
        public url_web: string,
        public phone: string,
        public email: string
    ) {}
}
