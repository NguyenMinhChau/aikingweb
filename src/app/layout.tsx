'use client';
import { Footer, Header, ScrollToTop } from '../../components';
import { UseProvider } from '../../appState/';
import './globals.css';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<meta
					content="width=device-width, initial-scale=1"
					name="viewport"
				/>
				<meta property="og:image" content="/images/favicon.ico" />
				<link rel="icon" href="/images/favicon.ico" />
				<link
					href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
					rel="stylesheet"
				></link>
				<title>{`Trang chủ • ${process.env.NEXT_PUBLIC_TITLE_APP}`}</title>
				<script
					defer
					src="https://kit.fontawesome.com/cc3041f69f.js"
					crossOrigin="anonymous"
				></script>
			</head>
			<body className="dark:bg-white">
				<UseProvider>
					<Header />
					{children}
					<Footer />
					<ScrollToTop />
				</UseProvider>
			</body>
		</html>
	);
}
