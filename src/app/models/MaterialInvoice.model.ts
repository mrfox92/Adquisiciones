export class MaterialInvoice {

    constructor(
        public id: number,
        // tslint:disable-next-line: variable-name
        public material_id: number,
        // tslint:disable-next-line: variable-name
        public invoice_id: number,
        public quantity: number,
        // tslint:disable-next-line: variable-name
        public unity_cost: number,
        public iva: number,
        // tslint:disable-next-line: variable-name
        public total_cost: number
    ) {}
}
