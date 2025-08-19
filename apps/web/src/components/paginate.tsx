import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
	currentPage: number;
	nextPage: () => void;
	previewPage: () => void;
};

export default function Paginate({
	previewPage,
	currentPage,
	nextPage,
}: Props) {
	return (
		<div className="flex justify-between rounded-xl px-2 py-4 font-semibold md:px-4">
			<div />
			<div className="flex items-center space-x-2">
				{currentPage - 1 < 1 ? (
					<Button
						className="items-center font-semibold text-sm"
						variant="ghost"
						disabled
					>
						<ArrowLeft />
					</Button>
				) : (
					<Button
						className="items-center font-semibold text-sm"
						variant="ghost"
						onClick={previewPage}
					>
						<ArrowLeft />
					</Button>
				)}
				<span className="text-sm">Page {currentPage}</span>
				<Button
					className="items-center font-semibold text-sm"
					variant="ghost"
					onClick={nextPage}
				>
					<ArrowRight />
				</Button>
			</div>
		</div>
	);
}
