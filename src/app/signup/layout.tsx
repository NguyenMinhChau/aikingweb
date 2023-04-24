export const metadata = {
	title: `Signup • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
};
export default function SignupLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <section>{children}</section>;
}
