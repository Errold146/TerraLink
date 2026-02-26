type SpinnerProps = {
    centered?: boolean;
}

export function Spinner({ centered = false }: SpinnerProps) {
    return (
        <div className={`flex justify-center items-center ${centered ? 'min-h-screen' : ''}`}>
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-500"></div>
        </div>
    );
}
