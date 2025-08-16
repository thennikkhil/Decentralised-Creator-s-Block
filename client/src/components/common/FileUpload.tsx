'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { ImageIcon } from 'lucide-react' // Using an icon for the placeholder

export default function FileUpload() {
    const [theFile, setTheFile] = useState<File | null>(null);

    // Create a URL for the file to use in the preview
    const filePreview = useMemo(() => {
        return theFile ? URL.createObjectURL(theFile) : null;
    }, [File]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file ) {
            setTheFile(file);
            alert('File uploaded successfully')
        } 
    };

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const file = event.dataTransfer.files?.[0];
        if (file) {
            setTheFile(file);
        }
    }, []);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    // This function allows the entire div to act as a click trigger for the hidden input
    const triggerFileSelect = () => {
        document.getElementById('file-upload')?.click();
    };

    return (
        <div 
            className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center bg-gradient-to-br from-slate-50 to-white hover:border-purple-400 transition-colors duration-300 group cursor-pointer" 
            onDrop={handleDrop} 
            onDragOver={handleDragOver} 
            onClick={triggerFileSelect}
        >
            <input 
                id="file-upload" 
                type="file" 
                className="hidden" 
                accept="*" 
                onChange={handleFileChange} 
            />
            {filePreview ? (
                <img 
                    src={filePreview} 
                    alt="File Preview" 
                    className="mx-auto max-h-48 rounded-lg object-contain" 
                />
            ) : (
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="p-3 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                        <ImageIcon className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                        <p className="mt-2 font-semibold text-slate-700">
                            Drop your files here or <span className="font-semibold text-purple-500">browse</span>
                        </p>
                        <p className="text-xs text-slate-500">Supports: Image, Video, Documents & Audio</p>
                    </div>
                </div>
            )}
        </div>
    );
}