'use client'

import Link from "next/link"
import ConnectButton from "./common/ConnectButton"
import { userStore } from '@/store/user'
import { Button } from "./ui/button"

export function Navbar() {
  
  const user = userStore((state: any) => state.user)

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left - Website Name */}
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            CreatorHub
          </Link>

          {/* Middle - Address Placeholder */}
          {/* <div className="hidden md:flex items-center space-x-4">
            <Badge variant="outline" className="px-4 py-2 text-slate-600 border-slate-300">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              0x742d...8c9 Connected
            </Badge>
          </div> */}

          {/* Right - Navigation Links and Connect Button */}
          <div className="flex items-center space-x-4">
            {user.accountAddress && (
              
          <Link href="/upload" className="hidden sm:block hover:text-gray-300 font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full  shadow-md hover:shadow-lg transition-all duration-300">
                Upload
          </Link>
  )}
            
            {/* <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300"> */}
              <ConnectButton />
            {/* </Button> */}
          </div>
        </div>
      </div>
    </nav>
  )
}
