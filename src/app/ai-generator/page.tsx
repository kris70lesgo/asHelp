'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Loader2, Sparkles, Brain, Upload, X, Send, MessageSquare, Plus } from 'lucide-react';
import { exportToPDF, exportToWord } from '@/lib/document-utils';


import Aurora from '@/components/Backgrounds/Aurora';

export default function AIGenerator() {
  const [formData, setFormData] = useState({
    topic: '',
    subject: '',
    wordCount: '1000',
    level: 'undergraduate',
    requirements: '',
    includeImages: true,
    imageQuery: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{type: 'error' | 'success' | 'info', text: string} | null>(null);
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatting, setIsChatting] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showChat, setShowChat] = useState(false);

  const getUsage = () => {
    const saved = localStorage.getItem('ai-generator-usage');
    return saved ? JSON.parse(saved) : { geminiUsage: 0, geminiLimit: 100, exportsToday: 0, exportLimit: 50 };
  };

  const updateUsage = (type: 'generation' | 'export') => {
    const usage = getUsage();
    const newUsage = type === 'generation' 
      ? { ...usage, geminiUsage: usage.geminiUsage + 1 }
      : { ...usage, exportsToday: usage.exportsToday + 1 };
    localStorage.setItem('ai-generator-usage', JSON.stringify(newUsage));
  };

  const handleGenerate = async () => {
    const usage = getUsage();
    
    if (usage.geminiUsage >= usage.geminiLimit) {
      alert('Your limit for today has exceeded. Please try again tomorrow.');
      return;
    }
    
    setIsGenerating(true);
    try {
      const formDataWithFiles = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataWithFiles.append(key, value.toString());
      });
      uploadedFiles.forEach((file, index) => {
        formDataWithFiles.append(`file_${index}`, file);
      });
      
      const response = await fetch('/api/generate-assignment', {
        method: 'POST',
        body: formDataWithFiles
      });
      
      const data = await response.json();
      if (data.error) {
        if (data.error.includes('limit') || data.error.includes('exceeded')) {
          setStatusMessage({type: 'error', text: 'Your limit for today has exceeded. Please try again tomorrow.'});
          return;
        }
        throw new Error(data.error);
      }
      
      // Clean the content to remove any CSS and HTML that might affect layout
      const cleanContent = data.content
        .replace(/```html/gi, '')
        .replace(/```/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<link[^>]*>/gi, '')
        .replace(/<meta[^>]*>/gi, '')
        .replace(/<html[^>]*>/gi, '')
        .replace(/<\/html>/gi, '')
        .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '')
        .replace(/<body[^>]*>/gi, '')
        .replace(/<\/body>/gi, '');
      setGeneratedContent(cleanContent);
      setStatusMessage({type: 'success', text: 'Assignment generated successfully!'});
      setChatMessages([]);
      setShowChat(true);
      
      updateUsage('generation');
    } catch (error) {
      const errorMsg = (error as Error).message;
      if (errorMsg.includes('limit') || errorMsg.includes('exceeded')) {
        alert('Your limit for today has exceeded. Please try again tomorrow.');
      } else {
        alert('Generation failed: ' + errorMsg);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleChatSubmit = async () => {
    if (!chatInput.trim() || !generatedContent) return;
    
    const userMessage = chatInput.trim();
    setChatInput('');
    setIsChatting(true);
    
    // Add user message to chat
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    try {
      const response = await fetch('/api/chat-assignment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          currentContent: generatedContent,
          topic: formData.topic,
          subject: formData.subject
        })
      });
      
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      // Add assistant response and update content if modified
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      if (data.updatedContent) {
        setGeneratedContent(data.updatedContent);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsChatting(false);
    }
  };

  const handleExportToPDF = async () => {
    const usage = getUsage();
    
    if (usage.exportsToday >= usage.exportLimit) {
      alert('Daily export limit reached! You have downloaded ' + usage.exportLimit + ' documents today. Please try again tomorrow.');
      return;
    }
    
    setIsExporting(true);
    const success = await exportToPDF(generatedContent, formData.topic || 'assignment');
    if (!success) alert('PDF export failed');
    
    updateUsage('export');
    setIsExporting(false);
  };

  const handleExportToWord = async () => {
    const usage = getUsage();
    
    if (usage.exportsToday >= usage.exportLimit) {
      alert('Daily export limit reached! You have downloaded ' + usage.exportLimit + ' documents today. Please try again tomorrow.');
      return;
    }
    
    setIsExporting(true);
    try {
      await exportToWord(generatedContent, formData.topic || 'assignment');
      updateUsage('export');
    } catch (error) {
      alert('Word export failed: ' + (error as Error).message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative bg-slate-900 min-h-screen">
      {/* Simple Header */}
      <div className="relative z-10 bg-slate-900/50 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-purple-400" />
              <span className="text-white font-semibold text-lg">AsHelp AI</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" className="text-white hover:text-purple-400 transition-colors">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
      
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      
      <div className="relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white/90 mb-4">
              AI Assignment Generator
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-6">
              Generate professional academic assignments with AI. Get structured, well-formatted content in seconds.
            </p>
            
            {/* Status Message */}
            {statusMessage && (
              <div className={`mb-6 p-4 rounded-lg border max-w-2xl mx-auto ${
                statusMessage.type === 'error' ? 'bg-red-900/20 border-red-500/50 text-red-300' :
                statusMessage.type === 'success' ? 'bg-green-900/20 border-green-500/50 text-green-300' :
                'bg-blue-900/20 border-blue-500/50 text-blue-300'
              }`}>
                <div className="flex items-center justify-between">
                  <span>{statusMessage.text}</span>
                  <button 
                    onClick={() => setStatusMessage(null)}
                    className="text-white/60 hover:text-white"
                  >
                    ├ù
                  </button>
                </div>
              </div>
            )}
          </div>
          

          
          {/* Main Content */}
          <div className="space-y-8">
            {!generatedContent && (
              <Card className="bg-white/10 backdrop-blur-md border-white/20 max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-white/90 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Assignment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="topic" className="text-white/90">Topic *</Label>
                  <Input
                    id="topic"
                    value={formData.topic}
                    onChange={(e) => setFormData({...formData, topic: e.target.value})}
                    placeholder="Enter assignment topic"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-white/90">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="e.g., Computer Science, History"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="level" className="text-white/90">Academic Level</Label>
                    <Select value={formData.level} onValueChange={(value) => setFormData({...formData, level: value})}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="wordCount" className="text-white/90">Word Count</Label>
                    <Select value={formData.wordCount} onValueChange={(value) => setFormData({...formData, wordCount: value})}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="500">500 words</SelectItem>
                        <SelectItem value="1000">1000 words</SelectItem>
                        <SelectItem value="1500">1500 words</SelectItem>
                        <SelectItem value="2000">2000 words</SelectItem>
                        <SelectItem value="3000">3000 words</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="requirements" className="text-white/90">Additional Requirements</Label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                    placeholder="Any specific requirements or instructions"
                    rows={3}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="includeImages"
                    checked={formData.includeImages}
                    onChange={(e) => setFormData({...formData, includeImages: e.target.checked})}
                    className="rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500"
                  />
                  <Label htmlFor="includeImages" className="text-white/90 text-sm">
                    Include relevant images from Unsplash
                  </Label>
                </div>
                
                {formData.includeImages && (
                  <div className="space-y-2">
                    <Label htmlFor="imageQuery" className="text-white/90">Image Search Term</Label>
                    <Input
                      id="imageQuery"
                      value={formData.imageQuery}
                      onChange={(e) => setFormData({...formData, imageQuery: e.target.value})}
                      placeholder="e.g., sunflower, DNA structure, solar system"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>
                )}
                
                {/* File Upload Section */}
                <div className="space-y-2">
                  <Label className="text-white/90">Upload Reference Files (Optional)</Label>
                  <div 
                    className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-white/40 transition-colors cursor-pointer"
                    onDrop={(e) => {
                      e.preventDefault();
                      const files = Array.from(e.dataTransfer.files);
                      setUploadedFiles(prev => [...prev, ...files]);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => document.getElementById('file-input')?.click()}
                  >
                    <Upload className="h-8 w-8 text-white/60 mx-auto mb-2" />
                    <p className="text-white/90 text-sm">Drop files here or click to browse</p>
                    <p className="text-white/60 text-xs mt-1">PDF, DOC, TXT files supported</p>
                  </div>
                  <input
                    id="file-input"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setUploadedFiles(prev => [...prev, ...files]);
                    }}
                  />
                  
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-white/5 p-2 rounded border border-white/10">
                          <span className="text-white/90 text-sm truncate">{file.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                            className="text-white/60 hover:text-white h-6 w-6 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={handleGenerate} 
                  disabled={!formData.topic || !formData.subject || isGenerating}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating Assignment...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate Assignment
                    </>
                  )}
                </Button>
                </CardContent>
              </Card>
            )}
            
            {generatedContent && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Generated Content */}
                <div className="lg:col-span-2">
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white/90 flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Generated Assignment
                        </CardTitle>
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => setGeneratedContent('')}
                            variant="outline"
                            size="sm"
                            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                          >
                            <Plus className="h-4 w-4" />
                            New
                          </Button>
                          <Button 
                            onClick={handleExportToPDF} 
                            disabled={isExporting}
                            variant="outline"
                            size="sm"
                            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                          >
                            {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                            PDF
                          </Button>
                          <Button 
                            onClick={handleExportToWord} 
                            disabled={isExporting}
                            variant="outline"
                            size="sm"
                            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                          >
                            {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                            Word
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className="bg-white/5 p-6 rounded-lg border border-white/10 max-h-[600px] overflow-y-auto text-white"
                        dangerouslySetInnerHTML={{ __html: generatedContent }}
                      />
                    </CardContent>
                  </Card>
                </div>
                
                {/* Chat Interface */}
                <div>
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white/90 flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Edit Assignment
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col h-[600px]">
                      {/* Chat Messages */}
                      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                        {chatMessages.length === 0 ? (
                          <div className="text-center text-white/60 py-8">
                            <MessageSquare className="mx-auto h-8 w-8 mb-2 opacity-50" />
                            <p className="text-sm">Ask me to modify your assignment!</p>
                            <p className="text-xs mt-1 opacity-75">Try: &ldquo;Make it shorter&rdquo; or &ldquo;Add examples&rdquo;</p>
                          </div>
                        ) : (
                          chatMessages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[85%] p-2 rounded-lg text-sm ${
                                msg.role === 'user' 
                                  ? 'bg-purple-500/20 text-white border border-purple-500/30' 
                                  : 'bg-white/10 text-white/90 border border-white/20'
                              }`}>
                                {msg.content}
                              </div>
                            </div>
                          ))
                        )}
                        {isChatting && (
                          <div className="flex justify-start">
                            <div className="bg-white/10 border border-white/20 p-2 rounded-lg">
                              <Loader2 className="h-4 w-4 animate-spin" />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Chat Input */}
                      <div className="flex gap-2">
                        <Input
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          placeholder="Ask me to modify..."
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 text-sm"
                          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleChatSubmit()}
                          disabled={isChatting}
                        />
                        <Button 
                          onClick={handleChatSubmit}
                          disabled={!chatInput.trim() || isChatting}
                          size="sm"
                          className="bg-purple-500 hover:bg-purple-600 text-white px-3"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

