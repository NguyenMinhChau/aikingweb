export const metadata = {
	title: `Signin • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
};
export default function SigninLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <section>{children}</section>;
}
