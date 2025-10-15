import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadIcon, ImageIcon, VideoIcon, SparklesIcon, XIcon, SpinnerIcon } from '../icons/Icons';
import { useGeneration } from '../../context/GenerationContext';

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const ChatInput: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generationType, setGenerationType] = useState<'Image' | 'Video'>('Image');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { addGeneratedItem } = useGeneration();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFileError(null);
    if (!selectedFile) return;

    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      setFileError(`File is too large. Max size is ${MAX_FILE_SIZE_MB}MB.`);
      setFile(null);
      setFilePreview(null);
      if(fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile));
  };

  const removeFile = () => {
    setFile(null);
    setFilePreview(null);
    setFileError(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setFileError(null);

    try {
        const formData = new FormData();
        formData.append('prompt', prompt);
        if (file) {
            formData.append('file', file);
        }
        formData.append('generationType', generationType);

        const response = await fetch('http://localhost:5678/webhook-test/generate-image', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Webhook request failed: ${response.status} ${errorText}`);
        }
        
        const result = await response.json();
        const mediaUrl = result.url;
        
        if (!mediaUrl || typeof mediaUrl !== 'string') {
             console.error("Webhook response was successful but didn't contain a valid URL.", result);
             throw new Error('Invalid response from generation service.');
        }

        const newItem = {
            type: generationType,
            prompt: prompt,
            url: mediaUrl,
        };
        await addGeneratedItem(newItem);
        setPrompt('');
        removeFile();
    } catch (error: any) {
        console.error('Generation failed:', error);
        setFileError(error.message || 'Generation failed. Please try again.');
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
      className="fixed bottom-0 left-0 right-0 p-4 z-20"
    >
      <div className="max-w-3xl mx-auto">
        <AnimatePresence>
            {(filePreview || fileError) && (
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: 10, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative mb-2 w-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-3 flex items-center justify-between"
              >
                  {fileError ? (
                      <p className="text-red-500 text-sm font-medium">{fileError}</p>
                  ) : filePreview && file ? (
                      <div className="flex items-center gap-3 overflow-hidden">
                          {file.type.startsWith('image/') ? (
                              <img src={filePreview} alt="Preview" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                          ) : (
                              <video src={filePreview} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                          )}
                          <div className="text-sm overflow-hidden">
                              <p className="font-medium text-black dark:text-white truncate">{file.name}</p>
                              <p className="text-neutral-500 dark:text-neutral-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                      </div>
                  ) : null}
                  <button onClick={removeFile} className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors flex-shrink-0">
                      <XIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                  </button>
              </motion.div>
            )}
        </AnimatePresence>
        <form onSubmit={handleSubmit} className="relative group">
            <div className="relative flex items-center justify-center group">
                <div className="absolute z-[-1] overflow-hidden h-full w-full rounded-2xl blur-[3px] 
                                before:absolute before:content-[''] before:z-[-2] before:w-[999px] before:h-[999px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-60
                                before:bg-[conic-gradient(#000,#402fb5_5%,#000_38%,#000_50%,#cf30aa_60%,#000_87%)] before:transition-all before:duration-2000
                                group-hover:before:rotate-[-120deg] group-focus-within:before:rotate-[420deg] group-focus-within:before:duration-[4000ms]">
                </div>
                <div className="absolute z-[-1] overflow-hidden h-full w-full rounded-2xl blur-[3px]
                                before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
                                before:bg-[conic-gradient(rgba(0,0,0,0),#18116a,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#6e1b60,rgba(0,0,0,0)_60%)] before:transition-all before:duration-2000
                                group-hover:before:rotate-[-98deg] group-focus-within:before:rotate-[442deg] group-focus-within:before:duration-[4000ms]">
                </div>
                <div className="absolute z-[-1] overflow-hidden h-full w-full rounded-2xl blur-[2px] 
                                before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[83deg]
                                before:bg-[conic-gradient(rgba(0,0,0,0)_0%,#a099d8,rgba(0,0,0,0)_8%,rgba(0,0,0,0)_50%,#dfa2da,rgba(0,0,0,0)_58%)] before:brightness-125 dark:before:brightness-140
                                before:transition-all before:duration-2000 group-hover:before:rotate-[-97deg] group-focus-within:before:rotate-[443deg] group-focus-within:before:duration-[4000ms]">
                </div>
                <div className="absolute z-[-1] overflow-hidden h-full w-full rounded-2xl blur-[0.5px]
                                before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-70
                                before:bg-[conic-gradient(#e2e8f0,#402fb5_5%,#e2e8f0_14%,#e2e8f0_50%,#cf30aa_60%,#e2e8f0_64%)] dark:before:bg-[conic-gradient(#1c191c,#402fb5_5%,#1c191c_14%,#1c191c_50%,#cf30aa_60%,#1c191c_64%)] before:brightness-100 dark:before:brightness-130
                                before:transition-all before:duration-2000 group-hover:before:rotate-[-110deg] group-focus-within:before:rotate-[430deg] group-focus-within:before:duration-[4000ms]">
                </div>

                <div className="relative w-full">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*,video/*"
                        disabled={isGenerating}
                    />
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe what you want to create..."
                        disabled={isGenerating}
                        className="bg-light-card dark:bg-[#010201] border-none w-full h-16 rounded-xl text-black dark:text-white px-14 text-base focus:outline-none placeholder-neutral-500 dark:placeholder-gray-400"
                    />
                    <button type="button" onClick={handleUploadClick} disabled={isGenerating} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <UploadIcon className="w-5 h-5" />
                    </button>
                    
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                        <div className="flex items-center bg-light-bg dark:bg-dark-bg p-1 rounded-lg">
                            <button 
                                type="button"
                                onClick={() => setGenerationType('Image')}
                                className={`px-2.5 py-1.5 text-sm rounded-md transition-colors ${generationType === 'Image' ? 'bg-black dark:bg-white text-white dark:text-black' : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'}`}
                                disabled={isGenerating}
                                aria-label="Generate Image"
                            >
                                <ImageIcon className="w-4 h-4" />
                            </button>
                            <button 
                                type="button"
                                onClick={() => setGenerationType('Video')}
                                className={`px-2.5 py-1.5 text-sm rounded-md transition-colors ${generationType === 'Video' ? 'bg-black dark:bg-white text-white dark:text-black' : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'}`}
                                disabled={isGenerating}
                                aria-label="Generate Video"
                            >
                                <VideoIcon className="w-4 h-4" />
                            </button>
                        </div>
                        <button 
                            type="submit"
                            disabled={!prompt.trim() || isGenerating}
                            className="p-2 w-10 h-10 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black rounded-lg disabled:bg-neutral-200 dark:disabled:bg-neutral-600 disabled:text-neutral-400 dark:disabled:text-neutral-500 transition-colors"
                            aria-label="Generate"
                        >
                            {isGenerating ? <SpinnerIcon className="w-5 h-5 animate-spin"/> : <SparklesIcon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ChatInput;
