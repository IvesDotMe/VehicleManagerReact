import moment from "moment";
import { Vehicle, VehicleDto } from "../types/Vehicle";
import { IVehicleService } from "./IVehicleService";
import localforage from "localforage";
import { faker } from "@faker-js/faker";

export class VehicleService implements IVehicleService {


	private async GetListVehicles(): Promise<Vehicle[]> {
		return await localforage.getItem<Vehicle[]>('vehicles2') ?? [];
	}

	async GetList(): Promise<VehicleDto[]> {
		return (await this.GetListVehicles()).map(x => {
			const y = x as VehicleDto;
			y.purchaseMoment = moment(x.purchaseDate)
			return y as VehicleDto;
		})
	}
	async GetOne(id: string): Promise<VehicleDto> {
		return (await this.GetList()).find(x => x.id === id) ?? {} as VehicleDto;
	}

	async Save(vehicleDto: VehicleDto): Promise<void> {
		console.log(vehicleDto)
		vehicleDto.purchaseDate = vehicleDto.purchaseMoment?.toDate() ?? new Date();
		delete vehicleDto.purchaseMoment;
		const vehicle = vehicleDto as Vehicle;

		const vehicles = await this.GetListVehicles();

		const element = vehicles.findIndex(e => e.id === vehicleDto.id);
		if (element >= 0) {
			vehicles[element] = vehicle;
		} else {
			vehicle.id = faker.string.uuid();
			vehicles.push(vehicle);
		}
		console.log(vehicles, vehicle)
		await localforage.setItem('vehicles2', vehicles);
	}

	async Delete(id: string): Promise<void> {
		console.log(id)

		let vehicles = await this.GetListVehicles();
		vehicles = vehicles.filter(item => item.id !== id);
		localforage.setItem('vehicles2', vehicles);
	}

}