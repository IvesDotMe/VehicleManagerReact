import moment from "moment";
import { Vehicle } from "../types/Vehicle";
import { IVehicleService } from "./IVehicleService";
import { faker } from '@faker-js/faker';
import localforage from "localforage";

export class VehicleMockService implements IVehicleService {
	private GenerateVehicle(): Vehicle {
		return {
			id: faker.string.uuid(),
			makeId: faker.string.uuid(),
			isActive: faker.datatype.boolean(),
			licensePlate: faker.vehicle.vrm(),
			name: faker.vehicle.model(),
			purchaseDate: moment(faker.date.past())
		} as Vehicle
	}

	async GetList(): Promise<Vehicle[]> {
		return faker.helpers.multiple(this.GenerateVehicle, { count: 30 });
	}
	async GetOne(id: string): Promise<Vehicle> {
		// const value = await localforage.getItem('blah');
		// console.log(value)
		return this.GenerateVehicle();
	}
	async Save(vehicle: Vehicle): Promise<void> {
		console.log(vehicle)

		// try {
		// 	const value = await localforage.setItem('blah', vehicle);
		// 	// This code runs once the value has been loaded
		// 	// from the offline store.
		// 	console.log(value);
		// } catch (err) {
		// 	// This code runs if there were any errors.
		// 	console.log(err);
		// }
	}
	Delete(id: string): void {
		console.log(id)
	}

}