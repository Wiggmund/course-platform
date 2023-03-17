import { useEffect } from "react";
import {AuthService} from "../../services";
import Grid from '@mui/material/Grid'
import {Logo} from "../../components";
import {SearchPanel} from "../../components";
import {HashTag} from "../../components";
import { HashTags } from "../../data";
import {CourseGallery} from "../../components";

const Home = () => {
    useEffect(() => {
        async function initialAuthentication() {
            await AuthService.checkAuth();
        }

        initialAuthentication();
    }, []);

    return (
        <>
            <Grid container padding={5} spacing={5}>
                <Grid item xs={12}>
                    <Logo />
                </Grid>
                <Grid item container xs={12} justifyContent={'center'} alignItems={'center'} spacing={2}>
                    {HashTags.map(tag => (
                        <Grid item key={tag}>
                            <HashTag text={tag}/>
                        </Grid>
                    ))}
                </Grid>
                <Grid item xs={12}>
                    <SearchPanel />
                </Grid>
            </Grid>
            <CourseGallery />
        </>

    );
};

export default Home;