import { User } from './user.model';
export class Dispatcher {
    constructor(
        public id: number,
        // tslint:disable-next-line: variable-name
        public user_id: number,
        // tslint:disable-next-line: variable-name
        public created_at: number,
        public user?: User
    ){}
}
