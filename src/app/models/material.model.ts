export class Material {

    constructor(
        public id: number,
        // tslint:disable-next-line: variable-name
        public bar_code: string,
        // tslint:disable-next-line: variable-name
        public acquisition_id: number,
        public name: string,
        public slug: string,
        // tslint:disable-next-line: variable-name
        public unity_type: number,
        public stock: number,
        public picture: string
    ) { }
}
