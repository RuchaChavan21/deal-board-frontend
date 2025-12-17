"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Camera,
  Mail,
  Phone,
  Globe2,
  Clock3,
  LogOut,
  Briefcase,
  CheckCircle2,
  MapPin,
  CalendarDays,
  MoreHorizontal,
  Save,
  Loader2,
} from "lucide-react";
import {
  getMyProfile,
  updateProfile,
  type UserProfile,
} from "../../src/api/user";
// Assuming you have a toast/alert system, otherwise use standard alert
// import { useToast } from "../../hooks/use-toast";

export default function ProfilePage() {
  // State for user data
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Ref for the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to load profile:", error);
        // Fallback for demo purposes if backend is empty/erroring initially
        // You can remove this fallback in production
        setProfile({
          name: "New User",
          email: "user@example.com",
          phone: "",
          jobTitle: "",
          location: "",
          timeZone: "UTC",
          language: "English",
          avatarUrl: "",
          dealsHandled: 0,
          tasksCompleted: 0,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle Text Input Changes
  const handleInputChange = (field: keyof UserProfile, value: string) => {
    if (profile) {
      setProfile({ ...profile, [field]: value });
    }
  };

  // Handle Image Selection (Converts file to Base64 for preview/upload)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && profile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Update state with the Base64 string to show immediate preview
        // Note: For large apps, upload to S3 first, get URL, then save URL.
        // For simple apps, sending Base64 string to backend works but is heavy.
        setProfile({ ...profile, avatarUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger hidden file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Handle Save
  const handleSave = async () => {
    if (!profile) return;
    setIsSaving(true);
    try {
      const updated = await updateProfile(profile);
      setProfile(updated);
      alert("Profile updated successfully!"); // Replace with toast if available
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-slate-50 pb-12 pt-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 sm:px-6">
        {/* Header Card */}
        <section className="relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          {/* Banner Image */}
          <div className="h-32 w-full relative bg-slate-200">
            <img
              src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Profile Cover Banner"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          <div className="px-6 pb-6">
            <div className="relative flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              {/* Profile Avatar & Info */}
              <div className="flex flex-col gap-4 md:flex-row md:items-end">
                <div className="relative -mt-12 group">
                  {/* Hidden File Input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />

                  {/* Avatar Display */}
                  <img
                    src={
                      profile.avatarUrl ||
                      "https://ui-avatars.com/api/?name=" +
                        profile.name +
                        "&background=0D8ABC&color=fff"
                    }
                    alt={profile.name}
                    className="h-24 w-24 rounded-2xl border-4 border-white bg-white object-cover shadow-md"
                  />

                  {/* Upload Button */}
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-600 shadow-md ring-1 ring-slate-200 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer"
                    title="Change Profile Picture"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>

                <div className="mb-1 space-y-1">
                  <h1 className="text-2xl font-bold text-slate-900">
                    {profile.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4 text-blue-500" />
                      {profile.jobTitle || "No Title"} at{" "}
                      {profile.id ? "Acme Corp" : "Department"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      {profile.location || "Location not set"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex w-full flex-shrink-0 gap-3 md:w-auto">
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 md:flex-none"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 md:flex-none disabled:opacity-70"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" /> Save Changes
                    </>
                  )}
                </button>
                <button className="flex items-center justify-center rounded-lg border border-slate-300 bg-white p-2 text-slate-600 shadow-sm hover:bg-slate-50 md:hidden">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mt-8 flex gap-6 border-b border-slate-200">
              <button className="border-b-2 border-blue-600 pb-3 text-sm font-semibold text-blue-600">
                Profile Details
              </button>
              <button className="border-b-2 border-transparent pb-3 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700">
                Password & Security
              </button>
            </div>
          </div>
        </section>

        {/* Main Grid Layout */}
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          {/* Left Column: Form */}
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                Personal Information
              </h2>
              <p className="text-sm text-slate-500">
                Manage your public profile and private details.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full rounded-lg border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Email Address
                </label>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-500">
                  <Mail className="h-4 w-4 text-slate-400" />
                  {profile.email}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    value={profile.phone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full rounded-lg border-slate-200 bg-slate-50 pl-10 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Job Title
                </label>
                <input
                  type="text"
                  value={profile.jobTitle || ""}
                  onChange={(e) =>
                    handleInputChange("jobTitle", e.target.value)
                  }
                  className="w-full rounded-lg border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={profile.location || ""}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="w-full rounded-lg border-slate-200 bg-slate-50 pl-10 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Time Zone
                </label>
                <div className="relative">
                  <Clock3 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <select
                    value={profile.timeZone || ""}
                    onChange={(e) =>
                      handleInputChange("timeZone", e.target.value)
                    }
                    className="w-full appearance-none rounded-lg border-slate-200 bg-slate-50 pl-10 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">America/New_York</option>
                    <option value="Europe/London">Europe/London</option>
                    <option value="Asia/Kolkata">Asia/Kolkata</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Language
                </label>
                <div className="relative">
                  <Globe2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <select
                    value={profile.language || "English"}
                    onChange={(e) =>
                      handleInputChange("language", e.target.value)
                    }
                    className="w-full appearance-none rounded-lg border-slate-200 bg-slate-50 pl-10 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Right Column: Stats & Meta */}
          <div className="flex flex-col gap-6">
            {/* Stats Cards */}
            <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h3 className="mb-4 text-sm font-bold text-slate-900">
                Performance
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Tasks Completed
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      {profile.tasksCompleted?.toLocaleString() || 0}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Deals Handled
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      {profile.dealsHandled || 0}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Meta Info */}
            <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h3 className="mb-4 text-sm font-bold text-slate-900">
                Account Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-500">
                    <Clock3 className="h-4 w-4" /> Last Login
                  </span>
                  <span className="font-medium text-slate-900">
                    {profile.lastLogin
                      ? new Date(profile.lastLogin).toLocaleDateString()
                      : "Today"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-500">
                    <CalendarDays className="h-4 w-4" /> Joined
                  </span>
                  <span className="font-medium text-slate-900">
                    {profile.createdAt
                      ? new Date(profile.createdAt).toLocaleDateString()
                      : "-"}
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100">
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
