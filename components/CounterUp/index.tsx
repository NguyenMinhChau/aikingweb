'use client';
import React from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
type CounterUpType = {
	start?: number;
	end?: number;
	type?: string;
};
function CounterUp({ start = 0, end = 0, type }: CounterUpType) {
	return (
		<>
			<div className="text-[#000] text-[20px] italic">
				{type}{' '}
				<span className="font-bold text-[30px] text-primary">
					<CountUp start={start} decimal="," end={end} redraw={true}>
						{({ countUpRef, start }) => (
							<VisibilitySensor onChange={start} delayedCall>
								<span ref={countUpRef} />
							</VisibilitySensor>
						)}
					</CountUp>
					<span className="text-primary">+</span>
				</span>
			</div>
		</>
	);
}

export default CounterUp;
