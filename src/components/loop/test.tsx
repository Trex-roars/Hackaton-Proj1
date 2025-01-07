"use client";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  TrendingUp,
  Users,
  Eye,
  MessageCircle,
  Share2,
  Heart,
  Calendar,
  Clock,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Zap,
  Award,
  Brain,
} from "lucide-react";

const PLATFORMS = {
  twitter: {
    name: "Twitter",
    color: "#1DA1F2",
    secondaryColor: "#E8F5FD",
    icon: Twitter,
    gradient: "from-[#1DA1F2] to-[#0D8BD9]",
  },
  instagram: {
    name: "Instagram",
    color: "#E1306C",
    secondaryColor: "#FCE4EC",
    icon: Instagram,
    gradient: "from-[#E1306C] via-[#C13584] to-[#833AB4]",
  },
  facebook: {
    name: "Facebook",
    color: "#4267B2",
    secondaryColor: "#E8F0FF",
    icon: Facebook,
    gradient: "from-[#4267B2] to-[#365899]",
  },
  youtube: {
    name: "YouTube",
    color: "#FF0000",
    secondaryColor: "#FFE5E5",
    icon: Youtube,
    gradient: "from-[#FF0000] to-[#CC0000]",
  },
};

function Test() {
  const [timeRange, setTimeRange] = useState("today");
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [metrics, setMetrics] = useState({});
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  // AI-powered data generation based on time range
  const generateTimeSeriesData = (platform, range) => {
    const points = range === "today" ? 24 : range === "week" ? 7 : 30;
    const baseValue = {
      twitter: 15000,
      instagram: 25000,
      facebook: 20000,
      youtube: 50000,
    }[platform];

    return Array(points)
      .fill(0)
      .map((_, i) => {
        const timeLabel =
          range === "today"
            ? `${i}:00`
            : range === "week"
              ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i]
              : `Day ${i + 1}`;

        const trend = Math.sin((i / (points / 2)) * Math.PI) * 0.3;
        const noise = Math.random() * 0.2;
        const growth = (i / points) * 0.5;

        const multiplier = 1 + trend + noise + growth;

        return {
          time: timeLabel,
          followers: Math.floor(baseValue * multiplier),
          engagement: (3 + Math.random() * 2 + trend * 3).toFixed(1),
          reach: Math.floor(baseValue * multiplier * 2),
          posts:
            range === "today"
              ? Math.floor(2 + Math.random() * 3)
              : Math.floor(10 + Math.random() * 15),
        };
      });
  };

  const generateInsights = (data) => {
    const platforms = Object.keys(data);
    const insights = [];

    platforms.forEach((platform) => {
      const platformData = data[platform];
      const recentData = platformData.slice(-2);
      const growth = (
        ((recentData[1]?.followers - recentData[0]?.followers) /
          recentData[0]?.followers) *
        100
      ).toFixed(1);

      insights.push({
        platform,
        type: Number(growth) > 0 ? "positive" : "negative",
        metric: "Followers",
        value: Math.abs(growth) + "%",
        message: `${PLATFORMS[platform].name} followers ${Number(growth) > 0 ? "grew" : "declined"} by ${Math.abs(growth)}%`,
      });

      const avgEngagement =
        platformData.reduce((acc, curr) => acc + Number(curr.engagement), 0) /
        platformData.length;
      insights.push({
        platform,
        type: avgEngagement > 3 ? "positive" : "neutral",
        metric: "Engagement",
        value: avgEngagement.toFixed(1) + "%",
        message: `${PLATFORMS[platform].name} average engagement rate is ${avgEngagement.toFixed(1)}%`,
      });
    });

    return insights;
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const newData = Object.keys(PLATFORMS).reduce((acc, platform) => {
        acc[platform] = generateTimeSeriesData(platform, timeRange);
        return acc;
      }, {});

      setMetrics(newData);
      setInsights(generateInsights(newData));
      setLoading(false);
    }, 800);
  }, [timeRange]);

  const PlatformCard = ({ platform }) => {
    const { color, icon: Icon, name, gradient } = PLATFORMS[platform];
    const data = metrics[platform] || [];
    const latestData = data[data.length - 1] || {};
    const previousData = data[data.length - 2] || {};

    const calculateGrowth = (current, previous) => {
      if (!previous) return 0;
      return (((current - previous) / previous) * 100).toFixed(1);
    };

    return (
      <div
        className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-102 cursor-pointer ${
          selectedPlatform === platform ? "ring-2 ring-offset-2" : ""
        }`}
        style={{ ringColor: color }}
        onClick={() => setSelectedPlatform(platform)}
      >
        <div className={`p-6 bg-gradient-to-r ${gradient}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon className="w-8 h-8 text-white" />
              <h3 className="text-xl font-bold text-white">{name}</h3>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
              <TrendingUp className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">
                {calculateGrowth(latestData.followers, previousData.followers)}%
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <MetricBox
              icon={Users}
              label="Followers"
              value={latestData.followers?.toLocaleString()}
              change={calculateGrowth(
                latestData.followers,
                previousData.followers,
              )}
              color={color}
            />
            <MetricBox
              icon={Heart}
              label="Engagement"
              value={`${latestData.engagement}%`}
              change={calculateGrowth(
                latestData.engagement,
                previousData.engagement,
              )}
              color={color}
            />
          </div>

          <div className="h-36 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient
                    id={`gradient-${platform}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={color} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="followers"
                  stroke={color}
                  fill={`url(#gradient-${platform})`}
                  strokeWidth={2}
                />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Stat
              label="Posts"
              value={latestData.posts}
              change={calculateGrowth(latestData.posts, previousData.posts)}
            />
            <Stat
              label="Reach"
              value={`${(latestData.reach / 1000).toFixed(1)}K`}
              change={calculateGrowth(latestData.reach, previousData.reach)}
            />
            <Stat
              label="Interactions"
              value={`${((latestData.reach * Number(latestData.engagement)) / 100000).toFixed(1)}K`}
              change={calculateGrowth(
                latestData.reach * Number(latestData.engagement),
                previousData.reach * Number(previousData.engagement),
              )}
            />
          </div>
        </div>
      </div>
    );
  };

  const MetricBox = ({ icon: Icon, label, value, change, color }) => (
    <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <div className="text-xl font-bold" style={{ color }}>
        {value}
      </div>
      {change && (
        <div
          className={`text-sm ${Number(change) > 0 ? "text-green-500" : "text-red-500"}`}
        >
          {Number(change) > 0 ? "↑" : "↓"} {Math.abs(change)}%
        </div>
      )}
    </div>
  );

  const Stat = ({ label, value, change }) => (
    <div className="text-center">
      <div className="text-sm font-medium text-gray-500 mb-1">{label}</div>
      <div className="text-lg font-bold text-gray-900">{value}</div>
      {change && (
        <div
          className={`text-xs ${Number(change) > 0 ? "text-green-500" : "text-red-500"}`}
        >
          {Number(change) > 0 ? "↑" : "↓"} {Math.abs(change)}%
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full" />
          <div className="text-gray-500">Analyzing social media data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <header className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Social Media Analytics
            </h1>
            <div className="flex gap-2">
              {["today", "week", "month"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    timeRange === range
                      ? "bg-purple-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-purple-900">AI Insights</h3>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {insights.slice(0, 4).map((insight, i) => (
                <div
                  key={i}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg ${
                    insight.type === "positive"
                      ? "bg-green-50"
                      : insight.type === "negative"
                        ? "bg-red-50"
                        : "bg-gray-50"
                  }`}
                >
                  <div
                    className={`text-sm ${
                      insight.type === "positive"
                        ? "text-green-600"
                        : insight.type === "negative"
                          ? "text-red-600"
                          : "text-gray-600"
                    }`}
                  >
                    {insight.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.keys(PLATFORMS).map((platform) => (
            <PlatformCard key={platform} platform={platform} />
          ))}
        </div>

        {selectedPlatform && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Detailed Analytics for {PLATFORMS[selectedPlatform].name}
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metrics[selectedPlatform]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="followers"
                    stroke={PLATFORMS[selectedPlatform].color}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Test;
