import React, { useEffect } from 'react';

function LikeFB({ slug, page }: { slug: any; page: any }) {
	useEffect(() => {
		// @ts-ignore
		window.FB?.XFBML?.parse();
	}, []);
	return (
		<div
			className="fb-like"
			data-href={`${process.env.NEXT_PUBLIC_URL_SERVER}/${page}/${slug}`}
			data-width=""
			data-layout="button"
			data-action="like"
			data-size="small"
			data-share="false"
		></div>
	);
}

export default LikeFB;
