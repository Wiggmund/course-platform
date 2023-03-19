import { Autocomplete, AutocompleteRenderInputParams, createFilterOptions } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Search from '@mui/icons-material/Search';
import { CourseResponseData } from "../../model/Course";
import React from "react";
import { CourseService } from "../../services";

const SearchPanel = () => {
    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option: CourseResponseData) => option.title,
        trim: true
      });
    
    const renderInput = (params: AutocompleteRenderInputParams) => (
        <TextField
            {...params}
            label="Search input"
            InputProps={{
            ...params.InputProps,
            endAdornment: (
                <InputAdornment position="start">
                    <Search />
                </InputAdornment>
            ),
            type: 'search',
            }}
        />
    );

    const getOptionLabel = (option: string | CourseResponseData) => {
        if (typeof option === 'string') return option;

        return option.title;
    };

    const courses = CourseService.coursesList || [];
    const searchInput = <Autocomplete
        freeSolo
        id="search-panel"
        disableClearable
        options={courses.sort((a, b) => -b.title.charAt(0).localeCompare(a.title.charAt(0)))}
        getOptionLabel={getOptionLabel}
        groupBy={(option) => option.title.charAt(0)}
        filterOptions={filterOptions}
        renderInput={renderInput}
        renderOption={(props, option) => {
            return (
              <li {...props} key={option.id}>
                {option.title}
              </li>
            );
        }}
    />;

    return searchInput;
};

export default SearchPanel;