import { PROJECT_INFO } from '../lib/constants'

export default function Disclaimer({ noStyle = false }: { noStyle?: boolean }) {
	return (
		<div className={`${noStyle ? 'text-center' : "fixed bottom-4 left-0 right-0 z-[85] text-center "}`}>
			<span className={`${noStyle ? 'text-[8px] md:text-xs text-center !text-slate-900 dark:!text-[#fafffe] z-[85]' : 'text-[12px] md:text-lg text-center text-slate-900 dark:!text-[#fafffe] z-[85]'}`}>
				{PROJECT_INFO.NAME} can make mistakes. Check important information with your Onepoint
				advisor.
				{noStyle && (
					<>
						<br /> Press{' '}
						<kbd className="px-1 py-0.5 bg-[#9a19ff] text-white dark:!bg-[#1F1925] dark:!text-[#fafffe] rounded">
							Esc
						</kbd>{' '}
						to close
					</>
				)}
			</span>
		</div>
	)
}
