import type {Equipment} from "../types/Equipment.ts";
import type {EquipmentState} from "../types/EquipmentState.ts";
import {useState} from "react";
import {equipmentApi} from "../services/api.ts";
import {StateChangeButton} from "./StateChangeButton.tsx";
import styles from './Styling/EquipmentCard.module.css';

interface EquipmentCardProps {
    equipment: Equipment;
    onStateChanged: () => void;
    onViewHistory: (equipmentId: string) => void;
}

const stateColors: Record<EquipmentState, string> = {
    RED: styles.stateRed,
    YELLOW: styles.stateYellow,
    GREEN: styles.stateGreen,
};

export function EquipmentCard({ equipment, onStateChanged, onViewHistory }: EquipmentCardProps) {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleStateChange = async (newState: EquipmentState) => {
        const workerName = prompt("Enter your name to confirm the state change:");
        if (!workerName) return;

        setIsUpdating(true);
        try{
            await equipmentApi.updateEquipmentData(equipment.id,{
                state: newState,
                changedBy: workerName
            });
            onStateChanged();
        } catch (e) {
            console.error("Error updating equipment state:", e);
            alert("Failed to update equipment state. Please try again.");
        } finally {
            setIsUpdating(false);
        }
    };

    // Defensive: handle missing/invalid lastUpdatedUtc
    let lastUpdate = 'Unknown';
    if (equipment.lastStateChange) {
        const parsedDate = new Date(equipment.lastStateChange);
        lastUpdate = isNaN(parsedDate.getTime()) ? 'Unknown' : parsedDate.toLocaleString();
    }
    console.log('lastUpdatedUtc:', equipment.lastStateChange);
    console.log('equipment:', equipment);
    return (
        <div className={styles.cardInner}>
            <h2 className={styles.equipmentName}>{equipment.name}</h2>
            <div className={styles.stateText}>
                State:
                <span className={stateColors[(equipment.currentState as string).toUpperCase() as EquipmentState] || styles.stateRed}>
                  {equipment.currentState}
                </span>
            </div>
            <p className={styles.lastUpdated}>
                Last updated: {lastUpdate}
            </p>
            <p >
                Change State To:
            </p>

            <div className={styles.buttonRow}>
                <StateChangeButton
                    state="RED"
                    currentState={equipment.currentState as EquipmentState}
                    onClick={handleStateChange}
                    disabled={isUpdating}
                />
                <StateChangeButton
                    state="YELLOW"
                    currentState={equipment.currentState as EquipmentState}
                    onClick={handleStateChange}
                    disabled={isUpdating}
                />
                <StateChangeButton
                    state="GREEN"
                    currentState={equipment.currentState as EquipmentState}
                    onClick={handleStateChange}
                    disabled={isUpdating}
                />
            </div>
            <button
                onClick={() => onViewHistory(equipment.id)}
                className={styles.viewHistoryBtn}
            >
                View History →
            </button>
        </div>
    );
}