import { Vehicle } from "../types/Vehicle";

export interface IVehicleService {
	GetList(): Promise<Vehicle[]>;
	GetOne(id: string): Promise<Vehicle>;
	Save(vehicle: Vehicle): void;
	Delete(id: string): void;
}