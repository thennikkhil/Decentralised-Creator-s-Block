'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { ImageIcon } from 'lucide-react'

export default function ThumbnailUpload() {
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

    const thumbnailPreview = useMemo(() => {
        return thumbnailFile ? URL.createObjectURL(thumbnailFile) : null;
    }, [thumbnailFile]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setThumbnailFile(file);
        }
    };

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const file = event.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setThumbnailFile(file);
        }
    }, []);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const triggerFileSelect = () => {
        document.getElementById('thumbnail-upload')?.click();
    };

    return (
        <div 
            className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-gradient-to-br from-slate-50 to-white hover:border-purple-400 transition-colors duration-300 group cursor-pointer" 
            onDrop={handleDrop} 
            onDragOver={handleDragOver} 
            onClick={triggerFileSelect}
        >
            <input 
                id="thumbnail-upload" 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange} 
            />
            {thumbnailPreview ? (
                <img 
                    src={thumbnailPreview} 
                    alt="Thumbnail Preview" 
                    className="mx-auto max-h-40 rounded-lg object-contain" 
                />
            ) : (
                <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="p-2 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                        <ImageIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="mt-2 font-semibold text-slate-700">
                            Drop thumbnail here or <span className="font-semibold text-blue-500">browse</span>
                        </p>
                        <p className="text-xs text-slate-500">Recommended: 16:9 aspect ratio</p>
                    </div>
                </div>
            )}
        </div>
    );
}