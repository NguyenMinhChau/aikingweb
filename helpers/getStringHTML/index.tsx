export function getFirstXLines(htmlString: any, number: number) {
	const lines = htmlString
		.split(/(\n|<br>)/)
		.slice(0, number)
		.map((line: any) => line.trim());
	return lines.join('');
}
