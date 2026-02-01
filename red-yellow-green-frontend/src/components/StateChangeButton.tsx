import styles from './Styling/StateChangeButton.module.css';
import type {EquipmentState} from "../types/EquipmentState.ts";

interface StateChangeButtonProps {
    state: EquipmentState;
    currentState: EquipmentState;
    onClick: (state: EquipmentState) => void;
    disabled: boolean;
    className?: string; // Allow parent to pass a custom color class
}

const stateColors: Record<EquipmentState, string> = {
    RED: styles.red,
    YELLOW: styles.yellow,
    GREEN: styles.green,
};

export function StateChangeButton({ state, currentState, onClick, disabled, className }: StateChangeButtonProps) {
    const isActive = state === currentState;

    return(
        <button
            onClick={() => onClick(state)}
            disabled={disabled || isActive}
            className={[
                styles.button,
                stateColors[state],
                isActive ? styles.active : '',
                className || ''
            ].join(' ')}
        >
            {state}
        </button>
    );
}