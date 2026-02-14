import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning";
}

const mockNotifications: Notification[] = [
  { id: "1", message: "New candidate applied for Senior React Developer", time: "5 min ago", read: false, type: "info" },
  { id: "2", message: "Assessment completed by John Smith — Score: 82%", time: "1 hour ago", read: false, type: "success" },
  { id: "3", message: "Interview scheduled with Dr. Sarah Mitchell", time: "2 hours ago", read: false, type: "info" },
  { id: "4", message: "ATS screening completed for 3 candidates", time: "4 hours ago", read: true, type: "success" },
  { id: "5", message: "Assessment deadline approaching for Maria Garcia", time: "1 day ago", read: true, type: "warning" },
];

export function NotificationBell() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] h-[18px]">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h4 className="font-semibold text-sm">Notifications</h4>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-xs text-primary hover:underline">
              Mark all read
            </button>
          )}
        </div>
        <ScrollArea className="max-h-[320px]">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
          ) : (
            notifications.map(n => (
              <div
                key={n.id}
                className={cn(
                  "px-4 py-3 border-b last:border-0 cursor-pointer hover:bg-muted/50 transition-colors",
                  !n.read && "bg-primary/5"
                )}
                onClick={() => markRead(n.id)}
              >
                <div className="flex items-start gap-2.5">
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-1.5 flex-shrink-0",
                    n.read ? "bg-transparent" : "bg-primary"
                  )} />
                  <div>
                    <p className="text-sm leading-snug">{n.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
