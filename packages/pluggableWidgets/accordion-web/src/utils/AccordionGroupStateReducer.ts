import { AccGroup } from "../components/AccordionGroup";

export type AccordionGroupsReducerAction =
    | { type: "sync"; groups: AccGroup[] }
    | { type: "expand" | "collapse"; group: AccGroup };

export function getAccordionGroupsReducer(
    expand: "single" | "multiple" | "all"
): (state: AccGroup[], action: AccordionGroupsReducerAction) => AccGroup[] {
    return (state: AccGroup[], action: AccordionGroupsReducerAction): AccGroup[] => {
        if (action.type === "sync" || expand === "single") {
            const newState = action.type === "sync" ? action.groups : state;

            return newState.map((group, index) => {
                let collapsed;

                if (action.type === "sync") {
                    collapsed = state[index].collapsed; // The previous collapsed state of the group at the same index can be used, because the order of groups remains the same throughout the lifetime of the widget.
                } else {
                    collapsed = action.type === "expand" ? group !== action.group : true;
                }

                return {
                    ...group,
                    collapsed
                };
            });
        }

        const groupIndex = state.findIndex(group => group === action.group);

        if (groupIndex < 0) {
            return state;
        }

        const newState = [...state];
        newState[groupIndex] = { ...action.group, collapsed: action.type !== "expand" };

        return newState;
    };
}
