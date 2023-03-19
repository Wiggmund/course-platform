import { useEffect } from "react";
import {AuthService, CourseService} from "../services";
import {Logo} from "../components";
import {SearchPanel} from "../components";
import {HashTags} from "../components";
import {CourseCardList} from "../components";
import { Stack, styled } from "@mui/material";
import Container from "@mui/material/Container";
import {useState} from 'react';

export const HeaderContainer = styled(Container)({
    component: "header",
    p: 4
});

export const MainContainer = styled(Container)({
    component: "main",
    marginTop: '40px',
    p: 4
});


const Home = () => {
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        async function initialAuthentication() {
            await AuthService.checkAuth();
        }

        async function loadData() {
            await CourseService.getAllCourses(1);
            setTags(CourseService.getAllHashtags());
        }

        initialAuthentication();
        loadData();
    }, []);



    return (
        <Container maxWidth="xl" sx={{p: 4}}>
            <HeaderContainer maxWidth="xl">
                <Stack spacing={3} marginBottom={4}>
                    <Logo />
                    <HashTags tags={tags}/>
                    <SearchPanel />
                </Stack>
            </HeaderContainer>
            <MainContainer maxWidth="xl">
                <CourseCardList />
            </MainContainer>
        </Container>
    );
};

export default Home;