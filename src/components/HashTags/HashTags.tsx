import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography/Typography";

interface HashTagProps {
    tags: string[];
}

export const HashTags = ({tags}: HashTagProps) => {
    const tagItems = tags.map((tag, index) => (
            <Typography
                sx={{typography: {xs: 'body2', sm: 'body1'}}} 
                textAlign="center"
                key={`${tag}-${index}`}
            >
                #{tag}
            </Typography>
        )
    );

    return (
        <Stack
            direction={'row'}
            gap={1}
            justifyContent={'center'}
            alignItems={'center'}
            flexWrap={'wrap'}
        >
            {tagItems}
        </Stack>
    );
};