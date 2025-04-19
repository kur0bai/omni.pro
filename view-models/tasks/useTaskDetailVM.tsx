import { CircleCheckBig, CircleEllipsis } from "lucide-react";

export default function useTaskDetailVM() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-green-600 text-white px-2 py-0.5 font-normal rounded-md";
      case "medium":
        return "bg-yellow-600 text-white px-2 py-0.5 font-normal rounded-md";
      case "high":
        return "bg-red-600 text-white px-2 py-0.5 font-normal rounded-md";
      default:
        return "bg-gray-600 text-white px-2 py-0.5 font-normal rounded-md";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-600 text-white px-2 py-0.5 font-normal rounded-md";
      case "pending":
        return "bg-yellow-600 text-white px-2 py-0.5 font-normal rounded-md";
      default:
        return "bg-gray-600 text-white px-2 py-0.5 font-normal rounded-md";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CircleCheckBig size={15} className="text-green-600" />;
      case "pending":
        return <CircleEllipsis size={15} className="text-yellow-600" />;
      default:
        return "bg-gray-600 text-white px-2 py-0.5 font-normal rounded-md";
    }
  };

  return {
    getPriorityColor,
    getStatusColor,
    getStatusIcon,
  };
}
