import { useEffect } from "react";
import {AuthService} from "../../services";
import {Logo} from "../../components";
import {SearchPanel} from "../../components";
import {HashTag} from "../../components";
import { HashTags } from "../../data";
import {CourseGallery} from "../../components";
import { Stack, styled } from "@mui/material";
import Container from "@mui/material/Container";


const HeaderContainer = styled(Container)({
    component: "header"
});

const MainContainer = styled(Container)({
    component: "main"
});


const Home = () => {
    useEffect(() => {
        async function initialAuthentication() {
            await AuthService.checkAuth();
        }

        initialAuthentication();
    }, []);

    const hashTags = HashTags.map((tag, index) => (
            <HashTag text={tag} key={`${tag}-${index}`}/>
        )
    );

    return (
        <Container maxWidth="xl">
            <HeaderContainer maxWidth="xl">
                <Stack spacing={3} marginBottom={4}>
                    <Logo />
                    <Stack
                        direction={'row'}
                        gap={1}
                        justifyContent={'center'}
                        alignContent={'center'}
                        alignItems={'center'}
                        flexWrap={'wrap'}
                    >{hashTags}</Stack>
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