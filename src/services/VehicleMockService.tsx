import { Vehicle } from "../types/Vehicle";
import { IVehicleService } from "./IVehicleService";
import { faker } from '@faker-js/faker';

export class VehicleMockService implements IVehicleService {
	private GenerateVehicle(): Vehicle {
		return {
			id: faker.string.uuid(),
			makeId: faker.string.uuid(),
			isAvailable: faker.datatype.boolean(),
			licensePlate: faker.vehicle.vrm(),
			name: faker.vehicle.model(),
			purchaseDate: faker.date.past()
		} as Vehicle
	}

	async GetList(): Promise<Vehicle[]> {
		return faker.helpers.multiple(this.GenerateVehicle, { count: 30 });
	}
	async GetOne(id: string): Promise<Vehicle> {
		return this.GenerateVehicle();
	}
	Save(vehicle: Vehicle): void {
		throw new Error("Method not implemented.");
	}
	Delete(id: string): void {
		throw new Error("Method not implemented.");
	}

}