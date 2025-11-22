import { Bug, User, Radio } from "lucide-react";

export default function RightSidebar() {
  const notifications = [
    {
      icon: <Bug className="w-4 h-4" />,
      title: "You have a bug that needs...",
      time: "Just now",
      bgColor: "bg-[#E3F5FF]",
    },
    {
      icon: <User className="w-4 h-4" />,
      title: "New user registered",
      time: "59 minutes ago",
      bgColor: "bg-[#E5ECF6]",
    },
    {
      icon: <Bug className="w-4 h-4" />,
      title: "You have a bug that needs...",
      time: "12 hours ago",
      bgColor: "bg-[#E3F5FF]",
    },
    {
      icon: <Radio className="w-4 h-4" />,
      title: "Andi Lane subscribed to you",
      time: "Today, 11:59 AM",
      bgColor: "bg-[#E5ECF6]",
    },
  ];

  const activities = [
    {
      avatar: "bg-green-200",
      title: "You have a bug that needs...",
      time: "Just now",
    },
    {
      avatar: "bg-orange-200",
      title: "Released a new version",
      time: "59 minutes ago",
    },
    {
      avatar: "bg-blue-200",
      title: "Submitted a bug",
      time: "12 hours ago",
    },
    {
      avatar: "bg-purple-200",
      title: "Modified A data in Page X",
      time: "Today, 11:59 AM",
    },
    {
      avatar: "bg-gray-700",
      title: "Deleted a page in Project X",
      time: "Feb 2, 2023",
    },
  ];

  const contacts = [
    { name: "Natali Craig", avatar: "bg-gray-200" },
    { name: "Drew Cano", avatar: "bg-red-700" },
    { name: "Orlando Diggs", avatar: "bg-yellow-200" },
    { name: "Andi Lane", avatar: "bg-orange-200" },
  ];

  return (
    <div className="w-80 min-w-80 h-screen bg-white dark:bg-[#282828] border-l border-gray-200 dark:border-[#2E2E2E] overflow-y-auto p-6 transition-colors duration-300">
      {/* Notifications Section */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-[#1C1C1C] dark:text-white mb-4">
          Notifications
        </h2>
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <div key={index} className="flex items-start gap-3">
              <div
                className={`${notification.bgColor}  text-black  p-1 rounded-lg flex items-center justify-center`}
              >
                {notification.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-normal text-[#1C1C1C] dark:text-white truncate">
                  {notification.title}
                </p>
                <p className="text-xs text-[#1C1C1C]/40 dark:text-[#ffffff]/40">
                  {notification.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activities Section */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-[#1C1C1C] dark:text-white mb-4">
          Activities
        </h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[18px] top-8 bottom-8 w-px bg-gray-200 dark:bg-[#2E2E2E]"></div>

          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-2 relative"
              >
                <div
                  className={`${activity.avatar} dark:opacity-80 w-6 h-6 ml-1.5 rounded-full flex-shrink-0 z-10`}
                ></div>
                <div className="flex-1 min-w-0 pt-1">
                  <p className="text-sm font-normal text-[#1C1C1C] dark:text-white truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-[#1C1C1C]/40 dark:text-[#ffffff]/40">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contacts Section */}
      <div>
        <h2 className="text-sm font-semibold text-[#1C1C1C] dark:text-white mb-4">
          Contacts
        </h2>
        <div className="space-y-3">
          {contacts.map((contact, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className={`${contact.avatar} dark:opacity-80 w-6 h-6 rounded-full flex-shrink-0`}
              ></div>
              <p className="text-sm font-normal text-[#1C1C1C] dark:text-white">
                {contact.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
