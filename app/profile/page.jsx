import MyProfile from "@/app/components/MyProfile";


export default function() {
    return (
        <div className="grid grid-cols-[min(300px,30%)_1fr] items-center justify-items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)] bg-orange-900">
        <div className="bg-gray-95 shadow-2xl w-full h-full relative bg-black">
            <div className="p-2">
                <button className="w-full bg-gray-500 rounded-sm mb-2 active:bg-gray-600">Public Events</button>
                <button className="w-full bg-gray-500 rounded-sm mb-2 active:bg-gray-600">Classes</button>
            </div>
            
            <div className="absolute bottom-20 w-full p-2">
                <p className="inline">
                    John Doe
                </p>
                <p className="ml-4 inline text-gray-400">
                    ($19.99)
                </p>
                <button className="bg-gray-200 text-black w-full rounded-sm mt-2 active:bg-gray-600">
                    Profile
                </button>
                <button className="bg-gray-200 text-black w-full rounded-sm mt-2 active:bg-gray-600">
                    Sign Out
                </button>
            </div>
        </div>
        <div className="w-full h-full">
            <MyProfile />
        </div>
        </div>
    );
}
