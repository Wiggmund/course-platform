import { createTheme } from "@mui/material";
import { red, green, yellow } from "@mui/material/colors";

const MainTheme = createTheme({
    palette: {
        rating: {
            low: red[500],
            middle: green[500],
            high: yellow[500]
        }
    }
});

export default MainTheme;