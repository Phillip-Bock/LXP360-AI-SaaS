"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  ArrowClockwise,
  MagnifyingGlass,
  X,
  Funnel,
  Upload,
  Download,
  PencilSimple,
  FloppyDisk,
  ArrowCounterClockwise,
  CaretDown,
} from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface Asset {
  id: number
  name: string
  version: string
  project: string
  owner: string
  status: "Approved" | "Under Review" | "Requires Revision"
  type: string
  tags: string[]
}

export default function MediaUploadsPage() {
  const router = useRouter()
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [originalAsset, setOriginalAsset] = useState<Asset | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("None Selected")
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([])

  const mockAssets: Asset[] = [
    {
      id: 1,
      name: "3DArtifact-TRD-009_space-shuttle_v1.0.obj",
      version: "1.0",
      project: "Space Flight History",
      owner: "Phillip",
      status: "Approved",
      type: "3D Artifact",
      tags: ["sci-fi", "nasa", "vehicle"],
    },
    {
      id: 2,
      name: "Video-HR-001_ceo-welcome_message_v1.0.mp4",
      version: "1.0",
      project: "Marketing Campaign",
      owner: "Jane",
      status: "Under Review",
      type: "Video",
      tags: ["corporate", "speech"],
    },
    {
      id: 3,
      name: "Image-MKT-001-flower-in-a-field_v0.0.png",
      version: "0.0",
      project: "Nature Series",
      owner: "John",
      status: "Approved",
      type: "360° Image",
      tags: ["nature", "landscape", "flower"],
    },
    {
      id: 4,
      name: "Image-MKT-002_product-shot_v1.3.png",
      version: "1.3",
      project: "Product Launch",
      owner: "Phillip",
      status: "Requires Revision",
      type: "2D Image",
      tags: ["product", "studio"],
    },
    {
      id: 5,
      name: "Audio-MKT-001_background-music_v1.0.mp3",
      version: "1.0",
      project: "Marketing Campaign",
      owner: "Jane",
      status: "Approved",
      type: "Audio",
      tags: ["music", "upbeat"],
    },
    {
      id: 6,
      name: "Code-SE-006_ai-e-mentor_v2.2.zip",
      version: "2.2",
      project: "AI Development",
      owner: "Phillip",
      status: "Approved",
      type: "Code Interaction",
      tags: ["ai", "mentor", "codebase"],
    },
  ]

  // Filter and search logic
  useEffect(() => {
    if (selectedCategory === "None Selected") {
      setFilteredAssets([])
    } else {
      const filtered = mockAssets.filter((asset) => {
        const matchesCategory = asset.type === selectedCategory
        const matchesSearch =
          searchTerm === "" || asset.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        return matchesCategory && matchesSearch
      })
      setFilteredAssets(filtered)
    }
    setCurrentPage(1)
  }, [selectedCategory, searchTerm])

  // Pagination
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage)
  const paginatedAssets = filteredAssets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-[#3ad20c] text-white"
      case "Under Review":
        return "bg-[#ffc933] text-[#232323]"
      case "Requires Revision":
        return "bg-[#dc0404] text-white"
      default:
        return "bg-[#232323] text-white"
    }
  }

  const handleSelectAsset = (asset: Asset) => {
    if (!isEditMode) {
      setSelectedAsset(asset)
      setOriginalAsset(JSON.parse(JSON.stringify(asset)))
    }
  }

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode)
    if (!isEditMode) {
      setUnsavedChanges(true)
    }
  }

  const handleSave = () => {
    setIsEditMode(false)
    setUnsavedChanges(false)
    setSelectedAsset(null)
    setOriginalAsset(null)
  }

  const handleRevert = () => {
    setIsEditMode(false)
    setUnsavedChanges(false)
    if (originalAsset) {
      setSelectedAsset(originalAsset)
    }
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  const isButtonDisabled = (button: string) => {
    if (isEditMode) {
      if (["upload", "download", "refresh", "filter"].includes(button)) return true
      if (button === "revert") return !unsavedChanges
    } else {
      if (["save", "revert"].includes(button)) return true
      if (["download", "edit"].includes(button) && !selectedAsset) return true
    }
    return false
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="border-b-[1.5px] border-[#001d3d] bg-[#F5F5F5]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-[#e0e0e0] rounded-[10px] transition-colors">
              <ArrowLeft weight="duotone" className="w-6 h-6 text-[#001d3d]" />
            </button>
            <button onClick={handleRefresh} className="p-2 hover:bg-[#e0e0e0] rounded-[10px] transition-colors">
              <ArrowClockwise weight="duotone" className="w-6 h-6 text-[#001d3d]" />
            </button>
            <h1 className="text-2xl font-bold text-[#0056b8]">LXD360 G-Drive Media Asset Viewer</h1>
          </div>
          <Image
            src="https://blob.v0.app/jmjTn.png"
            alt="LXP360 Logo"
            width={100}
            height={40}
            className="h-16 w-auto"
            priority
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Panel: Controls and Table */}
          <div className="xl:col-span-2 bg-[#F5F5F5] p-6 rounded-[10px] border-[1.5px] border-[#001d3d]">
            {/* Controls */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {/* Category Dropdown */}
              <div className="relative w-full sm:w-auto sm:flex-1">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none w-full bg-[#e0e0e0] border-0 text-[#232323] font-bold py-2 px-4 pr-10 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#019ef3]"
                >
                  <option value="None Selected">None Selected</option>
                  <option value="Video">Video</option>
                  <option value="Audio">Audio</option>
                  <option value="2D Image">2D Image</option>
                  <option value="360° Image">360° Image</option>
                  <option value="3D Scene">3D Scene</option>
                  <option value="3D Artifact">3D Artifact</option>
                  <option value="Code Interaction">Code Interaction</option>
                </select>
                <CaretDown
                  weight="duotone"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#232323] pointer-events-none"
                />
              </div>

              {/* Search Input */}
              <div className="relative flex-grow w-full sm:w-auto sm:flex-1">
                <MagnifyingGlass
                  weight="duotone"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#232323]"
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tags..."
                  className="w-full bg-[#e0e0e0] border-0 text-[#232323] font-bold pl-10 pr-10 py-2 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#019ef3]"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#dc0404] hover:text-[#fb4b4b]"
                  >
                    <X weight="duotone" className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Filter Button */}
              <button
                disabled={isButtonDisabled("filter")}
                className={`flex items-center gap-2 px-4 py-2 rounded-[10px] font-bold transition-all ${
                  isButtonDisabled("filter")
                    ? "bg-[#707070] text-white cursor-not-allowed"
                    : "bg-[#0072f5] text-white hover:bg-[#34b7fe] hover:scale-105 shadow-[2px_2px_6px_#70b3ff]"
                }`}
              >
                <Funnel weight="duotone" className="w-5 h-5" />
                Filter
              </button>
            </div>

            {/* Asset Table */}
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-[10px] border-collapse">
                <thead className="bg-[#232323] text-white">
                  <tr>
                    {isEditMode && <th className="p-2"></th>}
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm rounded-tl-[10px]">File Name</th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm hidden md:table-cell">
                      Version
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm hidden lg:table-cell">
                      Project
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Owner</th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm rounded-tr-[10px] hidden lg:table-cell">
                      Tags
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAssets.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-[#232323]">
                        {selectedCategory === "None Selected"
                          ? "Please select a category to view assets."
                          : "No assets found."}
                      </td>
                    </tr>
                  ) : (
                    paginatedAssets.map((asset) => (
                      <tr
                        key={asset.id}
                        onClick={() => handleSelectAsset(asset)}
                        className={`cursor-pointer hover:bg-[#e0e0e0] border-b border-[#a3a3a3] ${
                          selectedAsset?.id === asset.id ? "bg-[#b3d9ff]" : ""
                        }`}
                      >
                        {isEditMode && (
                          <td className="p-2">
                            <input type="checkbox" className="w-5 h-5 rounded text-[#0056b8]" />
                          </td>
                        )}
                        <td className="py-3 px-4" contentEditable={isEditMode} suppressContentEditableWarning={true}>
                          {asset.name}
                        </td>
                        <td
                          className="py-3 px-4 hidden md:table-cell"
                          contentEditable={isEditMode}
                          suppressContentEditableWarning={true}
                        >
                          {asset.version}
                        </td>
                        <td
                          className="py-3 px-4 hidden lg:table-cell"
                          contentEditable={isEditMode}
                          suppressContentEditableWarning={true}
                        >
                          {asset.project}
                        </td>
                        <td className="py-3 px-4" contentEditable={isEditMode} suppressContentEditableWarning={true}>
                          {asset.owner}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-[10px] text-sm font-bold ${getStatusColor(asset.status)}`}
                          >
                            {asset.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 hidden lg:table-cell">
                          {asset.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="bg-[#ffbe0a] text-[#232323] text-xs font-bold mr-2 px-2.5 py-0.5 rounded-[10px]"
                            >
                              {tag}
                            </span>
                          ))}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex flex-wrap justify-between items-center gap-4 text-[#232323] font-bold">
              <div className="flex items-center gap-2">
                <label htmlFor="itemsPerPage">Items per page:</label>
                <select
                  id="itemsPerPage"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number.parseInt(e.target.value))
                    setCurrentPage(1)
                  }}
                  className="bg-[#e0e0e0] rounded-[10px] p-1 border-0"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
              {totalPages > 1 && (
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded-[10px] transition-colors ${
                        page === currentPage ? "bg-[#0072f5] text-white" : "bg-[#e0e0e0] hover:bg-[#d0d0d0]"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-4">
              <button
                disabled={isButtonDisabled("upload")}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-[10px] font-bold transition-all ${
                  isButtonDisabled("upload")
                    ? "bg-[#707070] text-white cursor-not-allowed"
                    : "bg-[#0072f5] text-white hover:bg-[#34b7fe] hover:scale-105 shadow-[2px_2px_6px_#70b3ff]"
                }`}
              >
                <Upload weight="duotone" className="w-4 h-4" />
                Upload
              </button>
              <button
                disabled={isButtonDisabled("download")}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-[10px] font-bold transition-all ${
                  isButtonDisabled("download")
                    ? "bg-[#707070] text-white cursor-not-allowed"
                    : "bg-[#0072f5] text-white hover:bg-[#34b7fe] hover:scale-105 shadow-[2px_2px_6px_#70b3ff]"
                }`}
              >
                <Download weight="duotone" className="w-4 h-4" />
                Download
              </button>
              <button
                disabled={isButtonDisabled("edit")}
                onClick={toggleEditMode}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-[10px] font-bold transition-all ${
                  isButtonDisabled("edit")
                    ? "bg-[#707070] text-white cursor-not-allowed"
                    : "bg-[#0072f5] text-white hover:bg-[#34b7fe] hover:scale-105 shadow-[2px_2px_6px_#70b3ff]"
                }`}
              >
                <PencilSimple weight="duotone" className="w-4 h-4" />
                Edit
              </button>
              <button
                disabled={isButtonDisabled("save")}
                onClick={handleSave}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-[10px] font-bold transition-all ${
                  isButtonDisabled("save")
                    ? "bg-[#707070] text-white cursor-not-allowed"
                    : "bg-[#0072f5] text-white hover:bg-[#34b7fe] hover:scale-105 shadow-[2px_2px_6px_#70b3ff]"
                }`}
              >
                <FloppyDisk weight="duotone" className="w-4 h-4" />
                Save
              </button>
              <button
                disabled={isButtonDisabled("revert")}
                onClick={handleRevert}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-[10px] font-bold transition-all ${
                  isButtonDisabled("revert")
                    ? "bg-[#707070] text-white cursor-not-allowed"
                    : "bg-[#dc0404] text-white hover:bg-[#fb4b4b] hover:scale-105 shadow-[2px_2px_6px_#ff7070]"
                }`}
              >
                <ArrowCounterClockwise weight="duotone" className="w-4 h-4" />
                Revert
              </button>
              <button
                disabled={isButtonDisabled("refresh")}
                onClick={handleRefresh}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-[10px] font-bold transition-all ${
                  isButtonDisabled("refresh")
                    ? "bg-[#707070] text-white cursor-not-allowed"
                    : "bg-[#0072f5] text-white hover:bg-[#34b7fe] hover:scale-105 shadow-[2px_2px_6px_#70b3ff]"
                }`}
              >
                <ArrowClockwise weight="duotone" className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>

          {/* Right Panel: Media Viewer */}
          <div className="bg-[#F5F5F5] p-6 rounded-[10px] border-[1.5px] border-[#001d3d] flex flex-col items-center justify-center min-h-[400px]">
            <h2 className="text-3xl font-bold mb-4 text-[#232323]">Media Viewer</h2>
            <div className="w-full h-96 bg-[#e0e0e0] rounded-[10px] flex items-center justify-center text-[#707070]">
              {selectedAsset ? (
                <div className="text-center p-4">
                  <strong className="block text-lg text-[#232323]">{selectedAsset.type} Preview</strong>
                  <p className="text-[#707070] mt-2">{selectedAsset.name}</p>
                </div>
              ) : (
                "Select an asset to view"
              )}
            </div>
            {selectedAsset && (
              <p className="mt-4 font-semibold text-lg text-[#232323]">
                {selectedAsset.name}, Version {selectedAsset.version}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
