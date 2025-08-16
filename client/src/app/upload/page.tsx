import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, ImageIcon, FileText, Video } from 'lucide-react'
import FileUpload from "@/components/common/FileUpload"
import ThumbnailUpload  from "@/components/common/ImageUpload"


export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Upload Your Creative Content
            </h1>
            <p className="text-xl text-slate-600">
              Share your amazing work with creators worldwide
            </p>
          </div>

          {/* Main Grid for Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Card 1: Thumbnail Upload */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-800">
                  1. Upload Thumbnail
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-gradient-to-br from-slate-50 to-white hover:border-purple-400 transition-colors duration-300 group cursor-pointer">
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                        <ImageIcon className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>
                    <Upload className="w-12 h-12 text-slate-400 mx-auto group-hover:text-purple-500 transition-colors" />
                    <div>
                      <p className="text-lg font-semibold text-slate-700 mb-2">
                        Drop your thumbnail here
                      </p>
                      <p className="text-slate-500 text-sm">
                        Recommended: 1920x1080 (16:9 ratio)
                      </p>
                    </div>
                    <ThumbnailUpload />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Main File Upload & Details */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-800">
                  2. Upload Main File & Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Main File Upload Area */}
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center bg-gradient-to-br from-slate-50 to-white hover:border-purple-400 transition-colors duration-300 group cursor-pointer">
                  <div className="space-y-4">
                    <div className="flex justify-center space-x-4">
                      <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors"><ImageIcon className="w-8 h-8 text-blue-600" /></div>
                      <div className="p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors"><Video className="w-8 h-8 text-green-600" /></div>
                      <div className="p-3 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors"><FileText className="w-8 h-8 text-purple-600" /></div>
                    </div>
                    <Upload className="w-16 h-16 text-slate-400 mx-auto group-hover:text-purple-500 transition-colors" />
                    <div>
                      <p className="text-xl font-semibold text-slate-700 mb-2">Drop your main file here</p>
                      <p className="text-slate-500">Supports video, audio, images & documents</p>
                    </div>
                    <FileUpload />
                    {/* <Button variant="outline" className="border-slate-300 text-slate-600 hover:border-purple-500 hover:text-purple-600">Choose File</Button> */}
                  </div>
                </div>

                {/* Content Details */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-lg font-semibold text-slate-700">Content Title</Label>
                  <Input id="title" placeholder="Enter your content title..." className="h-12 border-slate-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-lg font-semibold text-slate-700">Price</Label>
                    <Input id="price" placeholder="$0.00" type="number" step="0.01" min="0" className="h-12 border-slate-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-lg font-semibold text-slate-700">Category</Label>
                    <Input id="category" placeholder="e.g., Digital Art, Photography..." className="h-12 border-slate-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-lg font-semibold text-slate-700">Description</Label>
                  <Textarea id="description" placeholder="Describe your content in detail..." className="min-h-32 border-slate-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl resize-none" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-lg font-semibold text-slate-700">Tags</Label>
                  <Input id="tags" placeholder="art, digital, creative, modern..." className="h-12 border-slate-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl" />
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Action Buttons - Moved outside the grid */}
          <div className="mt-8 max-w-lg mx-auto flex flex-col sm:flex-row gap-4 pt-6">
            <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-14 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300">
              Publish Content
            </Button>
            <Button variant="outline" className="flex-1 h-14 rounded-xl font-semibold text-lg border-slate-300 hover:border-purple-400 hover:text-purple-600 transition-all duration-300">
              Save as Draft
            </Button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}