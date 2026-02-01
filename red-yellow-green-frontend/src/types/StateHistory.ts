import type {EquipmentState} from "./EquipmentState.ts";

export interface StateHistory {
    id: string;
    equipmentId: string;
    state: EquipmentState;
    timestamp: string;
    changedBy: string;
}