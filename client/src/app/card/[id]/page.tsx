import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, Heart, Share2, Download } from 'lucide-react'
import Image from "next/image"

// Mock data - in a real app, this would come from your database
const mockCardData = {
  id: 1,
  title: "Digital Landscape Masterpiece",
  description: "A breathtaking digital landscape that captures the essence of nature's beauty through vibrant colors and intricate details. This artwork represents hours of careful craftsmanship and artistic vision, perfect for digital collectors and art enthusiasts. The piece features stunning mountain ranges, flowing rivers, and a dramatic sky that tells a story of adventure and wonder.",
  price: "$25.99",
  image: "/placeholder.svg?height=600&width=800",
  creator: {
    name: "Alex Rivera",
    address: "0x742d35Cc6634C0532925a3b8D404d3aAB8c3f8c9",
    avatar: "/placeholder.svg?height=100&width=100"
  },
  rating: 4.8,
  reviews: 127,
  tags: ["Digital Art", "Landscape", "Nature", "Premium"]
}

export default function CardDetailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Image */}
            <div className="space-y-6">
              <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
                <CardContent className="p-0">
                  <div className="relative group">
                    <Image
                      src={mockCardData.image || "/placeholder.svg"}
                      alt={mockCardData.title}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {mockCardData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-0">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Right Side - Details */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold text-slate-800 mb-4">
                  {mockCardData.title}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(mockCardData.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-slate-600">
                    {mockCardData.rating} ({mockCardData.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {mockCardData.price}
                  </span>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  {mockCardData.description}
                </p>

                {/* Buy Button */}
                <div className="space-y-4 mb-8">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-14 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    <Download className="w-5 h-5 mr-2" />
                    Buy Now
                  </Button>
                  <Button variant="outline" className="w-full h-14 rounded-xl font-semibold text-lg border-slate-300 hover:border-purple-400 hover:text-purple-600 transition-all duration-300">
                    Add to Cart
                  </Button>
                </div>

                <Separator className="my-8" />

                {/* Creator Info */}
                <Card className="bg-gradient-to-r from-slate-50 to-slate-100 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Sold by</h3>
                    <div className="flex items-center space-x-4">
                      <Image
                        src={mockCardData.creator.avatar || "/placeholder.svg"}
                        alt={mockCardData.creator.name}
                        width={60}
                        height={60}
                        className="rounded-full border-2 border-white shadow-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 text-lg">
                          {mockCardData.creator.name}
                        </h4>
                        <p className="text-slate-500 text-sm font-mono break-all">
                          {mockCardData.creator.address}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4 border-slate-300 hover:border-purple-400 hover:text-purple-600 transition-all duration-300">
                      View Creator Profile
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
