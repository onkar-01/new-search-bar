"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  Settings,
  File,
  User,
  MessageCircleMore,
  TextAlignJustify,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [showSettings, setShowSettings] = useState(false);
  const dropdownRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const [tabs, setTabs] = useState([
    { name: "All", enabled: true },
    { name: "Files", enabled: true, icon: File },
    { name: "People", enabled: true, icon: User },
    { name: "Lists", enabled: true, icon: TextAlignJustify },
    { name: "Chats", enabled: true, icon: MessageCircleMore },
  ]);


  const data = [
    {
      id: 1,
      type: "person",
      name: "Caroline Dribsson",
      status: "Unactivated",
      img: "https://picsum.photos/40?1",
    },
    {
      id: 2,
      type: "person",
      name: "Adam Cadribean",
      status: "Active 1w ago",
      img: "https://picsum.photos/40?2",
    },
    {
      id: 3,
      type: "person",
      name: "Margareth Cendribbssen",
      status: "Active 2d ago",
      img: "https://picsum.photos/40?3",
    },
    {
      id: 4,
      type: "person",
      name: "Lucas Venn",
      status: "Active now",
      img: "https://picsum.photos/40?4",
    },
    {
      id: 5,
      type: "person",
      name: "Elena Martinez",
      status: "Active 3h ago",
      img: "https://picsum.photos/40?5",
    },
    {
      id: 6,
      type: "file",
      name: "final_dribbble_presentation.jpg",
      status: "Edited 1w ago",
      img: "https://picsum.photos/40?6",
    },
    {
      id: 7,
      type: "file",
      name: "dribbble_animation.avi",
      status: "Added 1y ago",
      img: "https://picsum.photos/40?7",
    },
    {
      id: 8,
      type: "file",
      name: "branding_guidelines.pdf",
      status: "Edited 3d ago",
      img: "https://picsum.photos/40?8",
    },
    {
      id: 9,
      type: "file",
      name: "team_photo.png",
      status: "Added 5m ago",
      img: "https://picsum.photos/40?9",
    },
    {
      id: 10,
      type: "file",
      name: "wireframe.sketch",
      status: "Edited 2h ago",
      img: "https://picsum.photos/40?10",
    },
    {
      id: 11,
      type: "folder",
      name: "Dribbble Folder",
      status: "Edited 2m ago",
      img: "https://picsum.photos/40?11",
    },
    {
      id: 12,
      type: "folder",
      name: "Marketing Assets",
      status: "Edited 3d ago",
      img: "https://picsum.photos/40?12",
    },
    {
      id: 13,
      type: "folder",
      name: "Development Docs",
      status: "Updated 1w ago",
      img: "https://picsum.photos/40?13",
    },
    {
      id: 14,
      type: "folder",
      name: "Client Deliverables",
      status: "Edited 5d ago",
      img: "https://picsum.photos/40?14",
    },
    {
      id: 15,
      type: "folder",
      name: "UX Research",
      status: "Added 10h ago",
      img: "https://picsum.photos/40?15",
    },
    {
      id: 16,
      type: "chat",
      name: "Project Alpha Chat",
      status: "5 messages",
      img: "https://picsum.photos/40?16",
    },
    {
      id: 17,
      type: "chat",
      name: "Design Team Chat",
      status: "12 messages",
      img: "https://picsum.photos/40?17",
    },
    {
      id: 18,
      type: "chat",
      name: "Frontend Devs",
      status: "2 new messages",
      img: "https://picsum.photos/40?18",
    },
    {
      id: 19,
      type: "chat",
      name: "HR Announcements",
      status: "No new messages",
      img: "https://picsum.photos/40?19",
    },
    {
      id: 20,
      type: "chat",
      name: "Random Chat",
      status: "4 messages",
      img: "https://picsum.photos/40?20",
    },

    {
      id: 21,
      type: "list",
      name: "Sprint Tasks List",
      status: "3 items",
      img: "https://picsum.photos/40?21",
    },
    {
      id: 22,
      type: "list",
      name: "Grocery List",
      status: "12 items",
      img: "https://picsum.photos/40?22",
    },
    {
      id: 23,
      type: "list",
      name: "Books to Read",
      status: "7 items",
      img: "https://picsum.photos/40?23",
    },
    {
      id: 24,
      type: "list",
      name: "Movies to Watch",
      status: "5 items",
      img: "https://picsum.photos/40?24",
    },
    {
      id: 25,
      type: "list",
      name: "Bug Fixes",
      status: "10 items",
      img: "https://picsum.photos/40?25",
    },
  ];
  const getCount = (tab) => {
    if (tab === "All") return data.length;

    const typeMap = {
      People: "person",
      Files: "file",
      Lists: "list",
      Chats: "chat",
      Folders: "folder",
    };

    return data.filter((d) => d.type === typeMap[tab]).length;
  };
  const toggleTab = (tabName) => {
    setTabs((prev) =>
      prev.map((t) => (t.name === tabName ? { ...t, enabled: !t.enabled } : t))
    );

    if (activeTab === tabName) {
      setActiveTab("All");
    }
  };

  const filteredData = data.filter((item) => {
    const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
    if (!matchesQuery) return false;

    if (activeTab === "All") return true;
    if (activeTab === "Folders" && item.type === "folder") return true;
    if (activeTab === "Chats" && item.type === "chat") return true;
    if (activeTab === "Lists" && item.type === "list") return true;
    if (activeTab === "Files" && item.type === "file") return true;
    if (activeTab === "People" && item.type === "person") return true;
    return item.type === activeTab.toLowerCase();
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    if (showSettings) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSettings]);

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <motion.div
        animate={{ scale: isFocused ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
        className="mt-3 rounded-xl bg-white shadow p-3 space-y-3"
      >
        {/* Search Box */}
        <motion.div
          className={`flex items-center rounded-xl px-3 py-2 transition-all duration-300 `}
        >
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="ml-2 w-full outline-none text-sm"
          />
          {query && (
            <motion.button
              onClick={() => setQuery("")}
              className="text-sm text-gray-500 hover:underline"
              whileHover={{ scale: 1.1 }}
            >
              Clear
            </motion.button>
          )}
        </motion.div>
        {query && (
          <>
            <div className="flex items-center justify-between mt-3 border-b-2 border-gray-200 relative">
              <div className="flex items-center gap-4 -mb-[2px]">
                {tabs
                  .filter((t) => t.enabled)
                  .map((tab) => (
                    <button
                      key={tab.name}
                      onClick={() => setActiveTab(tab.name)}
                      className={`pb-2 text-sm flex flex-row items-center space-x-1 relative`}
                    >
                      <div className="flex space-x-1">
                        {tab.icon && (
                          <tab.icon className="w-4 h-4 mr-1 inline" />
                        )}
                        <span>{tab.name}</span>
                        <span>{getCount(tab.name)}</span>
                      </div>

                      {activeTab === tab.name && (
                        <motion.div
                          layoutId="underline"
                          className="absolute bottom-0 left-0 w-full h-[2px] bg-black"
                        />
                      )}
                    </button>
                  ))}
              </div>

              {/* Settings Dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setShowSettings((prev) => !prev)}
                  className=""
                >
                  <Settings className="w-5 h-5 text-gray-500 hover:text-black" />
                </button>

                <AnimatePresence>
                  {showSettings && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-8 w-40 bg-white rounded-lg shadow p-2 space-y-2 z-10"
                    >
                      {tabs.slice(1).map((tab) => (
                        <div
                          key={tab.name}
                          className="flex items-center justify-between text-sm"
                        >
                          <div className="flex flex-row space-x-2">
                            {tab.icon && (
                              <tab.icon className="w-4 h-4 inline" />
                            )}
                            <span>{tab.name}</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={tab.enabled}
                              onChange={() => toggleTab(tab.name)}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-black transition"></div>
                            <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></div>
                          </label>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Results - only show if query is not empty */}
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                {filteredData.length > 0 ? (
                  filteredData.map((item) => {
                    const highlighted = item.name.replace(
                      new RegExp(query, "gi"),
                      (match) =>
                        `<mark class="bg-yellow-200 rounded-sm">${match}</mark>`
                    );

                    return (
                      <motion.div
                        key={item.id}
                        className="text-sm p-2 hover:bg-gray-50 rounded-lg flex flex-row items-center space-x-3"
                        whileHover={{ scale: 1.01 }}
                      >
                        <Image
                          src={item.img}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                        <div className="flex flex-col space-x-2">
                          <p
                            className="font-medium"
                            dangerouslySetInnerHTML={{ __html: highlighted }}
                          />

                          <p className="text-xs text-gray-500">{item.status}</p>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <p className="text-gray-400 text-sm">No results found.</p>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </motion.div>
    </div>
  );
}
