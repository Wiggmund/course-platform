import { useEffect } from "react";
import {AuthService} from "../../services";
import {Logo} from "../../components";
import {SearchPanel} from "../../components";
import {HashTags} from "../../components";
import { HashTags as tags } from "../../data";
import {CourseGallery} from "../../components";
import { Stack, styled } from "@mui/material";
import Container from "@mui/material/Container";


export const HeaderContainer = styled(Container)({
    component: "header"
});

export const MainContainer = styled(Container)({
    component: "main"
});


const Home = () => {
    useEffect(() => {
        async function initialAuthentication() {
            await AuthService.checkAuth();
        }

        initialAuthentication();
    }, []);

    return (
        <Container maxWidth="xl">
            <HeaderContainer maxWidth="xl">
                <Stack spacing={3} marginBottom={4}>
                    <Logo />
                    <HashTags tags={tags}/>
                    <SearchPanel />
                </Stack>
            </HeaderContainer>
            <MainContainer maxWidth="xl">
                <CourseGallery />
            </MainContainer>
        </Container>
    );
};

export default Home;