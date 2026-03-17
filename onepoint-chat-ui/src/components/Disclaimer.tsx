import { PROJECT_INFO } from '../lib/constants'

export default function Disclaimer() {
	return (
		<div className={"fixed bottom-4 left-0 right-0 z-[85] text-center mb-2"}>
			<p className={'text-[8px] md:!text-xs text-center !text-slate-900 dark:!text-[#fafffe] z-[85]'}>
				{PROJECT_INFO.NAME} can make mistakes. Check important information with your Onepoint
				advisor.
			</p>
		</div>
	)
}
