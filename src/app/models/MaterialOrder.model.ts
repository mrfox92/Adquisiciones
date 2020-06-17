export class MaterialOrder {

    constructor(
        public id: number,
        // tslint:disable-next-line: variable-name
        public material_id: number,
        // tslint:disable-next-line: variable-name
        public order_id: number,
        public quantity: number
    ) {}
}
