import { PopoverOrigin } from "@mui/material";

export const workoutContainerStyles = {
    marginTop: 4,
    maxWidth: '90vw',
    width: '500px',
};

export const menuProps = ({
    anchorEl,
    open,
    onClose,
}: {
    anchorEl: HTMLElement | null
    open: boolean
    onClose: () => void
}) => ({
    anchorEl,
    open,
    onClose,
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
    } as PopoverOrigin,
    transformOrigin: {
        vertical: 'top',
        horizontal: 'left',
    } as PopoverOrigin,
});
