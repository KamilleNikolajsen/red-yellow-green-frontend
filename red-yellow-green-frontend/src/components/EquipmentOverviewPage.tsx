import {useEffect, useState} from "react";
import type {Equipment} from "../types/Equipment.ts";
import {signalService} from "../services/signalService.ts";
import {equipmentApi} from "../services/api.ts";
import {EquipmentHistory} from "./EquipmentHistory.tsx";
import {EquipmentCard} from "./EquipmentCard.tsx";

export function EquipmentOverviewPage(){
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [_selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);


    useEffect(() => {
        loadEquipments();
        startSignalConnection();

        return () => {
            signalService.stop();
        }
    }, []);

    const loadEquipments = async () => {
        try {
            const data = await equipmentApi.fetchEquipmentData();
            setEquipments(data);
        } catch (error) {
            console.error("Error loading equipments:", error);
        } finally {
            setLoading(false);
        }
    };

    const startSignalConnection = async () => {
        await signalService.start((data) => {
            console.log("State update:", data);
            loadEquipments(); // Reload all equipment when any state changes
        });
    };

    const selectedEquipment = equipments.find(e => e.id === _selectedEquipmentId);

    return (
        <div>
            <h1>Equipment Overview Page</h1>
            {loading ? (
                <p>Loading equipment...</p>
            ) : (
                <ul>
                    {equipments.map(equipment => (
                        <EquipmentCard
                            key={equipment.id}
                            equipment={equipment}
                            onStateChanged={loadEquipments}
                            onViewHistory={setSelectedEquipmentId}
                        />
                    ))}
                </ul>
            )}
            {_selectedEquipmentId && selectedEquipment && (
                <EquipmentHistory
                    equipmentId={_selectedEquipmentId}
                    equipmentName={selectedEquipment.name}
                    onClose={() => setSelectedEquipmentId(null)}
                />
            )}
        </div>
    );
}