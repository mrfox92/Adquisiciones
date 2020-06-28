import { Provider } from './Provider.model';
export class Invoice {

    constructor(
        // tslint:disable-next-line: variable-name
        public invoice_number: number,
        // tslint:disable-next-line: variable-name
        public provider_id: number,
        // tslint:disable-next-line: variable-name
        public acquisition_id: number,
        public id?: number,
        public provider?: Provider,
        // tslint:disable-next-line: variable-name
        public emission_date?: any,
        // tslint:disable-next-line: variable-name
        public expiration_date?: any,
        // tslint:disable-next-line: variable-name
        public created_at?: any
    ) {}
}
