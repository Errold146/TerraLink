import { ChevronRight, ImageUp, Trash2 } from "lucide-react"

interface Props {
	setShowTab: React.Dispatch<React.SetStateAction<"upload" | "delete" | null>>
}

export function TabSelector({setShowTab}: Props) {
	return (
        <>
            <div
                className="flex gap-2 justify-between items-center shadow hover:bg-emerald-50 hover:shadow-lg transition-shadow p-2 rounded-lg cursor-pointer  border-2 border-emerald-200 border-dashed mb-4"
                onClick={() => setShowTab('upload')}
            >
                <div className="flex gap-2 items-center">
                    <div className="bg-violet-50 rounded-lg p-2 h-fit">
                        <ImageUp className="text-violet-700" />
                    </div>
                    <div>
                        <span className="block font-semibold">Upload your own image.</span>
                        <span className="text-sm text-gray-600">Choose an image from your device.</span>
                    </div>
                </div>
                <ChevronRight className="h-4 w-4" />
            </div>

           <div
                className="flex gap-2 justify-between items-center shadow hover:bg-red-50 hover:shadow-lg transition-shadow p-2 rounded-lg cursor-pointer  border-2 border-red-200 border-dashed"
                onClick={() => setShowTab('delete')}
            >
                <div className="flex gap-2 items-center">
                    <div className="bg-red-50 rounded-lg p-2 h-fit">
                        <Trash2 className="text-red-700" />
                    </div>
                    <div>
                        <span className="block font-semibold text-red-500">Delete.</span>
                        <span className="text-sm text-red-300">Delete current image.</span>
                    </div>
                </div>
                <ChevronRight className="h-4 w-4" />
            </div>
        </>
	)
}
