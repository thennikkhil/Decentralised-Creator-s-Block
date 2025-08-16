import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

const mockCards = [
  {
    id: 1,
    image: "/placeholder.svg?height=300&width=400",
    price: "$25.99",
    title: "Digital Landscape Art"
  },
  {
    id: 2,
    image: "/placeholder.svg?height=300&width=400",
    price: "$45.00",
    title: "Abstract Color Burst"
  },
  {
    id: 3,
    image: "/placeholder.svg?height=300&width=400",
    price: "$15.50",
    title: "Forest Photography"
  },
  {
    id: 4,
    image: "/placeholder.svg?height=300&width=400",
    price: "$35.99",
    title: "Character Illustration"
  },
  {
    id: 5,
    image: "/placeholder.svg?height=300&width=400",
    price: "$20.00",
    title: "Minimalist Poster"
  },

  {
    id: 6,
    image: "/placeholder.svg?height=300&width=400",
    price: "$30.75",
    title: "Urban Street Photo"
  },

  {
    id: 7,
    image: "/placeholder.svg?height=300&width=400",
    price: "$40.00",
    title: "Watercolor Flowers"
  },
  {
    id: 8,
    image: "/placeholder.svg?height=300&width=400",
    price: "$55.99",
    title: "3D Futuristic Render"
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />
      
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Discover content from creators worldwide
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            discover best content like never before
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {mockCards.map((card) => (
            <Link key={card.id} href={`/card/${card.id}`}>
              <Card className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={card.image || "/placeholder.svg"}
                      alt={card.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-800 truncate">{card.title}</h3>
                      <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 font-bold">
                        {card.price}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
