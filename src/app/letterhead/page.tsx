"use client";

import { useState } from "react";
import { Printer, Edit2, Check, MapPin, Phone, Mail, Globe } from "lucide-react";
import Image from "next/image";

export default function LetterheadPage() {
  const [isEditing, setIsEditing] = useState(true);

  // Form state
  const [refNo, setRefNo] = useState("AS/2026/09/001");
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
  const [toName, setToName] = useState("Mr. John Doe");
  const [toTitle, setToTitle] = useState("Director of Engineering");
  const [toCompany, setToCompany] = useState("Aerospace Innovations Ltd.");
  const [toAddress, setToAddress] = useState(
    "123 Tech Park, Innovation City\nState, Zip 12345"
  );
  const [subject, setSubject] = useState(
    "Proposal for Advanced Drone Research Collaboration"
  );
  const [salutation, setSalutation] = useState("Dear Mr. Doe,");
  const [body, setBody] = useState(
    "We are pleased to present this proposal for a comprehensive collaboration in the field of advanced drone research.\n\nOur team at AeroSpark has identified several synergies between our R&D capabilities and your current project requirements. We believe that by combining our expertise in computational fluid dynamics and your manufacturing prowess, we can achieve significant breakthroughs.\n\nPlease find the detailed technical specifications and project timeline enclosed with this letter.\n\nWe look forward to the possibility of working together to push the boundaries of aerospace engineering."
  );
  const [signOff, setSignOff] = useState("Sincerely,");
  const [signatureName, setSignatureName] = useState("Dr. Sarah Chen");
  const [signatureTitle, setSignatureTitle] = useState(
    "Chief Technology Officer"
  );

  const handlePrint = () => {
    setIsEditing(false);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex flex-col items-center pb-24 relative">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          body {
            background: white !important;
          }
          nav, header, footer, .scan-line, .global-bg, .floating-contact, .cookie-consent, #theme-script {
            display: none !important;
          }
          .print-hide {
            display: none !important;
          }
          #printable-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      `,
        }}
      />

      {/* Control Panel */}
      <div className="print-hide w-full max-w-[21cm] flex justify-between items-center mb-6 glass-panel p-4 rounded-xl z-20">
        <div>
          <h1 className="text-xl font-heading font-bold gradient-text">
            AeroSpark Premium Letterhead
          </h1>
          <p className="text-sm text-text-muted">
            Modern, corporate design. Fill out details and print.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border-default hover:bg-surface-hover transition-colors text-sm font-medium"
          >
            {isEditing ? <Check size={16} /> : <Edit2 size={16} />}
            {isEditing ? "Preview Mode" : "Edit Mode"}
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-fg hover:bg-primary-dim transition-colors glow-blue text-sm font-medium"
          >
            <Printer size={16} />
            Print to PDF
          </button>
        </div>
      </div>

      {/* A4 Document Area (Full Bleed) */}
      <div
        id="printable-area"
        className="w-full max-w-[21cm] h-[29.7cm] bg-white text-black shadow-2xl z-10 relative overflow-hidden flex flex-col"
      >
        {/* TOP ACCENT GEOMETRY */}
        <div className="w-full h-4 bg-[#062B49] flex">
          <div className="h-full bg-[#FF6B00] w-1/3"></div>
        </div>

        {/* HEADER AREA */}
        <div className="w-full px-14 pt-12 pb-6 flex justify-between items-end border-b border-gray-100">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="AeroSpark Logo"
              width={65}
              height={65}
              className="object-contain"
            />
            <div className="flex flex-col mt-2">
              <h1 className="text-[34px] font-bold tracking-tight leading-none mb-1">
                <span className="text-[#062B49]">Aero</span>
                <span className="text-[#FF6B00]">Spark</span>
              </h1>
              <div className="text-[10px] tracking-[0.15em] uppercase font-semibold text-gray-400">
                Aerospace & Defense Innovation
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-1.5 text-sm pb-1">
            <div className="flex items-center justify-end w-64">
              <span className="font-semibold text-[#062B49] mr-2 text-[13px]">Ref:</span>
              {isEditing ? (
                <input
                  value={refNo}
                  onChange={(e) => setRefNo(e.target.value)}
                  className="border-none bg-gray-50 px-1 py-0.5 focus:outline-none focus:ring-1 ring-[#FF6B00]/50 rounded w-40 text-gray-500 text-[13px]"
                />
              ) : (
                <span className="text-gray-500 text-[13px]">{refNo}</span>
              )}
            </div>
            <div className="flex items-center justify-end w-64">
              <span className="font-semibold text-[#062B49] mr-2 text-[13px]">Date:</span>
              {isEditing ? (
                <input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border-none bg-gray-50 px-1 py-0.5 focus:outline-none focus:ring-1 ring-[#FF6B00]/50 rounded w-40 text-gray-500 text-[13px]"
                />
              ) : (
                <span className="text-gray-500 text-[13px]">{date}</span>
              )}
            </div>
          </div>
        </div>

        {/* WATERMARK */}
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none scale-150">
          <Image
            src="/logo.png"
            alt="Watermark"
            width={800}
            height={800}
            className="grayscale"
          />
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 px-14 flex flex-col z-10 pt-10">

          {/* Recipient */}
          <div className="mb-10 text-sm">
            {isEditing ? (
              <div className="flex flex-col gap-1.5 w-80">
                <input
                  value={toName}
                  onChange={(e) => setToName(e.target.value)}
                  placeholder="Recipient Name"
                  className="font-bold text-base bg-gray-50 px-2 py-1 rounded focus:outline-none focus:ring-1 ring-[#062B49]/50"
                />
                <input
                  value={toTitle}
                  onChange={(e) => setToTitle(e.target.value)}
                  placeholder="Title/Position"
                  className="text-gray-600 bg-gray-50 px-2 py-1 rounded focus:outline-none focus:ring-1 ring-[#062B49]/50"
                />
                <input
                  value={toCompany}
                  onChange={(e) => setToCompany(e.target.value)}
                  placeholder="Company Name"
                  className="font-medium bg-gray-50 px-2 py-1 rounded focus:outline-none focus:ring-1 ring-[#062B49]/50"
                />
                <textarea
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value)}
                  placeholder="Address"
                  className="resize-none h-16 bg-gray-50 px-2 py-1 rounded focus:outline-none focus:ring-1 ring-[#062B49]/50"
                />
              </div>
            ) : (
              <div className="leading-snug">
                <p className="font-bold text-base text-gray-900">{toName}</p>
                <p className="text-gray-600">{toTitle}</p>
                <p className="font-medium text-gray-800">{toCompany}</p>
                <p className="whitespace-pre-line text-gray-600 mt-1">{toAddress}</p>
              </div>
            )}
          </div>

          {/* Subject */}
          <div className="mb-8 bg-gray-50/50 p-3 rounded-lg border-l-4 border-[#FF6B00]">
            <div className="flex items-center text-sm">
              <span className="font-bold mr-3 uppercase tracking-wider text-[#062B49]">
                Subject:
              </span>
              {isEditing ? (
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="flex-1 bg-transparent font-bold text-gray-900 focus:outline-none focus:ring-1 ring-[#062B49]/30 px-2 py-1 rounded"
                />
              ) : (
                <span className="font-bold text-gray-900">{subject}</span>
              )}
            </div>
          </div>

          {/* Salutation */}
          <div className="mb-6 text-sm text-gray-800">
            {isEditing ? (
              <input
                value={salutation}
                onChange={(e) => setSalutation(e.target.value)}
                className="bg-gray-50 px-2 py-1 rounded focus:outline-none focus:ring-1 ring-[#062B49]/30 w-64 font-medium"
              />
            ) : (
              <p className="font-medium text-gray-900">{salutation}</p>
            )}
          </div>

          {/* Body Text */}
          <div className="mb-12 text-[13px] leading-relaxed text-gray-800 text-justify flex-1">
            {isEditing ? (
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full h-full min-h-[250px] bg-gray-50 rounded p-4 focus:outline-none focus:ring-1 ring-[#062B49]/30 resize-none"
              />
            ) : (
              <div className="whitespace-pre-line">{body}</div>
            )}
          </div>

          {/* Sign-off */}
          <div className="mt-auto mb-8 text-sm">
            {isEditing ? (
              <input
                value={signOff}
                onChange={(e) => setSignOff(e.target.value)}
                className="bg-gray-50 px-2 py-1 rounded focus:outline-none focus:ring-1 ring-[#062B49]/30 w-48 mb-12 block font-medium"
              />
            ) : (
              <p className="mb-16 font-medium text-gray-900">{signOff}</p>
            )}

            <div>
              {isEditing ? (
                <div className="flex flex-col gap-1 w-64">
                  <input
                    value={signatureName}
                    onChange={(e) => setSignatureName(e.target.value)}
                    placeholder="Name"
                    className="font-bold text-base bg-gray-50 px-2 py-1 rounded focus:outline-none focus:ring-1 ring-[#062B49]/30 text-[#062B49]"
                  />
                  <input
                    value={signatureTitle}
                    onChange={(e) => setSignatureTitle(e.target.value)}
                    placeholder="Title"
                    className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded focus:outline-none focus:ring-1 ring-[#062B49]/30"
                  />
                </div>
              ) : (
                <>
                  <p className="font-bold text-[#062B49] text-base">{signatureName}</p>
                  <p className="text-xs font-medium text-gray-500">{signatureTitle}</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* FULL BLEED FOOTER */}
        <div className="w-full bg-[#062B49] text-white px-14 py-6 mt-auto border-t-[3px] border-[#FF6B00]" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
          <div className="flex justify-between items-center w-full">
            <h3 className="font-bold text-xl tracking-tight whitespace-nowrap shrink-0">
              <span className="text-white">Aero</span>
              <span className="text-[#FF6B00]">Spark</span>
            </h3>
            
            <div className="flex items-center gap-5 text-[11px] text-blue-100/90 font-semibold shrink-0 ml-4 tracking-wider uppercase">
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <Phone size={13} className="text-[#FF6B00] shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              
              <span className="text-white/20 text-xs">•</span>
              
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <Mail size={13} className="text-[#FF6B00] shrink-0" />
                <span>contact@aerospark.com</span>
              </div>
              
              <span className="text-white/20 text-xs">•</span>
              
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <Globe size={13} className="text-[#FF6B00] shrink-0" />
                <span>www.aerospark.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
