import { VehicleDto } from "../types/Vehicle";

export interface IVehicleService {
	GetList(): Promise<VehicleDto[]>;
	GetOne(id: string): Promise<VehicleDto>;
	Save(vehicle: VehicleDto): void;
	Delete(id: string): void;
}