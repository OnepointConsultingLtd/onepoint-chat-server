import { useCallback, useEffect, useRef, useState } from "react";
import { BuiltInEdge, useReactFlow, type Node, type PanelProps } from "@xyflow/react";
import { Command as CmdkPrimitive } from "cmdk";
import { Search, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { searchBridge } from "../../lib/searchBridge";
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "../../components/ui/command";

export interface NodeSearchProps extends Omit<PanelProps, "children"> {
	onSearch?: (searchString: string) => Node[];
	onSelectNode?: (node: Node) => void;
	getResultLabel?: (node: Node) => string;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

// Used only by NodeSearchDialog
export function NodeSearchInternal({
	onSearch,
	onSelectNode,
	getResultLabel,
	open,
	onOpenChange,
}: NodeSearchProps) {
	const [searchResults, setSearchResults] = useState<Node[]>([]);
	const [searchString, setSearchString] = useState<string>("");
	const { getNodes, fitView, setNodes } = useReactFlow<Node, BuiltInEdge>();

	const defaultOnSearch = useCallback(
		(q: string) => {
			return getNodes().filter((node) =>
				(node.data.label as string).toLowerCase().includes(q.toLowerCase()),
			);
		},
		[getNodes],
	);

	const onChange = useCallback(
		(q: string) => {
			setSearchString(q);
			if (q.length > 0) {
				onOpenChange?.(true);
				setSearchResults((onSearch || defaultOnSearch)(q));
			} else {
				setSearchResults([]);
				onOpenChange?.(false);
			}
		},
		[onSearch, onOpenChange, defaultOnSearch],
	);

	const defaultOnSelectNode = useCallback(
		(node: Node) => {
			setNodes((nodes) =>
				nodes.map((n) => (n.id === node.id ? { ...n, selected: true } : n)),
			);
			fitView({ nodes: [node], duration: 500 });
		},
		[fitView, setNodes],
	);

	const onSelect = useCallback(
		(node: Node) => {
			(onSelectNode || defaultOnSelectNode)?.(node);
			setSearchString("");
			onOpenChange?.(false);
		},
		[onSelectNode, defaultOnSelectNode, onOpenChange],
	);

	return (
		<>
			<CommandInput
				placeholder="Search conversation..."
				onValueChange={onChange}
				value={searchString}
				onFocus={() => onOpenChange?.(true)}
				onKeyDown={(e) => {
					if (e.key === "Escape") {
						setSearchString("");
						setSearchResults([]);
						onOpenChange?.(false);
						e.currentTarget.blur();
					}
				}}
			/>
			{open && (
				<CommandList>
					{searchResults.length === 0 ? (
						<CommandEmpty>No results found.</CommandEmpty>
					) : (
						<CommandGroup heading="Messages">
							{searchResults.map((node) => {
								const label =
									getResultLabel?.(node) ||
									(typeof node.data?.label === "string" && node.data.label.trim().length > 0
										? node.data.label
										: node.id);
								return (
									<CommandItem key={node.id} onSelect={() => onSelect(node)}>
										<span>{label}</span>
									</CommandItem>
								);
							})}
						</CommandGroup>
					)}
				</CommandList>
			)}
		</>
	);
}

export function NodeSearch({ onSearch, onSelectNode, getResultLabel }: NodeSearchProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [showResults, setShowResults] = useState(false);
	const [searchString, setSearchString] = useState("");
	const [searchResults, setSearchResults] = useState<Node[]>([]);

	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const { getNodes, fitView, setNodes } = useReactFlow<Node, BuiltInEdge>();

	const collapse = useCallback(() => {
		setIsExpanded(false);
		setShowResults(false);
		setSearchString("");
		setSearchResults([]);
	}, []);

	// Close on click outside
	const collapseRef = useRef(collapse);
	useEffect(() => { collapseRef.current = collapse; });
	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(e.target as HTMLElement)) {
				collapseRef.current();
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	const expand = () => {
		setIsExpanded(true);
		setTimeout(() => inputRef.current?.focus(), 50);
	};

	const defaultOnSearch = useCallback(
		(q: string) =>
			getNodes().filter((n) =>
				(n.data.label as string)?.toLowerCase().includes(q.toLowerCase()),
			),
		[getNodes],
	);

	const handleChange = useCallback(
		(q: string) => {
			setSearchString(q);
			if (q.length > 0) {
				setShowResults(true);
				setSearchResults((onSearch || defaultOnSearch)(q));
			} else {
				setSearchResults([]);
				setShowResults(false);
			}
		},
		[onSearch, defaultOnSearch],
	);

	const defaultOnSelectNode = useCallback(
		(node: Node) => {
			setNodes((nodes) => nodes.map((n) => (n.id === node.id ? { ...n, selected: true } : n)));
			fitView({ nodes: [node], duration: 500 });
		},
		[fitView, setNodes],
	);

	const handleSelect = useCallback(
		(node: Node) => {
			(onSelectNode || defaultOnSelectNode)(node);
			collapse();
		},
		[onSelectNode, defaultOnSelectNode, collapse],
	);

	return (
		<div ref={containerRef} className="relative">
			<Command shouldFilter={false} className="bg-transparent p-0 overflow-visible">
				{/* Pill */}
				<div
					className={cn(
						"flex items-center h-9 rounded-full border shadow-md",
						"bg-white/90 dark:bg-[color:var(--osca-surface-dark)] backdrop-blur-sm",
						"border-[color:var(--osca-border-light)] dark:border-[color:var(--osca-border-dark)]",
						"transition-all duration-200 ease-in-out",
						isExpanded ? "w-60 pl-1.5 pr-2 gap-1.5" : "w-9 justify-center",
					)}
				>
					<button
						onClick={isExpanded ? collapse : expand}
						className={cn(
							"flex items-center justify-center rounded-full flex-shrink-0 transition-colors",
							"text-[color:var(--osca-text-muted)] hover:text-[color:var(--osca-accent)]",
							isExpanded ? "w-6 h-6" : "w-9 h-9",
						)}
						aria-label={isExpanded ? "Close search" : "Search messages"}
					>
						{isExpanded
							? <X className="w-3.5 h-3.5" />
							: <Search className="w-4 h-4" />
						}
					</button>

					<div
						className={cn(
							"overflow-hidden transition-all duration-200",
							isExpanded ? "flex-1 opacity-100" : "w-0 opacity-0 pointer-events-none",
						)}
					>
						<CmdkPrimitive.Input
							ref={inputRef}
							value={searchString}
							onValueChange={handleChange}
							placeholder="Search messages..."
							onKeyDown={(e) => {
								if (e.key === "Escape") collapse();
							}}
							className="w-full bg-transparent text-sm outline-none text-[color:var(--osca-surface-dark)] dark:text-[color:var(--osca-text-on-dark)] placeholder:text-[color:var(--osca-text-muted)]"
						/>
					</div>
				</div>

				{/* Results dropdown */}
				{isExpanded && showResults && (
					<div className="absolute top-full left-0 mt-2 w-72 rounded-xl border shadow-xl overflow-hidden z-50 bg-white dark:bg-[color:var(--osca-surface-dark)] border-[color:var(--osca-border-light)] dark:border-[color:var(--osca-border-dark)]">
						<CommandList className="max-h-64 py-1">
							{searchResults.length === 0 ? (
								<CommandEmpty>No results for "{searchString}"</CommandEmpty>
							) : (
								<CommandGroup heading="Messages">
									{searchResults.map((node) => {
										const label = getResultLabel?.(node) || node.id;
										return (
											<CommandItem
												key={node.id}
												onSelect={() => handleSelect(node)}
												className="gap-2"
											>
												<Search className="w-3.5 h-3.5 text-[color:var(--osca-text-muted)] flex-shrink-0" />
												<span className="truncate text-sm">{label}</span>
											</CommandItem>
										);
									})}
								</CommandGroup>
							)}
						</CommandList>
					</div>
				)}
			</Command>
		</div>
	);
}

export interface NodeSearchDialogProps extends NodeSearchProps {
	title?: string;
}

export function NodeSearchDialog({
	onSearch,
	onSelectNode,
	getResultLabel,
	open,
	onOpenChange,
	...props
}: NodeSearchDialogProps) {
	return (
		<CommandDialog open={open} onOpenChange={onOpenChange}>
			<NodeSearchInternal
				onSearch={onSearch}
				onSelectNode={onSelectNode}
				getResultLabel={getResultLabel}
				open={open}
				onOpenChange={onOpenChange}
				{...props}
			/>
		</CommandDialog>
	);
}

// Rendered in the Header — uses searchBridge so no ReactFlow context needed.
export function NodeSearchHeader() {
	const [open, setOpen] = useState(false);
	const [searchString, setSearchString] = useState("");
	const [searchResults, setSearchResults] = useState<Node[]>([]);
	const [showResults, setShowResults] = useState(false);

	// Ctrl+K / Cmd+K opens the search dialog
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === "k") {
				e.preventDefault();
				setOpen(prev => !prev);
			}
		};
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, []);

	const close = () => {
		setOpen(false);
		setSearchString("");
		setSearchResults([]);
		setShowResults(false);
	};

	const handleChange = (q: string) => {
		setSearchString(q);
		if (q.length > 0) {
			const results = searchBridge.search(q);
			setSearchResults(results);
			setShowResults(true);
		} else {
			setSearchResults([]);
			setShowResults(false);
		}
	};

	const handleSelect = (node: Node) => {
		searchBridge.focusNode(node);
		close();
	};

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				title="Search messages"
				className="group h-full flex items-center gap-2 dark:!text-[color:var(--osca-text-on-dark)] py-2.5 px-4 rounded-lg cursor-pointer dark:!bg-[color:var(--osca-bg-dark)] dark:hover:bg-[color:var(--osca-surface-dark)] bg-[color:var(--osca-bg-light)] hover:bg-gray-50 border border-[color:var(--osca-border-light)] dark:border-[color:var(--osca-border-dark)] hover:border-[color:var(--osca-accent)] dark:hover:border-[color:var(--osca-accent)] shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 hover:text-gray-900 dark:hover:!text-[color:var(--osca-text-on-dark)] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--osca-accent)] focus-visible:ring-offset-1"
			>
				<Search className="w-4 h-4 transition-colors duration-200" />
				<span className="text-sm font-medium transition-colors duration-200 md:block hidden">Search</span>
				<span className="hidden md:inline-flex items-center gap-0.5 ml-1">
					<kbd className="inline-flex items-center rounded bg-gray-100 dark:bg-[color:var(--osca-surface-dark)] border border-gray-300 dark:border-[color:var(--osca-border-dark)] shadow-[0_1px_0_0_rgba(0,0,0,0.2)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.1)] px-1.5 py-0.5 text-[10px] font-sans font-medium text-gray-500 dark:text-[color:var(--osca-text-muted)]">Ctrl</kbd>
					<kbd className="inline-flex items-center rounded bg-gray-100 dark:bg-[color:var(--osca-surface-dark)] border border-gray-300 dark:border-[color:var(--osca-border-dark)] shadow-[0_1px_0_0_rgba(0,0,0,0.2)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.1)] px-1.5 py-0.5 text-[10px] font-sans font-medium text-gray-500 dark:text-[color:var(--osca-text-muted)]">K</kbd>
				</span>
			</button>

			<CommandDialog open={open} onOpenChange={close} className="sm:max-w-2xl">
				<Command shouldFilter={false} className="bg-transparent p-0">
					<CommandInput
						value={searchString}
						onValueChange={handleChange}
						placeholder="Search messages..."
						autoFocus
					/>
					{showResults && (
						<CommandList className="max-h-80 px-2 py-2">
							{searchResults.length === 0 ? (
								<CommandEmpty>No results for "{searchString}"</CommandEmpty>
							) : (
								<CommandGroup heading="Messages">
									{searchResults.map((node) => {
										const label = searchBridge.getResultLabel(node);
										return (
											<CommandItem
												key={node.id}
												onSelect={() => handleSelect(node)}
												className="gap-2"
											>
												<Search className="w-3.5 h-3.5 text-[color:var(--osca-text-muted)] flex-shrink-0" />
												<span className="truncate">{label}</span>
											</CommandItem>
										);
									})}
								</CommandGroup>
							)}
						</CommandList>
					)}
				</Command>
			</CommandDialog>
		</>
	);
}
