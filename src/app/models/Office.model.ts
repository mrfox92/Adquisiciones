import { Department } from './Department.model';
export class Office {

    constructor(
        public name: string,
        // tslint:disable-next-line: variable-name
        public department_id: number,
        public id?: number,
        // tslint:disable-next-line: variable-name
        public created_at?: any,
        public department?: Department
    ) {}
}
