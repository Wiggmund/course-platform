import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";

interface HashTagProps {
    text: string;
}

export const HashTag = ({text}: HashTagProps) => {
    const tag = `#${text}`;

    return (
        <Typography sx={{typography: {xs: 'body2', sm: 'body1'}}} textAlign="center">
            {tag}
        </Typography>
    );
};