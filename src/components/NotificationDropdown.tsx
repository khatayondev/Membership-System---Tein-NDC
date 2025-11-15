import { useState } from 'react';
import { useNotifications } from '../lib/notificationContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { 
  Bell, 
  Check, 
  CheckCheck, 
  Calendar, 
  DollarSign, 
  AlertCircle, 
  Info, 
  Settings,
  X,
  ChevronDown,
  ChevronUp,
  UserCheck
} from 'lucide-react';
import { Separator } from './ui/separator';
import { motion, AnimatePresence } from 'motion/react';

interface NotificationDropdownProps {
  onNavigate?: (page: string) => void;
}

export function NotificationDropdown({ onNavigate }: NotificationDropdownProps = {}) {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    if (notification.link && onNavigate) {
      const page = notification.link.replace('/', '');
      setOpen(false);
      onNavigate(page);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <Calendar className="h-4 w-4" style={{ color: '#007A33' }} />;
      case 'payment':
        return <DollarSign className="h-4 w-4" style={{ color: '#007A33' }} />;
      case 'warning':
        return <AlertCircle className="h-4 w-4" style={{ color: '#FFA500' }} />;
      case 'error':
        return <X className="h-4 w-4" style={{ color: '#E30613' }} />;
      case 'system':
        return <Settings className="h-4 w-4" style={{ color: '#6B7280' }} />;
      case 'success':
        return <Check className="h-4 w-4" style={{ color: '#007A33' }} />;
      case 'approval':
        return <UserCheck className="h-4 w-4" style={{ color: '#FFA500' }} />;
      default:
        return <Info className="h-4 w-4" style={{ color: '#3B82F6' }} />;
    }
  };

  const formatTime = (date: string) => {
    const now = new Date();
    const notifDate = new Date(date);
    const diffInMinutes = Math.floor((now.getTime() - notifDate.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              style={{ backgroundColor: '#E30613' }}
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between p-4 pb-2">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="h-8 text-xs"
            >
              <CheckCheck className="h-3 w-3 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
        <Separator />
        
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mb-3 opacity-20" />
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => {
                const isExpanded = expandedId === notification.id;
                return (
                  <div
                    key={notification.id}
                    className={`hover:bg-muted/50 transition-colors ${
                      !notification.read ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div
                      className="p-4 cursor-pointer"
                      onClick={() => {
                        if (!isExpanded) {
                          markAsRead(notification.id);
                        }
                        setExpandedId(isExpanded ? null : notification.id);
                      }}
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium">
                              {notification.title}
                            </p>
                            <div className="flex items-center gap-2">
                              {!notification.read && (
                                <div 
                                  className="h-2 w-2 rounded-full flex-shrink-0" 
                                  style={{ backgroundColor: '#007A33' }}
                                />
                              )}
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              )}
                            </div>
                          </div>
                          {!isExpanded && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-2">
                            {formatTime(notification.date)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pl-[52px]">
                            <Separator className="mb-3" />
                            <p className="text-sm text-foreground whitespace-pre-wrap">
                              {notification.message}
                            </p>
                            {notification.link && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-3"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleNotificationClick(notification);
                                }}
                              >
                                View Details
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>

        {notifications.length > 0 && (
          <>
            <Separator />
            <div className="p-2">
              <Button variant="ghost" className="w-full text-xs" size="sm">
                View all notifications
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
