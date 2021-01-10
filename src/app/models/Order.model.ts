import { Office } from './Office.model';
import { Dispatcher } from './Dispatcher.model';
export class Order {

    constructor(
        // tslint:disable-next-line: variable-name
        public num_order: number,
        // tslint:disable-next-line: variable-name
        public dispatcher_id: number,
        // tslint:disable-next-line: variable-name
        public office_id: number,
        public id?: number,
        public status?: number,
        // tslint:disable-next-line: variable-name
        public name_responsible?: string,
        public office?: Office,
        public dispatcher?: Dispatcher
    ){}
}
