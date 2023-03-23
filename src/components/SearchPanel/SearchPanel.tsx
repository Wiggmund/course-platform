import React, { useState } from 'react';
import {
	Autocomplete,
	AutocompleteRenderInputParams,
	Box,
	createFilterOptions
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Search from '@mui/icons-material/Search';
import { CourseResponseData } from '../../model/Course';
import { selectAllCourses, useAppSelector } from '../../redux';

interface SearchPanelProps {
	onSearch: (inputValue: string) => void;
	value: string;
}

const SearchPanel = ({ onSearch, value }: SearchPanelProps) => {
	const courses = useAppSelector(selectAllCourses);
	const [inputValue, setInputValue] = useState(value || '');

	const filterOptions = createFilterOptions({
		matchFrom: 'start',
		stringify: (option: CourseResponseData) => option.title,
		trim: true
	});

	const onSearchClick = () => onSearch(inputValue);

	const renderInput = (params: AutocompleteRenderInputParams) => (
		<TextField
			{...params}
			label="Search input"
			InputProps={{
				...params.InputProps,
				endAdornment: (
					<InputAdornment position="start">
						<Box sx={{ cursor: 'pointer' }} onClick={onSearchClick}>
							<Search fontSize="large" color="error" />
						</Box>
					</InputAdornment>
				),
				type: 'search'
			}}
		/>
	);

	const getOptionLabel = (option: string | CourseResponseData) => {
		if (typeof option === 'string') return option;

		return option.title;
	};

	const searchInput = (
		<Autocomplete
			freeSolo
			id="search-panel"
			disableClearable
			options={courses
				.slice()
				.sort((a, b) => -b.title.charAt(0).localeCompare(a.title.charAt(0)))}
			getOptionLabel={getOptionLabel}
			groupBy={(option) => option.title.charAt(0)}
			isOptionEqualToValue={(option, value) => option.title === value.title}
			inputValue={inputValue}
			onInputChange={(_, newInputValue) => {
				setInputValue(newInputValue);
			}}
			filterOptions={filterOptions}
			renderInput={renderInput}
			renderOption={(props, option) => {
				return (
					<li {...props} key={option.id}>
						{option.title}
					</li>
				);
			}}
		/>
	);

	return searchInput;
};

export default SearchPanel;
