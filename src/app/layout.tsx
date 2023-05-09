'use client';
import { Footer, Header, ScrollToTop } from '../../components';
import { UseProvider } from '../../appState/';
import './colors.css';
import './globals.css';
import './status.css';
import './table.css';

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
				<script
					async
					defer
					crossOrigin="anonymous"
					src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v15.0&appId=468033418602915&autoLogAppEvents=1"
					nonce="VhgtQZyB"
				></script>
			</head>
			<body className="dark:bg-white">
				<UseProvider>
					<div id="fb-root"></div>
					<Header />
					{children}
					<Footer />
					<ScrollToTop />
				</UseProvider>
			</body>
		</html>
	);
}
