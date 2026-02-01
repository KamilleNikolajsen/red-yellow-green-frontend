import axios from 'axios';
import type {Equipment} from "../types/Equipment.ts";
import type {UpdateStateRequest} from "../types/UpdateStateRequest.ts";
import type {StateHistory} from "../types/StateHistory.ts";


const API_BASE_URL = 'http://localhost:5000/api';


const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const equipmentApi = {
    fetchEquipmentData: async (): Promise<Equipment[]> => {
        const response = await api.get<Equipment[]>('/equipment');
        return response.data;
    },

    updateEquipmentData: async (
        equipmentId: string,
        request: UpdateStateRequest
    ): Promise<Equipment> => {
        const response = await api.put<Equipment>(
            `/equipment/${equipmentId}/state`,
            request
        );
        return response.data;
    },

    fetchEquipmentHistory: async (
        equipmentId: string,
        from?: Date,
        to?: Date
    ): Promise<StateHistory[]> => {
        const params: Record<string, string> = {};
        if (from) {
            params.from = from.toISOString();
        }
        if (to) {
            params.to = to.toISOString();
        }

        const response = await api.get<StateHistory[]>(
            `/equipment/${equipmentId}/history`,
            { params }
        );
        return response.data;
    }
}