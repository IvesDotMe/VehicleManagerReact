import { Moment } from "moment";

export type Vehicle = {
	id: string;
	licensePlate: string;
	name: string;
	makeId: string;
	isActive: boolean;
	purchaseDate: Date;
}

export type VehicleDto = Vehicle & {
	purchaseMoment?: Moment;
}