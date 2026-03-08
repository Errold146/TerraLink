import { Logo } from "@/components/shared"

export default function NotFound() {
    return (
        <div className="min-h-screen w-full bg-linear-to-br from-violet-50/80 via-white to-cyan-50/40 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center space-y-8">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Logo />
                </div>

                {/* 404 Number - Large and stylish */}
                <div className="relative">
                    <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-linear-to-r from-emerald-600 via-violet-600 to-cyan-600 animate-gradient-x">
                        404
                    </h1>
                    <div className="absolute inset-0 blur-3xl opacity-30 bg-linear-to-r from-emerald-500 via-violet-500 to-cyan-500 animate-pulse"></div>
                </div>

                {/* Main message */}
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-emerald-900">
                        Page Not Found
                    </h2>
                    <p className="text-lg text-emerald-900/70 max-w-md mx-auto">
                        Sorry, the page you're looking for doesn't exist or has been moved.
                    </p>
                </div>

                {/* Decorative elements */}
                <div className="flex justify-center gap-2 py-8">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "0s" }}></div>
                    <div className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>

                {/* Additional info card */}
                <div className="mt-12 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-emerald-100 shadow-lg shadow-emerald-500/10">
                    <div className="space-y-4">
                        <div className="flex items-center justify-center gap-3 text-emerald-900/80">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm font-medium">
                                Possible reasons:
                            </p>
                        </div>
                        <ul className="text-sm text-emerald-900/70 space-y-2 max-w-sm mx-auto">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                                The URL might be misspelled
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                                The link might be outdated
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                                The user you're looking for doesn't exist
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer message */}
                <p className="text-sm text-emerald-900/50 pt-8">
                    TerraLink - Manage your links in one place
                </p>
            </div>
        </div>
    )
}
