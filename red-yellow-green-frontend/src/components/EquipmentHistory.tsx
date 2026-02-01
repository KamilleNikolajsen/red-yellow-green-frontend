import {useEffect, useState} from "react";
import type {StateHistory} from "../types/StateHistory.ts";
import {equipmentApi} from "../services/api.ts";
import styles from './Styling/EquipmentHistory.module.css';
import {EquipmentHistoryCard} from "./EquipmentHistoryCard";

interface EquipmentHistoryProps {
    equipmentId: string;
    equipmentName: string;
    onClose: () => void;
}

export function EquipmentHistory({ equipmentId, equipmentName, onClose }: EquipmentHistoryProps) {
    const [history, setHistory] = useState<StateHistory[]>([]);
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        loadHistory();
    }, [equipmentId, fromDate, toDate]);

    const loadHistory = async () => {
        setLoading(true);

        try{
            const from = fromDate ? new Date(fromDate) : undefined;
            const to = toDate ? new Date(toDate) : undefined;

            const data = await equipmentApi.fetchEquipmentHistory(equipmentId, from, to);
            setHistory(data);
        } catch (e) {
            console.error("Error loading equipment history:", e);
            alert("Failed to load equipment history. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        History: {equipmentName}
                    </h2>
                    <button
                        onClick={onClose}
                        className={styles.closeBtn}
                    >
                        ×
                    </button>
                </div>

                <div className={styles.filterRow}>
                    <label className={styles.filterLabel}>
                        From:
                        <input
                            type="date"
                            value={fromDate}
                            onChange={e => setFromDate(e.target.value)}
                            className={styles.filterInput}
                        />
                    </label>
                    <label className={styles.filterLabel}>
                        To:
                        <input
                            type="date"
                            value={toDate}
                            onChange={e => setToDate(e.target.value)}
                            className={styles.filterInput}
                        />
                    </label>
                </div>

                <div className={styles.scrollArea}>
                    {loading ? (
                        <div className={styles.loading}>Loading...</div>
                    ) : history.length === 0 ? (
                        <div className={styles.noHistory}>No history found</div>
                    ) : (
                        <div className={styles.historyList}>
                            {history.map((entry) => (
                                <EquipmentHistoryCard key={entry.id} entry={entry} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}