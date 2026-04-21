import { useCallback, useState } from "react";

import {
	BuiltInEdge,
	useReactFlow,
	type Node,
	type PanelProps,
} from "@xyflow/react";

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
	// The function to search for nodes, should return an array of nodes that match the search string
	// By default, it will check for lowercase string inclusion.
	onSearch?: (searchString: string) => Node[];
	// The function to select a node, should set the node as selected and fit the view to the node
	// By default, it will set the node as selected and fit the view to the node.
	onSelectNode?: (node: Node) => void;
	getResultLabel?: (node: Node) => string;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

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
		(searchString: string) => {
			const nodes = getNodes();
			return nodes.filter((node) =>
				(node.data.label as string)
					.toLowerCase()
					.includes(searchString.toLowerCase()),
			);
		},
		[getNodes],
	);

	const onChange = useCallback(
		(searchString: string) => {
			setSearchString(searchString);
			if (searchString.length > 0) {
				onOpenChange?.(true);
				const results = (onSearch || defaultOnSearch)(searchString);
				setSearchResults(results);
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
						<CommandEmpty>No results found. {searchString}</CommandEmpty>
					) : (
						<CommandGroup heading="Conversations">
							{searchResults.map((node) => {
								const label = getResultLabel?.(node) ||
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

export function NodeSearch({
	className,
	onSearch,
	onSelectNode,
	getResultLabel,
	...props
}: NodeSearchProps) {
	const [open, setOpen] = useState(false);
	return (
		<Command
			shouldFilter={false}
			className="rounded-md bg-transparent p-0 text-[color:var(--osca-text-on-dark)] md:min-w-[420px]"
		>
			<NodeSearchInternal
				className={className}
				onSearch={onSearch}
				onSelectNode={onSelectNode}
				getResultLabel={getResultLabel}
				open={open}
				onOpenChange={setOpen}
				{...props}
			/>
		</Command>
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