"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { setPublic } from "@/lib/redux/slices/resumeSlice"
import { Button } from "@/components/ui/button"
import { Download, Share2, Copy, Check } from "lucide-react"
import { useState } from "react"
import { generateShareToken, getShareUrl } from "@/lib/utils/share"

export function ExportShare() {
  const resume = useSelector((state: RootState) => state.resume)
  const dispatch = useDispatch()
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleExportPDF = () => {
    const element = document.getElementById("resume-preview")
    if (!element) return

    const html2pdf = require("html2pdf.js")
    const options = {
      margin: 10,
      filename: `${resume.fullName}-resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
    }

    html2pdf().set(options).from(element).save()
  }

  const handleShare = async () => {
    const token = generateShareToken()
    const url = getShareUrl(token)

    dispatch(setPublic({ isPublic: true, shareToken: token }))

    setShareUrl(url)
    await navigator.clipboard.writeText(url)
    setCopied(true)

    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyLink = async () => {
    if (shareUrl) {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex gap-2 items-center">
      <Button onClick={handleExportPDF} size="sm" className="gap-2">
        <Download size={16} />
        Export PDF
      </Button>
      {!resume.isPublic ? (
        <Button onClick={handleShare} variant="outline" size="sm" className="gap-2 bg-transparent">
          <Share2 size={16} />
          Share
        </Button>
      ) : (
        <Button onClick={handleCopyLink} variant="outline" size="sm" className="gap-2 bg-transparent">
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied!" : "Copy Link"}
        </Button>
      )}
    </div>
  )
}
