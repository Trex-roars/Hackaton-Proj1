import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PlusCircle, Send, Users, TrendingUp } from "lucide-react";
import confetti from "canvas-confetti";

const CampaignForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    platform: "",
    contentType: "",
    currentFollowers: "",
    expectedReach: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#3B82F6", "#1D4ED8", "#60A5FA"],
    });

    setTimeout(() => {
      setIsOpen(false);
      onSubmit(formData);
    }, 1000);
  };

  return (
    <div className="fixed bottom-24 right-8 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="bg-black/50 backdrop-blur-sm text-white font-semibold px-8 py-6 rounded-2xl shadow-lg hover:translate-x-5 hover:bg-muted border-2 border-pink-50 hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            New Campaign
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Create New Campaign
            </DialogTitle>
            <DialogDescription>
              Launch your next successful social media campaign
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="space-y-2">
              <Label htmlFor="platform" className="text-sm font-medium">
                Platform
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, platform: value })
                }
                required
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select your platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contentType" className="text-sm font-medium">
                Content Type
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, contentType: value })
                }
                required
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Choose content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="story">Story</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="currentFollowers"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Current Followers
              </Label>
              <Input
                type="number"
                placeholder="Enter your current follower count"
                className="h-12"
                onChange={(e) =>
                  setFormData({ ...formData, currentFollowers: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="expectedReach"
                className="text-sm font-medium flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                Expected Reach
              </Label>
              <Input
                type="number"
                placeholder="Enter expected campaign reach"
                className="h-12"
                onChange={(e) =>
                  setFormData({ ...formData, expectedReach: e.target.value })
                }
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Launch Campaign
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignForm;
