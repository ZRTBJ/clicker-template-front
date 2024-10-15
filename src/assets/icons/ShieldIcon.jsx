export default function ShieldIcon({ isActive, ...props }) {
	return (
		<svg
			width='25'
			height='25'
			viewBox='0 0 25 25'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<g clipPath='url(#clip0_4001_35)'>
				<path
					d='M12.7 1.5L3.20001 5.6818V11.9545C3.20001 17.7621 7.24805 23.1775 12.7 24.5C18.152 23.1775 22.2 17.7621 22.2 11.9545V5.6818L12.7 1.5ZM12.7 22.3307V13H5.31109V7.04093L12.7 3.78955V12.9895H20.0889C19.5294 17.2968 16.6319 21.1336 12.7 22.3307Z'
					fill='currentColor'
					fillOpacity={isActive ? '1' : '0.4'}
				/>
			</g>
			<defs>
				<clipPath id='clip0_4001_35'>
					<rect
						width='24'
						height='24'
						fill='currentColor'
						transform='translate(0.200012 0.5)'
					/>
				</clipPath>
			</defs>
		</svg>
	);
}
