import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CheckIcon from '@mui/icons-material/Check';
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

interface SkillsBlockProps {
    skills: string[];
}

const SkillsBlock = ({
    skills
}: SkillsBlockProps) => {

    const header = 'What\'s you get';

    const skillItems = skills.map((skill, index) => (
        <Grid item xs={12} sm={6} key={`${skill}-${index}`}>
            <Stack direction='row' gap={1} alignItems='center'>
                <CheckIcon />
                <Typography>{skill}</Typography>
            </Stack>
        </Grid>
    ));

    return (
        <Paper sx={{p: 2}}>
            <Stack gap={4}>
                <Box>
                    <Typography variant='h6'>{header}</Typography>
                    <Divider />
                </Box>
                <Grid container spacing={2}>
                    {skillItems}
                </Grid>
            </Stack>
        </Paper>
    );
};

export default SkillsBlock;