## `Further improvements **WHAT WAS DONE**`
### Move course list and fetching data to the HomePage **(COMPLETED)**
1.  Fetching data in the HomePage, and pass current course list to the CourseCardList component. Accordingly, move the pagination and the loading indicator from CourseCardList to the HomePage.

### Need to use Redux **(COMPLETED)**
1. Use asyncThunks for fetching and updating state

### Code quality **(COMPLETED)**
1. More strict eslint config + Prettier
2. Test react components (React Testing library)
3. Test fetching data (Jest)

## `Missed functionality`
### Search **(COMPLETED)**
1. Make SearchPanel a Controlled Component
2. After enter button or search icon was pressed we make request, filter and then update state:

### Complete pagination **(COMPLETED)**
1. When we come back from CoursePage to HomePage we have to be on the page which we were
2. We can use React-Router and pass query parameter with current page

### Video watch history
1. First we get currentPosition and then save it to localStorage using lessonId as key
2. Before playing video we check whether we have position value in localStorage under given lessonId if so we pass it to hls.startLoad(position)
