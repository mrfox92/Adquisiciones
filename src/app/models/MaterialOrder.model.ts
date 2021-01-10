import { Material } from './material.model';
export class MaterialOrder {

    constructor(
        public id: number,
        // tslint:disable-next-line: variable-name
        public material_id: number,
        // tslint:disable-next-line: variable-name
        public order_id: number,
        public quantity: number,
        // tslint:disable-next-line: variable-name
        public created_at?: any,
        public material?: Material
    ) {}
}
