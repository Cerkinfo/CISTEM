import React, { useEffect, useRef, useState } from "react";
import '@styles/components/form/input.scss';
import { Picture } from "@front/components/utils/icons";

interface ImageProps {
    name: string,
    label?: string,
    image: File | string | null,
    setImage: (file: File) => void,
    required?: boolean
}

export function ImageInput({name, label, image, setImage, required}: ImageProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (image && typeof image === "string") {
            setImagePreview(image);
        }
    }, [image]);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileChange(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (file: File) => {
        if (!file.type.match('image.*')) {
            throw new Error("Only image files are allowed");
        }
        if (file.size > 5 * 1024 * 1024) {
            throw new Error("File size exceeds the 5MB limit");
        }
        setImage(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFileChange(e.target.files[0]);
        }
    };

    const openFileDialog = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    
    return (
        <div className="image">
            <div className="image__text">
                { label && <label className="image__label" htmlFor={ name }>{ label }</label> }
            </div>
            
            <div
                className="image__area"
                onDragOver={ handleDragOver }
                onDrop={ handleDrop }
                onClick={ openFileDialog }
                style={ { "--selected-image": imagePreview ? `url(${ imagePreview })` : 'none' } as React.CSSProperties }
            >
                { imagePreview ? "" : (<Picture size={'100'} />) }
                <input
                    className="image__field"
                    name={ name }
                    type="file"
                    ref={ fileInputRef }
                    onChange={ handleFileInputChange }
                    accept="image/*"
                    required={ required }
                />
            </div>
        </div>
    )
}