import Link from "next/link"
import { Github, Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-slate-300">made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span className="text-slate-300">by</span>
            <span className="font-semibold text-white">nikhil</span>
          </div>
          <Link 
            href="https://github.com/nikhil/creator-hub" 
            target="_blank"
            className="inline-flex items-center space-x-2 text-slate-400 hover:text-white transition-colors duration-300"
          >
            <Github className="w-5 h-5" />
            <span>View on GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
