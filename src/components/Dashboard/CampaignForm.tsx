import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      setIsOpen(false);
      onSubmit(formData);
    }, 1000);
  };

  return (
    <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6"
          >
            Create Campaign
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, platform: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
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
              <Label htmlFor="contentType">Content Type</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, contentType: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
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
              <Label htmlFor="currentFollowers">Current Followers</Label>
              <Input
                type="number"
                placeholder="Enter current followers"
                onChange={(e) =>
                  setFormData({ ...formData, currentFollowers: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedReach">Expected Reach</Label>
              <Input
                type="number"
                placeholder="Enter expected reach"
                onChange={(e) =>
                  setFormData({ ...formData, expectedReach: e.target.value })
                }
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignForm;
