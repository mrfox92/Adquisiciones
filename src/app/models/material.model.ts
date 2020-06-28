export class Material {

    constructor(
        // tslint:disable-next-line: variable-name
        public bar_code: string,
        public name: string,
        // tslint:disable-next-line: variable-name
        public unity_type: '1' | '2' | '3' | '4' | '5',
        // tslint:disable-next-line: variable-name
        public acquisition_id: number,
        public id?: number,
        public slug?: string,
        public stock?: number,
        public picture?: string,
        // tslint:disable-next-line: variable-name
        public created_at?: any,
        // tslint:disable-next-line: variable-name
        public updated_at?: any
    ) { }
}
