import type {StateHistory} from "../types/StateHistory.ts";
import type {EquipmentState} from "../types/EquipmentState.ts";
import styles from './Styling/EquipmentHistory.module.css';

interface EquipmentHistoryCardProps {
  entry: StateHistory;
}

const stateColors: Record<EquipmentState, string> = {
  RED: styles.stateRed,
  YELLOW: styles.stateYellow,
  GREEN: styles.stateGreen,
};

export function EquipmentHistoryCard({ entry }: EquipmentHistoryCardProps) {
  return (
    <div className={styles.historyItem}>
      <div className={styles.stateRow}>
          State:
        <span
          className={`${styles.stateBadge} ${stateColors[(entry.state as EquipmentState).toUpperCase() as EquipmentState] || styles.stateRed}`}
        > {entry.state}
        </span>
        <div>
          <p className={styles.changedBy}>
            Changed by: {entry.changedBy}
          </p>
          <p className={styles.timestamp}>
            {new Date(entry.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

