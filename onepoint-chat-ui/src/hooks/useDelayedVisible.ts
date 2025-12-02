import { useEffect, useState } from "react";

export type DelayedVisibleState = {
	step1: boolean; // First message at 10s
	step2: boolean; // Second message at 15s
};

export default function useDelayedVisible(active: boolean): DelayedVisibleState {
	const [state, setState] = useState<DelayedVisibleState>({ step1: false, step2: false });

	useEffect(() => {
		let t1: NodeJS.Timeout | null = null;
		let t2: NodeJS.Timeout | null = null;

		if (active) {
			setState({ step1: false, step2: false });

			// First step at 10 seconds
			t1 = setTimeout(() => {
				setState(prev => ({ ...prev, step1: true }));
			}, 10000);

			// Second step at 15 seconds
			t2 = setTimeout(() => {
				setState(prev => ({ ...prev, step2: true }));
			}, 15000);
		} else {
			setState({ step1: false, step2: false });
		}

		return () => {
			if (t1) clearTimeout(t1);
			if (t2) clearTimeout(t2);
		};
	}, [active]);

	return state;
}
