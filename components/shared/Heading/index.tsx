interface HeadingProps {
    title: string
    description: string
}

export function Heading({ title, description }: HeadingProps) {
    return (
        <div>
            <h2 className="text-center font-semibold text-2xl text-violet-800 tracking-tight capitalize">
                {title}
            </h2>
            <p className="text-center text-sm text-muted-foreground mt-1">
                {description}
            </p>
        </div>
    )
}
