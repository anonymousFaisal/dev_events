"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

interface AgendaItem {
  id: string;
  time: string;
  description: string;
}

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    overview: "",
    location: "",
    venue: "",
    date: "",
    time: "",
    mode: "",
    audience: "",
    organizer: "",
    imageUrl: "",
  });

  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([{ id: "1", time: "", description: "" }]);

  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");

  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgendaChange = (id: string, field: keyof AgendaItem, value: string) => {
    setAgendaItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const addAgendaItem = () => {
    setAgendaItems((prev) => [...prev, { id: Date.now().toString(), time: "", description: "" }]);
  };

  const removeAgendaItem = (id: string) => {
    setAgendaItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags((prev) => [...prev, currentTag.trim()]);
      }
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      console.log(`Uploading file: ${file.name}`);

      // Simulate Cloudinary upload delay
      setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          imageUrl: "https://via.placeholder.com/800x400.png?text=Featured+Image",
        }));
        setIsUploading(false);
      }, 2000);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Format agenda items to strings as per model
    const formattedAgenda = agendaItems.filter((item) => item.time && item.description).map((item) => `${item.time} | ${item.description}`);

    const eventData = {
      ...formData,
      image: formData.imageUrl, // Map imageUrl to image
      agenda: formattedAgenda,
      tags: tags,
    };

    console.log("Submitting Event Data:", eventData);
    alert("Event Created! (Check console for data)");
  };

  return (
    <div className="glass w-full max-w-4xl mx-auto p-8 rounded-xl border border-white/10 shadow-2xl">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500 mb-8 text-center">
        Create New Event
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-light-100 border-b border-white/10 pb-2">Event Details</h3>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-sm font-medium text-light-200">
                Event Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Cloud Next 2026"
                className="bg-dark-200/50 border border-white/10 rounded-lg px-4 py-3 text-light-100 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-white/20"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-sm font-medium text-light-200">
                Short Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief summary for cards..."
                rows={2}
                className="bg-dark-200/50 border border-white/10 rounded-lg px-4 py-3 text-light-100 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-white/20 resize-none"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="overview" className="text-sm font-medium text-light-200">
                Detailed Overview
              </label>
              <textarea
                id="overview"
                name="overview"
                value={formData.overview}
                onChange={handleChange}
                placeholder="Full event details, goals, and highlights..."
                rows={5}
                className="bg-dark-200/50 border border-white/10 rounded-lg px-4 py-3 text-light-100 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-white/20 resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="venue" className="text-sm font-medium text-light-200">
                  Venue Name
                </label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="e.g., Moscone Center"
                  className="bg-dark-200/50 border border-white/10 rounded-lg px-4 py-3 text-light-100 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-white/20"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="location" className="text-sm font-medium text-light-200">
                  Location (City, State)
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., San Francisco, CA"
                  className="bg-dark-200/50 border border-white/10 rounded-lg px-4 py-3 text-light-100 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-white/20"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Logistics Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-light-100 border-b border-white/10 pb-2">Logistics & Audience</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="date" className="text-sm font-medium text-light-200">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="bg-dark-200/50 border border-white/10 rounded-lg px-4 py-3 text-light-100 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all scheme-dark"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="time" className="text-sm font-medium text-light-200">
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="bg-dark-200/50 border border-white/10 rounded-lg px-4 py-3 text-light-100 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all scheme-dark"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="mode" className="text-sm font-medium text-light-200">
                Event Mode
              </label>
              <input
                type="text"
                id="mode"
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                placeholder="e.g., Hybrid (In-Person & Online)"
                className="bg-dark-200/50 border border-white/10 rounded-lg px-4 py-3 text-light-100 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-white/20"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="organizer" className="text-sm font-medium text-light-200">
                Organizer
              </label>
              <input
                type="text"
                id="organizer"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                placeholder="e.g., Google Cloud"
                className="bg-dark-200/50 border border-white/10 rounded-lg px-4 py-3 text-light-100 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-white/20"
                required
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="audience" className="text-sm font-medium text-light-200">
                Target Audience
              </label>
              <input
                type="text"
                id="audience"
                name="audience"
                value={formData.audience}
                onChange={handleChange}
                placeholder="e.g., Cloud engineers, DevOps, enterprise leaders"
                className="bg-dark-200/50 border border-white/10 rounded-lg px-4 py-3 text-light-100 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-white/20"
                required
              />
            </div>
          </div>
        </div>

        {/* Tags Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-light-100 border-b border-white/10 pb-2">Tags</h3>
          <div className="flex flex-col gap-2">
            <label htmlFor="tags" className="text-sm font-medium text-light-200">
              Add Tags (Press Enter)
            </label>
            <input
              type="text"
              id="tags"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="e.g., AI, Kubernetes"
              className="bg-dark-200/50 border border-white/10 rounded-lg px-4 py-3 text-light-100 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-white/20"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <span key={index} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-white transition-colors">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Agenda Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <h3 className="text-xl font-semibold text-light-100">Agenda</h3>
            <button type="button" onClick={addAgendaItem} className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
              + Add Item
            </button>
          </div>

          <div className="space-y-4">
            {agendaItems.map((item, index) => (
              <div key={item.id} className="flex gap-4 items-start animate-in fade-in slide-in-from-bottom-2">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <input
                      type="text"
                      value={item.time}
                      onChange={(e) => handleAgendaChange(item.id, "time", e.target.value)}
                      placeholder="08:30 AM - 09:30 AM"
                      className="bg-dark-200/50 border border-white/10 rounded-lg px-4 py-3 text-light-100 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-white/20 w-full"
                      aria-label={`Time for agenda item ${index + 1}`}
                      required
                    />
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-1">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleAgendaChange(item.id, "description", e.target.value)}
                      placeholder="e.g., Keynote: AI-Driven Cloud Infrastructure"
                      className="bg-dark-200/50 border border-white/10 rounded-lg px-4 py-3 text-light-100 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-white/20 w-full"
                      aria-label={`Description for agenda item ${index + 1}`}
                      required
                    />
                  </div>
                </div>
                {agendaItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAgendaItem(item.id)}
                    className="mt-2 text-red-400 hover:text-red-300 transition-colors p-2"
                    aria-label="Remove agenda item"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-light-100 border-b border-white/10 pb-2">Featured Image</h3>

          <div className="flex flex-col gap-4">
            <div className="relative border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-primary/50 transition-colors bg-dark-200/30">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Upload featured image"
              />

              {isUploading ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-light-200">Uploading to Cloudinary...</p>
                </div>
              ) : formData.imageUrl ? (
                <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden">
                  <img src={formData.imageUrl} alt="Featured" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white font-medium">Click to change image</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-10 h-10 text-light-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-light-100 font-medium">Click to upload image</p>
                  <p className="text-light-200 text-sm">SVG, PNG, JPG or GIF (max. 5MB)</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-teal-400 text-dark-100 font-bold text-lg py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
