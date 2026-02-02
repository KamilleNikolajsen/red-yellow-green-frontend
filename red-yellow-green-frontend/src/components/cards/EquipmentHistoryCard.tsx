import type {StateHistory} from "../../types/StateHistory.ts";
import type {EquipmentState} from "../../types/EquipmentState.ts";
import styles from '../styling/EquipmentHistory.module.css';

interface EquipmentHistoryCardProps {
  entry: StateHistory;
}

const stateColors: Record<EquipmentState, string> = {
  RED: styles.stateRed,
  YELLOW: styles.stateYellow,
  GREEN: styles.stateGreen,
};

const stateLabels: Record<EquipmentState, string> = {
    RED: 'Standing still',
    YELLOW: 'Starting up/Winding down',
    GREEN: 'Producing normally',
};

export function EquipmentHistoryCard({ entry }: EquipmentHistoryCardProps) {
  return (
    <div className={styles.historyItem}>
      <div className={styles.stateRow}>
          <div>
             <p className={styles.changedBy}>
                 Changed by: {entry.changedBy}
             </p>
             <p className={styles.timestamp}>
                 {new Date(entry.timestamp).toLocaleString()}
             </p>
         </div>
          State:
        <span
          className={`${styles.stateBadge} ${stateColors[(entry.state as EquipmentState).toUpperCase() as EquipmentState] || styles.stateRed}`}
        > {stateLabels[(entry.state as string).toUpperCase() as EquipmentState]}
        </span>
      </div>
    </div>
  );
}

