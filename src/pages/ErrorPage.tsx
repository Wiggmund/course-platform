import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

// interface ErrorPageState {
// 	hasError: boolean;
// }

// interface ErrorPageProps {
// 	children: React.ReactNode;
// }

// export default class ErrorPage extends React.Component<ErrorPageProps, ErrorPageState> {
// 	constructor(props: ErrorPageProps) {
// 		super(props);
// 		this.state = { hasError: false };
// 	}

// 	static getDerivedStateFromError() {
// 		// Update state so the next render will show the fallback UI.
// 		return { hasError: true };
// 	}

// 	componentDidCatch(error: unknown, errorInfo: unknown) {
// 		// You can also log the error to an error reporting service
// 		console.error(error, errorInfo);
// 	}

// 	render() {
// 		if (this.state.hasError) {
// 			// You can render any custom fallback UI
// 			return <h1>Something went wrong.</h1>;
// 		}

// 		return this.props.children;
// 	}
// }

const ErrorPage = () => {
	return (
		<Stack alignItems="center" justifyContent="center" height="100vh">
			<Typography variant="h3">Something went wrong</Typography>
			<Typography variant="h6">Please try again...</Typography>
		</Stack>
	);
};

export default ErrorPage;
