"use client";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "success" | "warning";
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Yakin",
  cancelText = "Batal",
  type = "warning",
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const btnClasses = {
    danger: "bg-red-500 text-white border-black hover:bg-red-600",
    success: "bg-green-500 text-white border-black hover:bg-green-600",
    warning: "bg-yellow-400 text-black border-black hover:bg-yellow-500",
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div 
        className="w-full max-w-sm rounded-2xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:bg-[#1e293b] dark:border-white dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]"
        role="dialog"
        aria-modal="true"
      >
        <h2 className="mb-2 text-xl font-black">{title}</h2>
        <p className="mb-6 font-medium text-gray-600 dark:text-gray-300">{message}</p>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-xl border-2 border-black bg-gray-200 px-4 py-2 font-bold text-black transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:bg-slate-700 dark:text-white dark:border-white dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`rounded-xl border-2 border-black px-4 py-2 font-bold transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] ${btnClasses[type]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
