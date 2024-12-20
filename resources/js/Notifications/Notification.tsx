import { Eye, EyeOff, Trash } from "lucide-react";

interface NotificationProps {
  body: string;
  created: string;
  notificationId: string;
  read: string | null;
  onDelete: (id: string) => void;
  onToggleRead: (id: string) => void;
}

export default function Notification({
  body,
  created,
  notificationId,
  read,
  onDelete,
  onToggleRead,
}: NotificationProps) {
  return (
    <div
      className={`p-4 hover:bg-gray-100 rounded-xl ${
        read === null ? "bg-blue-50" : "bg-gray-50"
      }`}
    >
      <p className="leading-relaxed">{body}</p>
      <div className="flex items-center justify-between mt-4 text-gray-500">
        <div className="text-sm">
          {new Date(created).toLocaleDateString()}
        </div>
        <div className="flex items-center space-x-4">
        <button
          onClick={() => onToggleRead(notificationId)}
          className="p-1 hover:bg-gray-200 rounded-full"
        >
          {read ? (
            <Eye size="18" />
          ) : (
            <EyeOff size="18" />
          )}
        </button>
        <button
          onClick={() => onDelete(notificationId)}
          className="p-1 hover:bg-gray-200 rounded-full"
        >
          {read ? (
            <Trash size="18" />
          ) : (
            <Trash size="18" />
          )}
        </button>
        </div>
      </div>
    </div>
  );
}