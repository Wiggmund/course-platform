import { useEffect } from "react";
import AuthService from "../../services/AuthService";
import Grid from '@mui/material/Grid'
import Logo from "../../components/Logo";
import SearchPanel from "../../components/SearchPanel";
import HashTag from "../../components/HashTag";


const tags = [
    'java',
    'javascript',
    'python',
    'gradle',
    'spring-core',
    'spring-boot',
    'jest'
];


const Home = () => {
    useEffect(() => {
        async function initialAuthentication() {
            await AuthService.checkAuth();
        }

        initialAuthentication();
    }, []);

    return (
        <Grid container padding={5} spacing={5}>
            <Grid item xs={12}>
                <Logo />
            </Grid>
            <Grid item container xs={12} justifyContent={'center'} alignItems={'center'} spacing={2}>
                {tags.map(tag => (
                    <Grid item key={tag}>
                        <HashTag text={tag}/>
                    </Grid>
                ))}
            </Grid>
            <Grid item xs={12}>
                <SearchPanel />
            </Grid>
        </Grid>
    );
};

export default Home;