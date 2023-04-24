export const metadata = {
	title: `Web • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
};
export default function WebLayout({ children }: { children: React.ReactNode }) {
	return <section>{children}</section>;
}
