export class Provider {

    constructor(
        public rut: string,
        public name: string,
        public email: string,
        public address: string,
        // tslint:disable-next-line: variable-name
        public url_web?: string,
        public id?: number,
        public phone?: string,
        // tslint:disable-next-line: variable-name
        public created_at?: any
    ) {}
}
